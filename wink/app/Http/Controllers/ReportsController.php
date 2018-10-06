<?php

namespace Wink\Http\Controllers;

use Auth;
use Carbon\Carbon;
use DB;
use Excel;
use Illuminate\Http\Request;
use Response;
use Wink\AlertRule;
use Wink\Campaign;
use Wink\Company;
use Wink\CompanyRoleUser;
use Wink\Http\Controllers\Controller;
use Wink\Location;
use Wink\Question;
use Wink\QuestionAnswer;
use Wink\QuestionOption;
use Wink\Task;
use Wink\Team;
use Wink\User;

class ReportsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['showSingleLocation', 'showSubmissions', 'getCampaignLocationData']]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the report for the given campaign.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function showCampaign($id)
    {
        $currentUserRole = CompanyRoleUser::where('user_id', Auth::user()->id)->where('company_id', session('using_company'))->where('role_id', '<', 4)->get()->toArray();
        if (empty($currentUserRole)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $campaign = Campaign::currentCompany()->findOrFail($id);

        $tasks          = [];
        $tagsArr        = [];
        $campaignDetail = $this->getCampaignData($campaign);
        $company        = Company::where('id', $campaign->company_id)->first();
        $locations      = Location::with('tags')->currentCompany()->orderBy('id', 'asc')->get();
        $teams          = Team::whereCompanyId(session('using_company'))->get();
        $users_list     = json_encode([]);
        $users          = json_encode([]);
        $alerts         = DB::table('alerts')
            ->select(DB::raw('alerts.*, locations.name as title'))
            ->join('locations', 'locations.id', '=', 'alerts.location_id')
            ->where('campaign_id', '=', $campaign->id)
            ->get();

        // Alert::where('campaign_id', $campaign->id)->join('locations','locations.id','=','alerts.location_id')->get();
        $alertRules = AlertRule::where('campaign_id', $campaign->id)->get();

        // Check if rewards payout has been done
        if ($company->rewards == 1 && $campaign->reward_value > 0) {

            // Rather than checking for 0 we check that the company can pay the next single reward value
            // This stops issues where a company cannot pay a full reward but still access the dashboard
            if ($company->balance < $campaign->reward_value) {

                // return view('reports.reward_error_balance', compact('unpaid_tasks', 'company', 'campaign'));

            } else {

                $past_time = Carbon::now()->subDays(7)->toDateTimeString();

                $unpaid_tasks = Task::where([
                    ['campaign_id', $campaign->id],
                    ['approved', 0],
                    ['submitted', 1],
                    ['reward_paid', 0],
                    ['updated_at', "<=", $past_time],
                ])->get()->toArray();

                if (!empty($unpaid_tasks)) {

                    // return view('reports.reward_error', compact('unpaid_tasks', 'company', 'campaign'));

                }
            }

        }

        $overview  = array();
        $overview2 = json_decode(json_encode($campaignDetail), true);

        $colorOptions = array("#8bc7e9", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5");

        foreach ($overview2['questions'] as $q) {
            $question             = array();
            $question['question'] = $q['question'];
            $question['type']     = '';

            if (isset($q['answers'])) {
                // For boolean questions
                if ($q['type']['type'] == 'boolean') {
                    $question['type'] = 'Doughnut';
                    $labels           = array();
                    $answers          = array();
                    $colors           = array();
                    $total            = 0;
                    $count            = 0;

                    foreach ($q['answers'] as $k => $v) {
                        $answers[] = $v;
                        $labels[]  = $k;

                        if ($v == 0) {
                            $colors[] = "#F9F9FB";
                        } else {
                            if ($k == 'Yes') {
                                $colors[] = "#28A8D3";
                            } else {
                                $colors[] = "#9DD7EB";
                            }

                        }

                        $count++;
                    }

                    $question['data'] = array(
                        "chartData" => array(
                            "labels"   => $labels,
                            "datasets" => array(
                                array(
                                    "data"            => $answers,
                                    "backgroundColor" => $colors,
                                    "borderWidth"     => 0,
                                ),
                            ),
                        ),
                    );

                }

                // For rating questions
                if ($q['type']['type'] == 'rating') {
                    $question['type'] = 'starRating';
                    $tot1             = 0;
                    $tot2             = 0;
                    $avg              = 0;
                    foreach ($q['answers'] as $qqk => $qqv) {
                        $tot1 = $tot1 + ($qqv * $qqk);
                        $tot2 = $tot2 + $qqv;
                        $avg  = number_format($tot1 / $tot2, 2, ".", ",");
                    }
                    $question['data'] = array(
                        "rating" => $avg,
                        "footer" => 'Average: ' . $avg . ' stars',

                    );
                }

                // TODO for dropdown questions
                if ($q['type']['type'] == 'dropdown') {
                    $question['type'] = 'horizontalBarRating';
                    $labels           = array();
                    $answers          = array();
                    $colors           = array();
                    $total            = 0;
                    $count            = 0;

                    foreach ($q['answers'] as $v) {
                        $total = $total + $v;
                        if ($count >= count($colorOptions)) {
                            $count = 0;
                        }
                        $colors[] = $colorOptions[$count];

                        $count++;

                    }

                    foreach ($q['options'] as $v) {
                        $labels[] = $v['name'];
                        if (isset($q['answers'][$v['name']])) {
                            if ($q['answers'][$v['name']] > 0) {
                                $answers[] = number_format((($q['answers'][$v['name']] / $total) * 100), 0);
                            } else {
                                $answers[] = 0;
                            }
                        } else {
                            $answers[] = 0;
                        }
                    }

                    $question['data'] = array(
                        "chartData" => array(
                            "labels"   => $labels,
                            "datasets" => array(
                                array(
                                    "data"            => $answers,
                                    "backgroundColor" => $colors,
                                    "borderWidth"     => 0,
                                ),
                            ),
                        ),
                    );

                }
                if ($q['type']['type'] == 'select') {
                    $question['type'] = 'horizontalBarStock';
                    $labels           = array();
                    $answers          = array();

                    foreach ($q['options'] as $v) {
                        $labels[] = $v['name'];
                    }

                    foreach ($q['answers'] as $v) {
                        $answers[] = $v;
                    }

                    $question['data'] = array(
                        "chartData" => array(
                            "labels"   => $labels,
                            "datasets" => array(
                                array(
                                    "data"            => $answers,
                                    "backgroundColor" => array(
                                        "#28a8d3",
                                        "rgba(40, 168, 211, 0.7)",
                                        "#e6e7e8",
                                    ),
                                    "borderWidth"     => 0,
                                ),
                            ),
                        ),
                    );
                }

                if ($q['type']['type'] == 'multi_select') {
                    $question['type'] = 'horizontalBarRating';
                    $labels           = array();
                    $answers          = array();
                    $colors           = array();
                    $total            = 0;
                    $count            = 0;

                    foreach ($q['answers'] as $v) {
                        $total = $total + $v;
                        if ($count >= count($colorOptions)) {
                            $count = 0;
                        }
                        $colors[] = $colorOptions[$count];

                        $count++;

                    }

                    foreach ($q['options'] as $v) {

                        $labels[] = $v['name'];
                        if (isset($q['answers'][$v['name']])) {
                            if ($q['answers'][$v['name']] > 0) {
                                $answers[] = number_format((($q['answers'][$v['name']] / $total) * 100), 0);
                            } else {
                                $answers[] = 0;
                            }

                        } else {
                            $answers[] = 0;
                        }
                    }

                    $question['data'] = array(
                        "chartData" => array(
                            "labels"   => $labels,
                            "datasets" => array(
                                array(
                                    "data"            => $answers,
                                    "backgroundColor" => $colors,
                                    "borderWidth"     => 0,
                                ),
                            ),
                        ),
                    );
                }

                if ($q['type']['type'] == 'text' || $q['type']['type'] == 'number' || $q['type']['type'] == 'calculation') {
                    $question['type'] = 'feedback';
                    $question['data'] = array();
                    foreach ($q['answers'] as $qq) {
                        $user               = User::where('id', $qq['user_id'])->first();
                        $question['data'][] = array(
                            "feedback" => (strlen($qq['answer_text']) > 80 ? substr($qq['answer_text'], 0, 80) . "..." : $qq['answer_text']),
                            "user"     => array(
                                "first_name" => $user->first_name,
                                "last_name"  => $user->last_name,
                            ),
                        );
                    }
                }

                if ($q['type']['type'] == 'date') {
                    $question['type'] = 'feedback';
                    $question['data'] = array();
                    foreach ($q['answers'] as $qq) {
                        $question['data'][] = array(
                            "feedback" => $qq['answer_text'],
                            "user"     => array(
                                "first_name" => "",
                                "last_name"  => "",
                            ),
                        );
                    }
                }

            }

            if (isset($q['images'])) {
                if ($q['type']['type'] == 'image') {
                    $question['type'] = 'photos';
                    $question['data'] = array();
                    foreach ($q['images'] as $qq) {
                        $question['data'][] = "/images/" . $qq['name'];
                    }
                }
            }

            if (isset($q['count'])) {
                if ($q['type']['type'] == 'barcode') {
                    $question['type'] = 'scanCount';
                    $question['data'] = array(
                        "count"  => $q['count'] . " scans",
                        "icon"   => "icon-scanner",
                        "footer" => "Barcode scanner",
                    );
                }
                if ($q['type']['type'] == 'gps') {
                    $question['type'] = 'locationCount';
                    $question['data'] = array(
                        "count"  => $q['count'] . " locations",
                        "icon"   => "icon-globe",
                        "footer" => "GPS capture",
                    );

                }
            }

            $overview['cards'][] = $question;

        }
        $overview['submittedTasks'] = $campaign->submittedTasks()->count();
        $overview['createdTasks']   = $campaign->createdTasks()->count();

        $overview = json_encode($overview);

        $tags = json_encode([]);

        $locations_out = array();
        foreach ($locations as $location) {

            $location['createdTasks'] = $location->thisCampaignTotalTasks($campaign->id)->count();

            if ($location['createdTasks'] != 0) {

                $location['submittedTasks'] = $location->thisCampaignSubmittedTasks($campaign->id)->count();

                $lastupdate = DB::table('question_answers')
                    ->where("campaign_id", $campaign->id)
                    ->where("location_id", $location->id)
                    ->selectRaw('updated_at')
                    ->orderBy('updated_at', 'DESC')
                    ->first();
                if (count($lastupdate) > 0) {
                    $lastupdate              = json_decode(json_encode($lastupdate), true);
                    $lastupdate              = Carbon::parse($lastupdate['updated_at']);
                    $location['lastUpdated'] = "Last updated " . str_replace(array("before", "after"), "", $lastupdate->diffForHumans(Carbon::now())) . " ago";

                } else {
                    $location['lastUpdated'] = "N/A";
                }

                $location['tasks']         = $location->thisCampaignAllTasks($campaign->id);
                $location['campaign_hash'] = $campaign->hash;
                $locations_out[]           = $location;

            }
        }

        $locations = json_encode($locations_out);

        return view('reports.show_campaign', compact('campaign', 'campaignDetail', 'tasks', 'locations', 'tags', 'teams', 'users', 'alerts', 'alertRules', 'overview'));
    }

    public function showSingleLocation($location_hash, $campaign_hash)
    {

        // $currentUserRole = CompanyRoleUser::where('user_id', Auth::user()->id)->where('company_id', session('using_company'))->where('role_id', '<', 4)->get()->toArray();
        // if (empty($currentUserRole)) {
        //     return response()->json(['error' => 'invalid_credentials'], 401);
        // }

        $campaign       = Campaign::where("hash", $campaign_hash)->firstOrFail();
        $theLocation    = Location::where("hash", $location_hash)->first();
        $location_id    = $theLocation->id;
        $tasks          = [];
        $tagsArr        = [];
        $campaignDetail = $this->getCampaignLocationData($campaign, $theLocation->id);
        $company        = Company::where('id', $campaign->company_id)->first();
        $locationsArr   = Location::where('id', $location_id)->get();
        $teams          = Team::whereCompanyId($campaign->company_id)->get();
        $users_list     = CompanyRoleUser::where('company_id', '=', session('using_company'))->get();
        $users          = User::whereIn('id', $users_list->pluck('user_id'))->get();
        $alerts         = DB::table('alerts')
            ->select(DB::raw('alerts.*, locations.name as title'))
            ->join('locations', 'locations.id', '=', 'alerts.location_id')
            ->where('campaign_id', '=', $campaign->id)
            ->get();

        // Alert::where('campaign_id', $campaign->id)->join('locations','locations.id','=','alerts.location_id')->get();
        $alertRules = AlertRule::where('campaign_id', $campaign->id)->get();

        // Check if rewards payout has been done
        if ($company->rewards == 1 && $campaign->reward_value > 0) {

            // Rather than checking for 0 we check that the company can pay the next single reward value
            // This stops issues where a company cannot pay a full reward but still access the dashboard
            if ($company->balance < $campaign->reward_value) {

                // return view('reports.reward_error_balance', compact('unpaid_tasks', 'company', 'campaign'));

            } else {

                $past_time = Carbon::now()->subDays(7)->toDateTimeString();

                $unpaid_tasks = Task::where([
                    ['campaign_id', $campaign->id],
                    ['approved', 0],
                    ['submitted', 1],
                    ['reward_paid', 0],
                    ['updated_at', "<=", $past_time],
                ])->get()->toArray();

                if (!empty($unpaid_tasks)) {

                    // return view('reports.reward_error', compact('unpaid_tasks', 'company', 'campaign'));

                }
            }

        }

        $overview  = array();
        $overview2 = json_decode(json_encode($campaignDetail), true);

        $colorOptions = array("#8bc7e9", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5", "#d4dce5");

        foreach ($overview2['questions'] as $q) {
            $question             = array();
            $question['question'] = $q['question'];
            $question['type']     = '';

            if (isset($q['answers'])) {
                // For boolean questions
                if ($q['type']['type'] == 'boolean') {
                    $question['type'] = 'Doughnut';
                    $labels           = array();
                    $answers          = array();
                    $colors           = array();
                    $total            = 0;
                    $count            = 0;

                    foreach ($q['answers'] as $k => $v) {
                        $answers[] = $v;
                        $labels[]  = $k;

                        if ($v == 0) {
                            $colors[] = "#F9F9FB";
                        } else {
                            if ($k == 'Yes') {
                                $colors[] = "#28A8D3";
                            } else {
                                $colors[] = "#9DD7EB";
                            }

                        }

                        $count++;
                    }

                    $question['data'] = array(
                        "chartData" => array(
                            "labels"   => $labels,
                            "datasets" => array(
                                array(
                                    "data"            => $answers,
                                    "backgroundColor" => $colors,
                                    "borderWidth"     => 0,
                                ),
                            ),
                        ),
                    );

                }

                // For rating questions
                if ($q['type']['type'] == 'rating') {
                    $question['type'] = 'starRating';
                    $tot1             = 0;
                    $tot2             = 0;
                    $avg              = 0;
                    foreach ($q['answers'] as $qqk => $qqv) {
                        $tot1 = $tot1 + ($qqv * $qqk);
                        $tot2 = $tot2 + $qqv;
                        $avg  = number_format($tot1 / $tot2, 2, ".", ",");
                    }
                    $question['data'] = array(
                        "rating" => $avg,
                        "footer" => 'Average: ' . $avg . ' stars',

                    );
                }

                // TODO for dropdown questions
                if ($q['type']['type'] == 'dropdown') {
                    $question['type'] = 'horizontalBarRating';
                    $labels           = array();
                    $answers          = array();
                    $colors           = array();
                    $total            = 0;
                    $count            = 0;

                    foreach ($q['answers'] as $v) {
                        $total = $total + $v;
                        if ($count >= count($colorOptions)) {
                            $count = 0;
                        }
                        $colors[] = $colorOptions[$count];

                        $count++;

                    }

                    foreach ($q['options'] as $v) {
                        $labels[] = $v['name'];
                        if (isset($q['answers'][$v['name']])) {
                            if ($q['answers'][$v['name']] > 0) {
                                $answers[] = number_format((($q['answers'][$v['name']] / $total) * 100), 0);
                            } else {
                                $answers[] = 0;
                            }
                        } else {
                            $answers[] = 0;
                        }
                    }

//                    foreach ($q['answers'] as $v) {
                    //                        $answers[] = number_format((($v / $total) * 100), 0);
                    //                    }

                    $question['data'] = array(
                        "chartData" => array(
                            "labels"   => $labels,
                            "datasets" => array(
                                array(
                                    "data"            => $answers,
                                    "backgroundColor" => $colors,
                                    "borderWidth"     => 0,
                                ),
                            ),
                        ),
                    );

                }
                if ($q['type']['type'] == 'select') {
                    $question['type'] = 'horizontalBarStock';
                    $labels           = array();
                    $answers          = array();

                    foreach ($q['options'] as $v) {
                        $labels[] = $v['name'];
                    }

                    foreach ($q['answers'] as $v) {
                        $answers[] = $v;
                    }

                    $question['data'] = array(
                        "chartData" => array(
                            "labels"   => $labels,
                            "datasets" => array(
                                array(
                                    "data"            => $answers,
                                    "backgroundColor" => array(
                                        "#28a8d3",
                                        "rgba(40, 168, 211, 0.7)",
                                        "#e6e7e8",
                                    ),
                                    "borderWidth"     => 0,
                                ),
                            ),
                        ),
                    );
                }

                if ($q['type']['type'] == 'multi_select') {
                    $question['type'] = 'horizontalBarRating';
                    $labels           = array();
                    $answers          = array();
                    $colors           = array();
                    $total            = 0;
                    $count            = 0;

                    foreach ($q['answers'] as $v) {
                        $total = $total + $v;
                        if ($count >= count($colorOptions)) {
                            $count = 0;
                        }
                        $colors[] = $colorOptions[$count];

                        $count++;

                    }

                    foreach ($q['options'] as $v) {

                        $labels[] = $v['name'];
                        if (isset($q['answers'][$v['name']])) {
                            if ($q['answers'][$v['name']] > 0) {
                                $answers[] = number_format((($q['answers'][$v['name']] / $total) * 100), 0);
                            } else {
                                $answers[] = 0;
                            }

                        } else {
                            $answers[] = 0;
                        }
                    }

                    $question['data'] = array(
                        "chartData" => array(
                            "labels"   => $labels,
                            "datasets" => array(
                                array(
                                    "data"            => $answers,
                                    "backgroundColor" => $colors,
                                    "borderWidth"     => 0,
                                ),
                            ),
                        ),
                    );
                }

                if ($q['type']['type'] == 'text') {
                    $question['type'] = 'feedback';
                    $question['data'] = array();
                    foreach ($q['answers'] as $qq) {
                        $user               = User::where('id', $qq['user_id'])->first();
                        $question['data'][] = array(
                            "feedback" => (strlen($qq['answer_text']) > 80 ? substr($qq['answer_text'], 0, 80) . "..." : $qq['answer_text']),
                            "user"     => array(
                                "first_name" => $user->first_name,
                                "last_name"  => $user->last_name,
                            ),
                        );
                    }
                }

                if ($q['type']['type'] == 'date') {
                    $question['type'] = 'feedback';
                    $question['data'] = array();
                    foreach ($q['answers'] as $qq) {
                        $question['data'][] = array(
                            "feedback" => $qq['answer_text'],
                            "user"     => array(
                                "first_name" => "",
                                "last_name"  => "",
                            ),
                        );
                    }
                }

            }

            if (isset($q['images'])) {
                if ($q['type']['type'] == 'image') {
                    $question['type'] = 'photos';
                    $question['data'] = array();
                    foreach ($q['images'] as $qq) {
                        $question['data'][] = "/images/" . $qq['name'];
                    }
                }
            }

            if (isset($q['count'])) {
                if ($q['type']['type'] == 'barcode') {
                    $question['type'] = 'scanCount';
                    $question['data'] = array(
                        "count"  => $q['count'] . " scans",
                        "icon"   => "icon-scanner",
                        "footer" => "Barcode scanner",
                    );
                }
                if ($q['type']['type'] == 'gps') {
                    $question['type'] = 'locationCount';
                    $question['data'] = array(
                        "count"  => $q['count'] . " locations",
                        "icon"   => "icon-globe",
                        "footer" => "GPS capture",
                    );

                }
            }

            $overview['cards'][] = $question;

        }
        $overview['submittedTasks'] = $theLocation->thisCampaignSubmittedTasks($campaign->id)->count();
        $overview['createdTasks']   = $theLocation->thisCampaignTotalTasks($campaign->id)->count();

        $overview = json_encode($overview);

        foreach ($locationsArr as $l) {
            $tag  = DB::table('taggables')->where('taggable_id', $l->id)->get();
            $tags = array();
            foreach ($tag as $t) {
                $tags[]    = $t->tag_id;
                $tagsArr[] = $t->tag_id;

            }
            $l['tags']   = $tags;
            $locations[] = $l;
        }

        $tags = DB::table('tags')->whereIn('id', $tagsArr)->get();

        $locations_out = array();
        foreach ($locations as $location) {

            $location['createdTasks'] = $location->thisCampaignTotalTasks($campaign->id)->count();

            if ($location['createdTasks'] != 0) {

                $location['submittedTasks'] = $location->thisCampaignSubmittedTasks($campaign->id)->count();

                $lastupdate = DB::table('question_answers')
                    ->where("campaign_id", $campaign->id)
                    ->where("location_id", $location->id)
                    ->selectRaw('updated_at')
                    ->orderBy('updated_at', 'DESC')
                    ->first();
                if (count($lastupdate) > 0) {
                    $lastupdate              = json_decode(json_encode($lastupdate), true);
                    $lastupdate              = Carbon::parse($lastupdate['updated_at']);
                    $location['lastUpdated'] = "Last updated " . str_replace(array("before", "after"), "", $lastupdate->diffForHumans(Carbon::now())) . " ago";

                } else {
                    $location['lastUpdated'] = "N/A";
                }
                $location['tasks']       = $location->thisCampaignAllTasks($campaign->id);
                $location['campaign_id'] = $campaign->id;
                $locations_out[]         = $location;

            }

            $locations = json_encode($locations_out);

        }

        return view('reports.show_location', compact('campaign', 'campaignDetail', 'tasks', 'locations', 'tags', 'teams', 'users', 'alerts', 'alertRules', 'overview', 'theLocation'));
    }

    /**
     * Show the report for a single response.
     *
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showSingleResponse($id)
    {

        $task = Task::currentCompany()->findOrFail($id);

        $task->load(['answers' => function ($query) {
            $query->orderBy('id', 'asc');
        }]);

        return view('reports.view_single_response', compact('task'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Return the current campaigns data to the user as a csv download
     *
     * @param $campaign_id
     * @internal param Request $request
     */
    public function returnDataAsCsv($campaign_id)
    {

        $campaign = Campaign::currentCompany()->findOrFail($campaign_id);

        $file = $this->buildExcelFile($campaign);

        return response()->download($file['full']);

    }

    /**
     * Return the current campaigns data to the user as a csv download
     *
     * @param $campaign_id
     * @internal param Request $request
     */
    public function returnSingleDataAsCsv($task_hash)
    {

        $file = $this->buildSingleExcelFile($task_hash);

        return response()->download($file['full']);

    }

    /**
     * Submission edit page
     *
     * @param $campaign_id
     * @internal param Request $request
     */
    public function editSubmissions($campaign_id, $sub_id = 0)
    {
        $campaign    = Campaign::currentCompany()->findOrFail($campaign_id);
        $submissions = array();

        $tasks = DB::select('SELECT tasks.*, question_answers.created_at as answer_created_at FROM `tasks` LEFT JOIN question_answers ON question_answers.task_id = tasks.id
        WHERE tasks.campaign_id = ' . $campaign_id . ' GROUP BY tasks.id ORDER BY answer_created_at ASC', []);

        foreach ($tasks as $t) {

            $answers = QuestionAnswer::where('task_id', $t->id)->orderBy('question_id', 'asc')->whereNull('deleted_at')->get()->toArray();
            if (!empty($answers)) {
                $t->score     = 0;
                $t->max_score = $campaign->max_questionnaire_score;
                $t->location  = Location::where('id', $t->location_id)->first()->toArray();
                $t->answers   = array();
                foreach ($answers as $a) {
                    $a['answer_id'] = $a['id'];
                    $a['question']  = Question::where('id', $a['question_id'])->first()->toArray();
                    if (in_array($a['question_type_id'], [2, 3, 4])) {
                        $a['options'] = QuestionOption::where('question_id', $a['question_id'])->get()->toArray();
                    }
                    if (in_array($a['question_type_id'], [6])) {
                        $a['image'] = $image = DB::table('images')->where('id', $a['question_image_id'])->first();
                    }
                    $a['score'] = 0;

                    if (in_array($a['question_type_id'], [2, 3, 4, 7])) {

                        $options = DB::table('question_options')
                            ->where('question_id', $a['question_id'])
                            ->get();

                        foreach ($options as $op) {

                            if ($a['answer_text'] == $op->name) {
                                $t->score   = $t->score + $op->score;
                                $a['score'] = $a['score'] + $op->score;
                            }
                        }
                    }

                    if (in_array($a['question_type_id'], [8])) {

                        $options = DB::table('question_options')
                            ->where('question_id', $a['question_id'])
                            ->get();

                        foreach ($options as $op) {

                            if ($a['answer_numeric'] == $op->name) {
                                $t->score   = $t->score + $op->score;
                                $a['score'] = $a['score'] + $op->score;
                            }
                        }
                    }

                    $t->answers[] = $a;
                }

                $u = User::where("id", $t->checked_out_id)->first();
                if (!empty($u)) {
                    $t->user = $u->toArray();
                } else {
                    $t->user = array();
                }

                if ($t->score >= $campaign->benchmark_score) {
                    $t->result       = 'pass';
                    $t->result_color = 'green';
                } else {
                    $t->result = 'fail';

                    $t->result_color = 'red';
                }

                $submissions[] = $t;
                if ($t->id == $sub_id) {
                    $selectedSub = $t;
                }
            }
        }

        $submissions = json_encode($submissions);
        $selectedSub = json_encode($selectedSub);

        return view('reports.submissions', compact('campaign', 'submissions', 'selectedSub'));

    }

    /**
     * Submission edit page
     *
     * @param $campaign_id
     * @internal param Request $request
     */
    public function showSubmissions($sub_hash)
    {

        $tasks = DB::select('SELECT tasks.*, question_answers.created_at as answer_created_at FROM `tasks` LEFT JOIN question_answers ON question_answers.task_id = tasks.id
        WHERE tasks.hash = "' . $sub_hash . '" GROUP BY tasks.id ORDER BY answer_created_at ASC', []);

        $campaign    = Campaign::findOrFail($tasks[0]->campaign_id);
        $submissions = [];
        $selectedSub = [];

        foreach ($tasks as $t) {

            $answers = QuestionAnswer::where('task_id', $t->id)->orderBy('question_id', 'asc')->whereNull('deleted_at')->get()->toArray();
            if (!empty($answers)) {
                $t->score     = 0;
                $t->max_score = $campaign->max_questionnaire_score;
                $t->location  = Location::where('id', $t->location_id)->first()->toArray();
                $t->answers   = array();
                foreach ($answers as $a) {
                    $a['answer_id'] = $a['id'];
                    $a['question']  = Question::where('id', $a['question_id'])->first()->toArray();
                    if (in_array($a['question_type_id'], [2, 3, 4])) {
                        $a['options'] = QuestionOption::where('question_id', $a['question_id'])->get()->toArray();
                    }
                    if (in_array($a['question_type_id'], [6])) {
                        $a['image'] = $image = DB::table('images')->where('id', $a['question_image_id'])->first();
                    }
                    $t->answers[] = $a;

                    if (in_array($a['question_type_id'], [2, 3, 8, 4, 7])) {

                        $options = DB::table('question_options')
                            ->where('question_id', $a['question_id'])
                            ->get();

                        foreach ($options as $op) {

                            if ($a['answer_text'] == $op->name) {
                                $t->score = $t->score + $op->score;
                            }
                        }
                    }
                }

                $u = User::where("id", $t->checked_out_id)->first();
                if (!empty($u)) {
                    $t->user = $u->toArray();
                } else {
                    $t->user = array();
                }

                if ($t->score >= $campaign->benchmark_score) {
                    $t->result       = 'pass';
                    $t->result_color = 'green';
                } else {
                    $t->result = 'fail';

                    $t->result_color = 'red';
                }

                $submissions[] = $t;
                if ($t->hash == $sub_hash) {
                    $selectedSub = $t;
                }
            }
        }

        $submissions = json_encode($submissions);
        $selectedSub = json_encode($selectedSub);

        return view('reports.client-submissions', compact('campaign', 'submissions', 'selectedSub'));

    }

    /**
     * Get all the data for a campaign
     *
     * @param $campaign
     */
    private function getCampaignData($campaign, $location_id = false)
    {
        $campaign->load([
            'questions' => function ($query) {
                $query->orderBy('id', 'asc');
            },
            'questions.type',
            'questions.options',
            'questions.images',
            'alerts.location',
        ]);

        $approved_array = [0, 1];
        // if (Auth::user()->hasRole("Brand Client")) {
        //     $approved_array = [1];
        // }

        foreach ($campaign->questions as $question) {

            if (in_array($question->input_type, [1, 11, 12])) {

                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->select('answer_text', 'user_id')
                    ->get();

                $question['answers'] = $results;

            } else if (in_array($question->input_type, [2, 3, 4, 5])) {
                $return = [];
                if (!empty($question->options)) {
                    foreach ($question->options as $opt) {
                        $return[$opt->name] = 0;
                    }
                }

                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->selectRaw('answer_text, count(*) as numAnswers')
                    ->groupBy('answer_text')
                    ->orderBy('numAnswers', 'DESC')
                    ->get();

                foreach ($results as $result) {
                    $return[$result->answer_text] = $result->numAnswers;
                }

                arsort($return);

                $question['answers'] = $return;

            } else if (in_array($question->input_type, [6])) {

                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->select('question_image_id')
                    ->get();

                $question['images'] = $results;

            } else if (in_array($question->input_type, [7])) {

                $return  = [];
                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->selectRaw('answer_text, count(*) as numAnswers')
                    ->groupBy('answer_text')
                    ->orderBy('numAnswers', 'DESC')
                    ->get();

                foreach ($results as $result) {
                    $return[$result->answer_text] = $result->numAnswers;
                }

                if (!array_key_exists('No', $return)) {
                    $return['No'] = 0;
                }

                if (!array_key_exists('Yes', $return)) {
                    $return['Yes'] = 0;
                }

                if (array_key_exists(0, $return)) {
                    $return['No'] = $return[0];
                    unset($return[0]);
                }

                if (array_key_exists(1, $return)) {
                    $return['Yes'] = $return[1];
                    unset($return[1]);
                }

                krsort($return);

                $question['answers'] = $return;

            } else if (in_array($question->input_type, [8])) {
                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->selectRaw('answer_numeric, count(*) as numAnswers')
                    ->groupBy('answer_numeric')
                    ->orderBy('answer_numeric', 'ASC')
                    ->get();

                $return = [];
                foreach ($results as $result) {
                    $return[$result->answer_numeric] = $result->numAnswers;
                }

                $question['answers'] = $return;

            } else if (in_array($question->input_type, [9])) {

                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->whereNotNull('answer_text')
                    ->count();

                $question['count'] = $results;

            } else if (in_array($question->input_type, [10])) {

                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->whereNotNull('answer_gpslat')
                    ->count();

                $question['count'] = $results;

            }

        }

        return $campaign;
    }

    /**
     * Get all the data for a campaign
     *
     * @param $campaign
     */
    private function getCampaignLocationData($campaign, $location_id)
    {
        $campaign->load([
            'questions' => function ($query) {
                $query->orderBy('id', 'asc');
            },
            'questions.type',
            'questions.options',
            'questions.images',
            'alerts.location',
        ]);

        $approved_array = [0, 1];
        // if (Auth::user()->hasRole("Brand Client")) {
        //     $approved_array = [1];
        // }

        foreach ($campaign->questions as $question) {

            if (in_array($question->input_type, [1, 11, 12])) {

                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->where('location_id', $location_id)
                    ->select('answer_text', 'user_id')
                    ->get();

                $question['answers'] = $results;

            } else if (in_array($question->input_type, [2, 3, 4, 5])) {
                $return = [];
                if (!empty($question->options)) {
                    foreach ($question->options as $opt) {
                        $return[$opt->name] = 0;
                    }
                }

                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->where('location_id', $location_id)
                    ->selectRaw('answer_text, count(*) as numAnswers')
                    ->groupBy('answer_text')
                    ->orderBy('numAnswers', 'DESC')
                    ->get();

                foreach ($results as $result) {
                    $return[$result->answer_text] = $result->numAnswers;
                }

                arsort($return);

                $question['answers'] = $return;

            } else if (in_array($question->input_type, [6])) {

                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->where('location_id', $location_id)
                    ->select('question_image_id')
                    ->get();

                $question['images'] = $results;

            } else if (in_array($question->input_type, [7])) {

                $return  = [];
                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->where('location_id', $location_id)
                    ->selectRaw('answer_text, count(*) as numAnswers')
                    ->groupBy('answer_text')
                    ->orderBy('numAnswers', 'DESC')
                    ->get();

                foreach ($results as $result) {
                    $return[$result->answer_text] = $result->numAnswers;
                }

                if (!array_key_exists('No', $return)) {
                    $return['No'] = 0;
                }

                if (!array_key_exists('Yes', $return)) {
                    $return['Yes'] = 0;
                }

                if (array_key_exists(0, $return)) {
                    $return['No'] = $return[0];
                    unset($return[0]);
                }

                if (array_key_exists(1, $return)) {
                    $return['Yes'] = $return[1];
                    unset($return[1]);
                }

                krsort($return);

                $question['answers'] = $return;

            } else if (in_array($question->input_type, [8])) {
                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->where('location_id', $location_id)
                    ->selectRaw('answer_numeric, count(*) as numAnswers')
                    ->groupBy('answer_numeric')
                    ->orderBy('answer_numeric', 'ASC')
                    ->get();

                $return = [];
                foreach ($results as $result) {
                    $return[$result->answer_numeric] = $result->numAnswers;
                }

                $question['answers'] = $return;

            } else if (in_array($question->input_type, [9])) {

                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->where('location_id', $location_id)
                    ->whereNotNull('answer_text')
                    ->count();

                $question['count'] = $results;

            } else if (in_array($question->input_type, [10])) {

                $results = DB::table('question_answers')
                    ->whereCompanyId(session('using_company'))
                    ->whereQuestionId($question->id)
                    ->where('location_id', $location_id)
                    ->whereNotNull('answer_gpslat')
                    ->count();

                $question['count'] = $results;

            }

        }

        return $campaign;
    }

    /**
     * Build up the excel file
     *
     * @param $campaign
     * @return mixed
     */
    public function buildExcelFile($campaign)
    {

        $file = Excel::create(strtolower(preg_replace('/\s+/', '-', $campaign->task_name)) . "-" . Carbon::now()->toW3cString(), function ($excel) use ($campaign) {

            // Set the title
            $excel->setTitle('Campaign Data for ' . $campaign->task_name)
                ->setCreator('Phil Benoit')
                ->setCompany('WinkHq.com')
                ->setDescription('A demonstration to change the file properties');

            $excel->sheet('Data', function ($sheet) use ($campaign) {

                $headings = ['Location', 'User', 'Date', 'Score'];

                foreach ($campaign->questions as $question) {
                    array_push($headings, $question->question);
                }

                $sheet->appendRow($headings);

                foreach ($campaign->submittedTasks() as $task) {
                    $data = [];
                    array_push($data, $task->location->name);
                    if ($task->user) {
                        array_push($data, $task->user->name());
                    } else {
                        array_push($data, 'Unknown');
                    }

                    array_push($data, $task->updated_at->format('d/m/Y \a\t H:i'));

                    foreach ($campaign->questions as $question) {
                        foreach ($task->answers as $answer) {
                            if ($answer->question_id === $question->id) {
                                if (in_array($question->input_type, [1, 2, 3, 7, 9, 11, 12])) {
                                    array_push($data, $answer->answer_text);
                                } elseif ($question->input_type == 8) {
                                    array_push($data, $answer->answer_numeric);
                                } elseif ($question->input_type == 6 && $answer->image) {
                                    array_push($data,
                                        "http://" . session('subdomain') . "." . env('APP_DOMAIN_NAME') . "/images/" . $answer->image->name);
                                } elseif ($question->input_type == 10) {
                                    if ($answer->answer_gpslat != "") {
                                        array_push($data, $answer->answer_gpslat . "," . $answer->answer_gpslong);
                                    } else {
                                        array_push($data, "");
                                    }
                                }
                            }
                        }
                    }

                    $sheet->appendRow($data);
                }

            });

        })->store('xls', storage_path() . '/app/csv/', true);

        return $file;
    }

    /**
     * Build up the excel file for single submission
     *
     * @param $campaign
     * @return mixed
     */
    public function buildSingleExcelFile($task_hash)
    {

        $tasks = DB::select('SELECT tasks.*, question_answers.created_at as answer_created_at FROM `tasks` LEFT JOIN question_answers ON question_answers.task_id = tasks.id
        WHERE tasks.hash = "' . $task_hash . '" GROUP BY tasks.id ORDER BY answer_created_at ASC', []);

        $campaign = Campaign::findOrFail($tasks[0]->campaign_id);

        $theTask = $tasks[0];

        $file = Excel::create(strtolower(preg_replace('/\s+/', '-', $campaign->task_name)) . "-(" . date("y-m-d") . ")-submission-" . $theTask->id, function ($excel) use ($campaign, $theTask) {

            // Set the title
            $excel->setTitle('Campaign Data for ' . $campaign->task_name)
                ->setCreator('Phil Benoit')
                ->setCompany('WinkHq.com')
                ->setDescription('A demonstration to change the file properties');

            $excel->sheet('Data', function ($sheet) use ($campaign, $theTask) {

                foreach ($campaign->submittedTasks() as $task) {
                    if ($task->hash == $theTask->hash) {
                        $data = [];
                        array_push($data, $task->location->name);
                        if ($task->user) {
                            array_push($data, $task->user->name());
                        } else {
                            array_push($data, 'Unknown');
                        }

                        array_push($data, $task->updated_at->format('d/m/Y \a\t H:i'));

                        $sheet->appendRow(["", $campaign->task_name]);
                        $sheet->appendRow(["", $task->location->name . "(" . $task->checked_out_start . ")"]);
                        $sheet->appendRow(["", "", ""]);
                        $sheet->appendRow(["", "", ""]);

                        $sheet->appendRow(["#", "Question", "Answer", "Score"]);
                        $count       = 1;
                        $total_score = 0;
                        foreach ($campaign->questions as $question) {
                            foreach ($task->answers as $answer) {
                                $answer_row = [$count, $question->question];

                                if ($answer->question_id === $question->id) {
                                    if (in_array($question->input_type, [2, 3, 7, 4, 8])) {
                                        array_push($answer_row, $answer->answer_text);

                                        if ($question->input_type == 8) {
                                            $option = QuestionOption::where("name", $answer->answer_numeric)->where("question_id", $question->id)->first();
                                        } else {
                                            $option = QuestionOption::where("name", $answer->answer_text)->where("question_id", $question->id)->first();
                                        }

                                        if ($option->score) {
                                            array_push($answer_row, $option->score);
                                            $total_score = $total_score + $option->score;
                                        } else {
                                            array_push($answer_row, "-");
                                        }

                                    } elseif ($question->input_type == 1 || $question->input_type == 11 || $question->input_type == 12) {
                                        array_push($answer_row, $answer->answer_text);
                                        array_push($answer_row, "-");

                                    } elseif ($question->input_type == 6 && $answer->image) {
                                        array_push($answer_row,
                                            "http://" . session('subdomain') . "." . env('APP_DOMAIN_NAME') . "/images/" . $answer->image->name);
                                        array_push($answer_row, "-");

                                    } elseif ($question->input_type == 10) {

                                        if ($answer->answer_gpslat != "") {
                                            array_push($answer_row, $answer->answer_gpslat . "," . $answer->answer_gpslong);
                                            array_push($answer_row, "-");

                                        } else {
                                            array_push($answer_row, "");
                                            array_push($answer_row, "-");

                                        }
                                    }

                                    $sheet->appendRow($answer_row);
                                    $count++;

                                }

                            }
                        }

                        $sheet->appendRow(["", "", "", ""]);
                        $sheet->appendRow(["", "", "Total Point Awarded", $total_score]);

                    }
                }

            });

        })->store('xls', storage_path() . '/app/csv/', true);
        return $file;
    }

}
