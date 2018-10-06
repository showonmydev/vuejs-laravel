<?php

namespace Wink\Http\Controllers;

use Auth;
use Carbon\Carbon;
use DB;
use Excel;
use Illuminate\Http\Request;
use Wink\AlertRule;
use Wink\Board;
use Wink\Campaign;
use Wink\CampaignFrequency;
use Wink\CampaignLocation;
use Wink\CampaignWave;
use Wink\CompanyRoleUser;
use Wink\Http\Controllers\Controller;
use Wink\Http\Flash;
use Wink\Http\Requests\AlertPostRequest;
use Wink\Http\Requests\CampaignDetailsPostRequest;
use Wink\Http\Requests\CampaignLaunchRequest;
use Wink\Http\Requests\CampaignLaunchUpdateRequest;
use Wink\Question;
// use Illuminate\Support\Collection;
use Wink\QuestionOption;
use Wink\Task;
use Wink\Team;
use Wink\User;

class CampaignsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $frequency = CampaignFrequency::all()->pluck('name', 'id');

        $boards = Board::whereCompanyId($request->session()->get('using_company'))->pluck('name', 'id');

        return view('campaigns.create', compact('frequency', 'boards'));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CampaignDetailsPostRequest $request)
    {

        DB::beginTransaction();

        try {
            // Create the intial campaign object based on post data
            $input                     = $request->all();
            $input['company_id']       = $request->session()->get('using_company');
            $input['creator_id']       = Auth::user()->id;
            $input['report_name']      = $input['task_name'];
            $input['task_name']        = $input['task_name'];
            $input['per_location']     = ($request->has('per_location')) ? $request->per_location : 1;
            $input['time_to_complete'] = $request->time_to_complete;
            $input['description']      = $request->description;
            $input['survey']           = $request->survey;
            $input['frequency']        = $request->frequency;
            $input['brief']            = $request->brief;
            $input['alert_emails']     = $request->alert_emails;
            $input['reward_value']     = $request->reward_value;
            $input['one_per_location'] = ($request->one_per_location == '1') ? true : false;
            $input['start_date']       = ($request->start_date ? Carbon::createFromFormat("Y-m-d H:i:s", $request->start_date)->toDateTimeString() : date("Y-m-d H:i:s"));
            $input['end_date']         = ($request->end_date ? Carbon::createFromFormat("Y-m-d H:i:s", $request->end_date)->toDateTimeString() : date("Y-m-d H:i:s", strtotime("+30 days")));
            $input['board_id']         = $request->board_id;
            $input['hash']             = hash('ripemd160', $input['task_name'] . $input['start_date']);

            // Save to
            $campaign = Campaign::create($input);

            DB::commit();

            if ($request->ajax()) {
                return response()->json(['data' => $campaign, 'message' => ""], 200);
            }

            return redirect('/campaigns/' . $campaign->id . '/questionnaire');

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error creating the campaign', 'error' => $e], 400);
            }

        }

    }

    /**
     * Duplicate an existing campaign
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function duplicate(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            // Retrieve the currrent campaigns details
            $old_campaign = Campaign::with('questions')->findOrFail($id);

            // New campaign name
            $new_name = $old_campaign->report_name . " - Copy";

            // Create new campaign object using existing campaign details
            $input                     = [];
            $input['company_id']       = $old_campaign->company_id;
            $input['creator_id']       = Auth::user()->id;
            $input['report_name']      = $new_name;
            $input['task_name']        = $new_name;
            $input['per_location']     = $old_campaign->per_location;
            $input['time_to_complete'] = $old_campaign->time_to_complete;
            $input['description']      = $old_campaign->description;
            $input['survey']           = $old_campaign->survey;
            $input['frequency']        = $old_campaign->frequency;
            $input['brief']            = $old_campaign->brief;
            $input['alert_emails']     = $old_campaign->alert_emails;
            $input['reward_value']     = $old_campaign->reward_value;
            $input['one_per_location'] = $old_campaign->one_per_location;
            $input['board_id']         = $old_campaign->board_id;
            $input['start_date']       = Carbon::createFromFormat("Y-m-d H:i:s", date("Y-m-d H:i:s"))->toDateTimeString();
            $input['end_date']         = Carbon::createFromFormat("Y-m-d H:i:s", date("Y-m-d H:i:s", strtotime("+ 30 days")))->toDateTimeString();
            $input['hash']             = hash('ripemd160', $new_name . date("his"));

            // Add to DB
            $campaign = Campaign::create($input);

            // Loop throught questions and question options and duplicate for new campaign
            foreach ($old_campaign->questions as $question) {

                // Build question and answers
                $new_question = Question::create([
                    'company_id'  => $old_campaign->company_id,
                    'campaign_id' => $campaign->id,
                    'question'    => $question->question,
                    'prompt'      => $question->prompt,
                    'calc_type'   => $question->calc_type,
                    'input_type'  => $question->input_type,
                    'required'    => $question->required,
                ]);

                $question_options = QuestionOption::where("question_id", $question->id)->get();

                // Add question options for relevant question types
                foreach ($question_options as $option) {

                    QuestionOption::create([
                        'name'        => $option->name,
                        'company_id'  => $question->company_id,
                        'campaign_id' => $question->campaign_id,
                        'question_id' => $new_question->id,
                        'score'       => $option->score,
                    ]);

                }

                // Add an alert for this question if requested
                if ($question['alert']) {
                    AlertRule::create([
                        'company_id'  => $old_campaign->company_id,
                        'question_id' => $new_question->id,
                        'comparator'  => $question['comparator'],
                        'reference'   => ($question['reference_input']) ? strtolower($question['reference_input']) : strtolower($question['reference_select']),
                        'name'        => $question['name'],
                    ]);
                }

            }

            // Get the campaign and other neccessary data into the correct format for front end
            $campaign                   = Campaign::currentCompany()->where("id", $campaign->id)->with('questions.options', 'teams', 'users', 'company')->first();
            $campaign['submittedTasks'] = 0;
            $campaign['createdTasks']   = 0;
            $campaign['location_ids']   = [];

            DB::commit();

            if ($request->ajax()) {
                return response()->json(['data' => $campaign, 'message' => "Campaign successfully duplicated."], 200);
            }

            return redirect('/campaigns/' . $campaign->id . '/questionnaire');

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error duplicating the campaign', 'error' => $e], 400);
            }

        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function details($id)
    {

        $campaign = Campaign::findOrFail($id);

        $frequency = CampaignFrequency::all()->pluck('name', 'id');

        $boards = Board::whereCompanyId(session('using_company'))->pluck('name', 'id');

        return view('campaigns.details', compact('campaign', 'frequency', 'boards'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(CampaignDetailsPostRequest $request, $id)
    {

        DB::beginTransaction();

        try {
            $campaign = Campaign::whereId($id)->whereCompanyId($request->session()->get('using_company'))->first();

            $input                = $request->all();
            $input['report_name'] = $input['task_name'];

            $campaign->update($input);

            // Remove the current campaign targets
            if ($request->has('targets')) {

                $campaign->users()->detach();
                $campaign->teams()->detach();

                // If we are not updating then we are launching or scheduling
                // so we should update the tasks and campaigns
                if ($request->input('update_campaign') != 'true') {
                    Task::where('campaign_id', '=', $id)->update(['complete' => 1]);
                    CampaignWave::where('campaign_id', '=', $id)->delete();
                }

            }

            DB::commit();

            if ($campaign->submitted) {
                return redirect('/campaigns/' . $campaign->id . '/distribute');
            } else {
                return redirect('/campaigns/' . $campaign->id . '/questionnaire');
            }

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error updating the campaign'], 400);
            }

        }

    }

    public function updateCampaignData(Request $request, $id)
    {

        DB::beginTransaction();

        try {

            $campaign = Campaign::whereId($id)->whereCompanyId(session('using_company'))->first();
            $campaign->update([
                "benchmark_score"         => $request->benchmark,
                "max_questionnaire_score" => $request->max_questionnaire_score,
            ]);

            DB::commit();

            if ($request->isJson()) {
                return response()->json(['message' => 'Updated successfully'], 200);
            }

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error updating the campaign'], 400);
            }

        }
    }

    /**
     * Show the form for editing distribute.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function distribute($id)
    {

        $campaign          = Campaign::whereId($id)->whereCompanyId(session('using_company'))->first();
        $selectedLocations = CampaignLocation::whereCampaignId($id)->get();
        $teams             = Team::whereCompanyId(session('using_company'))->get();
        $users_list        = CompanyRoleUser::where('company_id', '=', session('using_company'))->get();
        $users             = User::whereIn('id', $users_list->pluck('user_id'))->get();

        return view('campaigns.distribute', compact('campaign', 'teams', 'users', 'selectedLocations'));

    }

    /**
     * Launch the specific campaign.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function launch(CampaignLaunchRequest $request, $id)
    {

        DB::beginTransaction();

        try {

            // Update the campaign per location number
            $campaign = Campaign::with('questions')
                ->whereId($id)
                ->whereCompanyId(session('using_company'))
                ->first();

            if (empty($campaign->questions)) {
                if ($request->isJson()) {
                    return response()->json(['message' => 'There was an error launching the campaign'], 422);
                }
            }

            // make sure there is a per_location in the request, if there is update it, if not set it to its current value
            $campaign->update([
                'report_name'      => ($request->has('task_name')) ? $request->task_name : $campaign->task_name,
                'task_name'        => ($request->has('task_name')) ? $request->task_name : $campaign->task_name,
                'per_location'     => ($request->has('per_location')) ? $request->per_location : $campaign->per_location,
                'time_to_complete' => $request->time_to_complete,
                'description'      => $request->description,
                'survey'           => $request->survey,
                'report_name'      => $request->task_name,
                'task_name'        => $request->task_name,
                'frequency'        => $request->frequency,
                'brief'            => $request->brief,
                'alert_emails'     => $request->alert_emails,
                'reward_value'     => $request->reward_value,
                'one_per_location' => ($request->one_per_location == '1') ? true : false,
                'start_date'       => Carbon::createFromFormat("Y-m-d H:i:s", $request->start_date)->toDateTimeString(),
                'end_date'         => Carbon::createFromFormat("Y-m-d H:i:s", $request->end_date)->toDateTimeString(),
                'board_id'         => $request->board_id,
            ]);

            // Remove the current campaign targets
            if ($request->has('targets')) {

                $campaign->users()->detach();
                $campaign->teams()->detach();

                // If we are not updating then we are launching or scheduling
                // so we should update the tasks and campaigns
                if ($request->input('update_campaign') != 'true') {
                    Task::where('campaign_id', '=', $id)->update(['complete' => 1]);
                    CampaignWave::where('campaign_id', '=', $id)->delete();
                }

            }

            // Setup the the updated campaign targets
            foreach ($request->targets as $obj) {
                if (strpos($obj['value'], 'user') !== false) {
                    $user_id = str_split($obj['value'], 4);
                    $campaign->users()->attach($user_id[1]); // attach the users to the campaign
                } else {
                    $campaign->teams()->attach($obj['value']); // attach the teams to the campaign
                }
            }

            // If we are launching the campaign now
            if ($request->input('launch_campaign') === "true") {

                $campaign = Campaign::whereId($id)
                    ->whereCompanyId(session('using_company'))
                    ->first();

                // If we have created the campaign waves ok
                if ($this->createWaves($campaign)) {

                    // Get the first campaign wave
                    $wave = CampaignWave::whereCampaignId($campaign->id)
                        ->whereCompanyId(session('using_company'))
                        ->first();

                    // If there is no issues with launching this wave
                    if ($wave->launch()) {

                        $wave->created = true;
                        $wave->save();

                        $campaign->submitted = true;
                        $campaign->save();

                    } else {
                        flash()->error("Error", "There has been an error launching this campaign");
                    }

                } else {

                    flash()->error("Error", "There has been an error launching this campaign");

                }

            }

            // We are scheduling this for a later time
            if ($request->input('schedule_campaign') === 'true' && $request->input('launch_campaign') !== "true") {

                if ($this->createWaves($campaign)) {

                    $campaign->submitted = true;
                    $campaign->save();

                    // flash()->error("Success", "This campaign has been scheduled");

                } else {

                    flash()->error("Error", "There has been an error launching this campaign");

                }

            }

            // If we are only updating a campaign that already exists then
            // we must just update the users and the time to complete
            if ($request->input('update_campaign') === 'true') {

            }

            DB::commit();

            if ($request->ajax()) {
                return response()->json(['data' => $campaign], 200);
            }

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error launching the campaign'], 400);
            }

        }

    }

    /**
     * Update the specific ACTIVE campaign.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function launchUpdate(CampaignLaunchUpdateRequest $request, $id)
    {

        DB::beginTransaction();

        try {
            // Update the campaign per location number
            $campaign = Campaign::whereId($id)
                ->whereCompanyId(session('using_company'))
                ->first();
 
            // make sure there is a per_location in the request, if there is update it, if not set it to its current value
            $campaign->update([
                'report_name'      => ($request->has('task_name')) ? $request->task_name : $campaign->task_name,
                'task_name'        => ($request->has('task_name')) ? $request->task_name : $campaign->task_name,
                'per_location'     => ($request->has('per_location') ? $request->per_location : $campaign->per_location),
                'time_to_complete' => ($request->has('time_to_complete') ? $request->time_to_complete : $campaign->time_to_complete),
                'description'      => ($request->has('description') ? $request->description : $campaign->description),
                'survey'           => ($request->has('survey') ? $request->survey : $campaign->survey),
                'frequency'        => ($request->has('frequency') ? $request->frequency : $campaign->frequency),
                'brief'            => ($request->has('brief') ? $request->brief : $campaign->brief),
                'alert_emails'     => ($request->has('alert_emails') ? $request->alert_emails : $campaign->alert_emails),
                'reward_value'     => ($request->has('reward_value') ? $request->reward_value : $campaign->reward_value),
                'one_per_location' => ($request->has('one_per_location') ? $request->one_per_location : $campaign->one_per_location),
                'start_date'       => Carbon::createFromFormat("Y-m-d H:i:s", $request->start_date)->toDateTimeString(),
                'end_date'         => Carbon::createFromFormat("Y-m-d H:i:s", $request->end_date)->toDateTimeString(),
                'board_id'         => ($request->has('board_id') ? $request->board_id : $campaign->board_id),
            ]);

            // Remove the current campaign targets
            if ($request->has('targets')) {

                $campaign->users()->detach();
                $campaign->teams()->detach();

                // If we are not updating then we are launching or scheduling
                // so we should update the tasks and campaigns
                if ($request->input('update_campaign') != 'true') {
                    Task::where('campaign_id', '=', $id)->update(['complete' => 1]);
                    CampaignWave::where('campaign_id', '=', $id)->delete();
                }

            }

            // Setup the the updated campaign targets
            foreach ($request->targets as $obj) {
                if (strpos($obj['value'], 'user') !== false) {
                    $user_id = str_split($obj['value'], 4);
                    $campaign->users()->attach($user_id[1]); // attach the users to the campaign
                } else {
                    $campaign->teams()->attach($obj['value']); // attach the teams to the campaign
                }
            }

            // If we are launching the campaign now
            if ($request->input('launch_campaign') === "true") {

                $campaign = Campaign::whereId($id)
                    ->whereCompanyId(session('using_company'))
                    ->first();

                // If we have created the campaign waves ok
                if (!$this->createUpdateWaves($campaign)) {

                    flash()->error("Error", "There has been an error launching this campaign");

                }

            }

            DB::commit();

            if ($request->ajax()) {
                return response()->json(['data' => $campaign], 200);
            }

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error updating the campaign', 'error' => $e], 400);
            }

        }

    }

    /**
     * generate Campaign waves base on selected frequency
     *
     * @param  \Illuminate\Http\Campaign $campaign
     *
     * @return boolean
     */
    public function createWaves($campaign)
    {

        DB::beginTransaction();

        try {

            // Create the start and end dates as Carbon
            $start_date = Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date);
            $end_date   = Carbon::createFromFormat(DATE_ISO8601, $campaign->end_date);

            // TODO - this needs to be cleaned up and run in a helper function perhaps.
            // Based on the frequency calculate the waves

            // Generate once-off campaign
            if ($campaign->frequency === 1) {

                CampaignWave::create([
                    'company_id'  => $campaign->company_id,
                    'campaign_id' => $campaign->id,
                    'created'     => false,
                    'start_date'  => Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->toDateTimeString(),
                    'end_date'    => Carbon::createFromFormat(DATE_ISO8601, $campaign->end_date)->toDateTimeString(),
                ]);

            }

            // Generate weekly campaign waves between start and end dates of campaign
            if ($campaign->frequency === 2) {

                for ($start_date; $start_date->lt($end_date); $start_date->addWeek()) {
                    CampaignWave::create([
                        'company_id'  => $campaign->company_id,
                        'campaign_id' => $campaign->id,
                        'created'     => false,
                        'start_date'  => Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date),
                        'end_date'    => Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->addWeek()->toDateTimeString(),
                    ]);
                }

            }

            // Generate monthly campaign waves between start and end dates of campaign
            if ($campaign->frequency === 3) {

                for ($start_date; $start_date->lt($end_date); $start_date->addMonth()) {
                    CampaignWave::create([
                        'company_id'  => $campaign->company_id,
                        'campaign_id' => $campaign->id,
                        'created'     => false,
                        'start_date'  => Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->toDateTimeString(),
                        'end_date'    => Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->addMonth()->toDateTimeString(),
                    ]);
                }

            }

            DB::commit();

            return true;

        } catch (\Exception $e) {

            DB::rollback();

            return false;

        }
    }

    public function createUpdateWaves($campaign)
    {

        DB::beginTransaction();

        try {
            // Create the waves for each campaign

            // Create the start and end dates as Carbon
            $start_date = Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date);
            $end_date   = Carbon::createFromFormat(DATE_ISO8601, $campaign->end_date);

            // TODO - this needs to be cleaned up and run in a helper function perhaps.

            // Based on the frequency calculate the waves
            // If its a single campaign
            if ($campaign->frequency === 1) {
                if (CampaignWave::whereCampaignId($campaign->id)->whereCompanyId($campaign->company_id)->where('start_date', Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->toDateTimeString())->where('end_date', Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->toDateTimeString())->first()) {

                    CampaignWave::create([
                        'company_id'  => $campaign->company_id,
                        'campaign_id' => $campaign->id,
                        'created'     => false,
                        'start_date'  => Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->toDateTimeString(),
                        'end_date'    => Carbon::createFromFormat(DATE_ISO8601, $campaign->end_date)->toDateTimeString(),
                    ]);
                }

            }

            if ($campaign->frequency === 2) {

                for ($start_date; $start_date->lt($end_date); $start_date->addWeek()) {
                    if (CampaignWave::whereCampaignId($campaign->id)->whereCompanyId($campaign->company_id)->where('start_date', Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->toDateTimeString())->where('end_date', Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->addWeek()->toDateTimeString())->first()) {

                        CampaignWave::create([
                            'company_id'  => $campaign->company_id,
                            'campaign_id' => $campaign->id,
                            'created'     => false,
                            'start_date'  => Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date),
                            'end_date'    => Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->addWeek()->toDateTimeString(),
                        ]);
                    }
                }

            }

            if ($campaign->frequency === 3) {

                for ($start_date; $start_date->lt($end_date); $start_date->addMonth()) {
                    if (CampaignWave::whereCampaignId($campaign->id)->whereCompanyId($campaign->company_id)->where('start_date', Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->toDateTimeString())->where('end_date', Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->addMonth()->toDateTimeString())->first()) {
                        CampaignWave::create([
                            'company_id'  => $campaign->company_id,
                            'campaign_id' => $campaign->id,
                            'created'     => false,
                            'start_date'  => Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->toDateTimeString(),
                            'end_date'    => Carbon::createFromFormat(DATE_ISO8601, $campaign->start_date)->addMonth()->toDateTimeString(),
                        ]);
                    }
                }

            }

            DB::commit();

            return true;

        } catch (\Exception $e) {

            DB::rollback();

            return false;

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Sets the given campaign to archive
     *
     * @param $id
     *
     */
    public function archive($id)
    {
        DB::beginTransaction();

        try {

            // // Set the campaign to delete (soft delete)
            if (Auth::user()->hasRole("Administrator") || Auth::user()->hasRole("Root")) {

                $campaign = Campaign::findOrFail($id);

                $input             = [];
                $input['archived'] = 1;

                $campaign->update($input);

                DB::commit();

                $campaigns = Campaign::currentCompany()->where("board_id", $campaign->board_id)->where("archived", 0)->with('questions.options', 'teams', 'users', 'company')->orderBy('id', 'desc')->get();
                $campaigns->each(function ($campaign) {
                    $campaign['submittedTasks'] = $campaign->submittedTasks()->count();
                    $campaign['createdTasks']   = $campaign->createdTasks()->count();
                    $campaign['teams']          = $campaign->createdTasks()->count();
                    $campaign['location_ids']   = DB::table('campaign_locations')->where('campaign_id', $campaign->id)->pluck('location_id');
                });

                return response()->json(['data' => $campaigns, 'message' => "Ok"], 200);

            } else {

                return response()->json(['message' => "Access Forbidden"], 403);

            }

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error arching the campaign'], 400);
            }

        }
    }

    /**
     * Show the excel report for selected campaign
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function report($id)
    {

        $campaignRaw   = Campaign::findOrFail($id);
        $frequency     = CampaignFrequency::where('id', $campaignRaw->frequency)->first();
        $waves         = DB::table('campaign_waves')->where('campaign_id', $campaignRaw->id)->count();
        $tasks         = DB::table('tasks')->where('campaign_id', $campaignRaw->id)->count();
        $tasksComplete = DB::table('tasks')->where('campaign_id', $campaignRaw->id)->where('complete', 1)->count();

        // GET CAMPAIGN DETAILS
        $campaignSheet = array(
            array('CAMPAIGN DETAILS:'),
            array('Name', $campaignRaw->report_name),
            array('Status', ($campaignRaw->completed ? 'Complete' : 'Incomplete')),
            array('Frequency', $frequency->name),
            array('Waves', $waves),
            array('Tasks Total', $tasks),
            array('Tasks Completed', $tasksComplete),
            array('Description', $campaignRaw->description),
            array('Start Date', date("Y-m-d", strtotime($campaignRaw->start_date))),
            array('End Date', date("Y-m-d", strtotime($campaignRaw->end_date))),
            array('Created', date("Y-m-d", strtotime($campaignRaw->created_at))),
            array('Last Updated', date("Y-m-d", strtotime($campaignRaw->updated_at))),
        );

        // GET QUESTION DATA
        $questions = DB::table('questions')
            ->join('question_types', 'questions.input_type', '=', 'question_types.id')
            ->where('questions.campaign_id', $campaignRaw->id)
            ->get();

        $campaignSheet[] = array('');
        $campaignSheet[] = array('QUESTIONS:');
        $campaignSheet[] = array('Question', 'Prompt', 'Required', 'Type', 'Answer Type');

        foreach ($questions as $q) {

            $campaignSheet[] = array($q->question, $q->prompt, ($q->required ? "Yes" : "No"), $q->type, $q->answer_type);
        }

        // GET TEAMS DATA
        $teams = Team::whereCompanyId(session('using_company'))->get();

        $campaignSheet[] = array('');
        $campaignSheet[] = array('TEAMS:');
        $campaignSheet[] = array('Name', 'Description');

        foreach ($teams as $t) {
            $campaignSheet[] = array($t->name, $t->description);
        }

        // GET USER DATA
        $users_list = CompanyRoleUser::where('company_id', '=', session('using_company'))->get();
        $usersRaw   = User::whereIn('id', $users_list->pluck('user_id'))->get();

        $campaignSheet[] = array('');
        $campaignSheet[] = array('USERS:');
        $campaignSheet[] = array('Name', 'Surname', 'Email', 'Roles', 'Teams');

        foreach ($usersRaw as $u) {

            $role = DB::table('company_role_user')
                ->whereCompanyId(session('using_company'))
                ->whereUserId($u->id)
                ->join('roles', 'role_id', '=', 'roles.id')
                ->value('roles.name');
            $campaignSheet[] = array($u->first_name, $u->last_name, $u->email, $role, '');
        }

        // START WAVES / TASKS SHEET

        // GET WAVES DATA
        $waves = DB::table('campaign_waves')
            ->where('campaign_id', $campaignRaw->id)
            ->orderBy('start_date', 'ASC')
            ->get();

        $wcount     = 1;
        $waveSheets = array();
        if (count($waves) > 0) {
            foreach ($waves as $w) {

                $waveData = array(array('TASK NUMBER', 'QUESTION', 'REQUIRED', 'ANSWER TYPE', 'SUBMITTED ANSWER', 'LOCATION', 'TASK STATUS', 'CHECKED OUT BY', 'ALERT'));

                // GET TASKS FOR THIS WAVE
                $tasks = DB::table('tasks')
                    ->leftJoin('locations', 'location_id', '=', 'locations.id')
                    ->leftJoin('users', 'checked_out_id', '=', 'users.id')
                    ->select('tasks.*', 'locations.name', 'locations.city', 'users.first_name', 'users.last_name')
                    ->where('campaign_id', $campaignRaw->id)
                    ->where('wave_id', $w->id)
                    ->orderBy('tasks.id', 'ASC')
                    ->get();

                $tcount = 1;
                foreach ($tasks as $task) {

                    $taskStatus = 'Inactive';
                    if ($task->in_progress == 1) {
                        $taskStatus = 'In Progress';
                    }

                    if ($task->submitted == 1) {
                        $taskStatus = 'Submitted';
                    }

                    if ($task->approved == 1) {
                        $taskStatus = 'Approved';
                    }

                    if ($task->complete == 1) {
                        $taskStatus = 'Completed';
                    }

                    // GET ANSWER FOR THIS TASK
                    $answers = DB::table('question_answers')
                        ->join('questions', 'question_id', '=', 'questions.id')
                        ->join('question_types', 'questions.input_type', '=', 'question_types.id')
                        ->select('question_answers.*', 'questions.question', 'questions.prompt', 'questions.required', 'question_types.type', 'question_types.answer_type')
                        ->where('task_id', $task->id)
                        ->get();

                    if (count($answers) > 0) {
                        $ansCount = 0;

                        foreach ($answers as $ans) {
                            $answer_input = $ans->answer_text;
                            if ($ans->answer_numeric) {
                                $answer_input = $ans->answer_numeric;
                            }

                            if ($ans->answer_yn) {
                                $answer_input = ($ans->answer_yn ? 'Yes' : 'No');
                            }

                            if ($ans->answer_gpslat || $ans->answer_gpslong) {
                                $answer_input = $ans->answer_gpslat . "; " . $ans->answer_gpslong;
                            }

                            if ($ans->question_image_id) {
                                $image        = DB::table('images')->where('id', $ans->question_image_id)->first();
                                $answer_input = asset('/images/' . $image->name);
                            }

                            if ($ans->question_type_id = 7) {
                                $answer_input = ($ans->answer_text == '1' ? 'Yes' : 'No');
                            }

                            $waveData[] = array('TASK ' . $tcount, $ans->question, ($ans->required ? 'Yes' : 'No'), $ans->type, $answer_input, $task->name, $taskStatus, ($task->first_name ? $task->first_name . ' ' . $task->last_name : "None"), ($ans->alert ? 'Yes' : 'No'));
                            $ansCount++;
                        }

                    } else {
                        $waveData[] = array('TASK ' . $tcount, 'No answers submitted for this task');
                    }

                    $tcount++;
                }

                $waveSheets[] = array(
                    'name' => 'Wave ' . $wcount,
                    'data' => $waveData,
                );

                $wcount++;
            }
        }

        Excel::create('Wink Export - ' . $campaignRaw->report_name . ' (' . date("Y-m-d") . ')', function ($excel) use ($campaignRaw, $campaignSheet, $waveSheets) {

            // Set the title
            $excel->setTitle($campaignRaw->report_name);

            // Chain the setters
            $excel->setCreator('WinkHQ')
                ->setCompany('WinkHQ');

            // Call them separately
            $excel->setDescription('An export of the current status of the campaign: ' . $campaignRaw->report_name);

            $excel->sheet('Campaign Details', function ($sheet) use ($campaignSheet) {

                $sheet->fromArray($campaignSheet, null, 'A1', null, null);
                $sheet->setAutoSize(true);
                $sheet->cells('A1:A1', function ($cells) {

                    $cells->setFontColor('#000000');
                    $cells->setFontSize(14);
                    $cells->setFontWeight('bold');

                });

            });

            foreach ($waveSheets as $ws) {
                $excel->sheet('Answers - ' . $ws['name'], function ($sheet) use ($ws) {

                    $sheet->fromArray($ws['data'], null, 'A1', null, null);
                    $sheet->setAutoFilter('A1:I1');
                    $sheet->freezeFirstRow();

                    $sheet->cells('A1:I1', function ($cells) {

                        $cells->setFontColor('#000000');
                        $cells->setFontSize(14);
                        $cells->setFontWeight('bold');

                    });

                    $sheet->setAutoSize(true);

                });
            }

        })->export('xlsx');
    }

    /**
     * Show the excel report for selected campaign question / answers
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function taskReport($id)
    {
        $campaignRaw = Campaign::findOrFail($id);

        $questions = DB::table('questions')
            ->where('questions.campaign_id', $campaignRaw->id)
            ->whereNull('deleted_at')
            ->orderBy('questions.id', 'ASC')
            ->get();

        $tasks = DB::table('tasks')
            ->where('tasks.campaign_id', $campaignRaw->id)
            ->orderBy('tasks.id', 'ASC')
            ->get();

        $headings = array('LOCATION', 'USER', 'DATE');
        foreach ($questions as $q) {
            $headings[] = $q->question;
        }

        $sheet_data = array(
            $headings,
        );

        foreach ($tasks as $t) {
            $output = '';
            $user   = DB::table('question_answers')
                ->join('locations', 'question_answers.location_id', '=', 'locations.id')
                ->join('users', 'users.id', '=', 'question_answers.user_id')
                ->select('question_answers.created_at', 'locations.name', 'users.first_name', 'users.last_name')
                ->where('question_answers.task_id', $t->id)
                ->whereNull('question_answers.deleted_at')
                ->first();

            if (!empty($user)) {
                $output = array($user->name, $user->first_name . ' ' . $user->last_name, $user->created_at);

                foreach ($questions as $q) {

                    $answers = DB::table('question_answers')
                        ->where('question_answers.task_id', $t->id)
                        ->where('question_answers.question_id', $q->id)
                        ->whereNull('deleted_at')
                        ->get();

                    if (!empty($answers)) {
                        $answer_output = null;
                        foreach ($answers as $ans) {
                            $answer_input = $ans->answer_text;
                            if ($ans->answer_numeric) {
                                $answer_input = $ans->answer_numeric;
                            }

                            if ($ans->answer_yn) {
                                $answer_input = ($ans->answer_yn ? 'Yes' : 'No');
                            }

                            if ($ans->answer_gpslat || $ans->answer_gpslong) {
                                $answer_input = $ans->answer_gpslat . "; " . $ans->answer_gpslong;
                            }

                            if ($ans->question_image_id) {
                                $image        = DB::table('images')->where('id', $ans->question_image_id)->first();
                                $answer_input = asset('/images/' . $image->name);
                            }

                            if ($answer_output) {
                                $answer_output .= ", " . $answer_input;
                            } else {
                                $answer_output = $answer_input;
                            }

                        }

                        if ($answer_output) {

                            $output[] = $answer_output;

                        } else {

                            $output[] = '';
                        }

                    } else {
                        $output[] = '';
                    }
                }

                $sheet_data[] = $output;
            }

        }

        Excel::create('Wink Export - ' . $campaignRaw->report_name . ' (' . date("Y-m-d") . ')', function ($excel) use ($campaignRaw, $sheet_data) {

            // Set the title
            $excel->setTitle($campaignRaw->report_name);

            // Chain the setters
            $excel->setCreator('WinkHQ')
                ->setCompany('WinkHQ');

            // Call them separately
            $excel->setDescription('An export of the current status of the campaign: ' . $campaignRaw->report_name);

            $excel->sheet('Campaign Details', function ($sheet) use ($sheet_data) {

                $sheet->fromArray($sheet_data, null, 'A1', null, null);
                $sheet->setAutoSize(true);
                $sheet->freezeFirstRow();

            });

        })->export('xlsx');

    }

    /**
     * Get all questions for a campaign
     *
     * @param $options
     * @param $question
     */
    public function campaignQuestions($id)
    {
        // Get all questions for the selected campaign
        $campaign = Campaign::where('id', $id)->with('questions.options')->orderBy('id', 'desc')->first();
        return response()->json(['data' => $campaign->questions, 'message' => ""], 200);

    }

    /**
     * Create an alert for campaign
     *
     * @param $options
     * @param $question
     */
    public function alertCreate(AlertPostRequest $request)
    {
        DB::beginTransaction();

        try {

            $alertRule = AlertRule::create([
                'company_id'  => $request->session()->get('using_company'),
                'campaign_id' => $request->campaign_id,
                'question_id' => $request->question_id,
                'comparator'  => $request->comparator,
                'reference'   => ($request->reference_input ? strtolower($request->reference_input) : strtolower($request->reference_select)),
                'name'        => $request->name,
            ]);

            DB::commit();

            return response()->json(['data' => $alertRule, 'message' => ""], 200);

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error creating the Alert'], 400);
            }

        }

    }

    /**
     * Edit an alert for campaign
     *
     * @param $options
     * @param $question
     */
    public function alertEdit(AlertPostRequest $request, $id)
    {

        DB::beginTransaction();

        try {
            $alertRule = AlertRule::where("id", $id)->first();
            $alertRule->update([
                'question_id' => $request->question_id,
                'comparator'  => $request->comparator,
                'reference'   => ($request->reference_input ? strtolower($request->reference_input) : strtolower($request->reference_select)),
                'name'        => $request->name,
            ]);

            DB::commit();

            return response()->json(['data' => $alertRule, 'message' => ""], 200);

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error edting the Alert'], 400);
            }

        }

    }

    /**
     * Get all questions for a campaign
     *
     * @param $options
     * @param $question
     */
    public function allReportData($id)
    {
        // Get campaign with question data and all submitted tasks
        $campaignRaw = Campaign::with("questions")->findOrFail($id);
        $tasks       = DB::select('SELECT tasks.*, question_answers.created_at as answer_created_at FROM `tasks`
            LEFT JOIN question_answers ON question_answers.task_id = tasks.id
            WHERE tasks.campaign_id = ' . $campaignRaw->id . '
            AND tasks.checked_out = 1
            GROUP BY tasks.id ORDER BY answer_created_at ASC', []);

        // Generate headings for front end data table from questions
        $headings = array('Location', '', 'User ', 'Date submitted', 'SCORE (' . $campaignRaw->max_questionnaire_score . ')');
        foreach ($campaignRaw->questions as $q) {
            $headings[] = $q->question;
        }
        $sheet_data['headings'] = $headings;

        // Loop through tasks and populate data table question answers and submitter data
        foreach ($tasks as $t) {
            $output = '';
            $user   = DB::table('question_answers')
                ->join('locations', 'question_answers.location_id', '=', 'locations.id')
                ->join('users', 'users.id', '=', 'question_answers.user_id')
                ->select('question_answers.created_at', 'locations.name', 'users.first_name', 'users.last_name')
                ->where('question_answers.task_id', $t->id)
                ->first();

            if (!empty($user)) {
                $output = array("task_id" => $t->id, "approved" => $t->approved, "location" => $user->name, "user" => $user->first_name . ' ' . $user->last_name, "date_created" => $user->created_at, "flagged" => $t->flagged, "answer_created_at" => $t->answer_created_at, "total_score" => 0, "task_hash" => $t->hash);
                $qc     = 0;
                foreach ($campaignRaw->questions as $q) {

                    $answers = DB::table('question_answers')
                        ->where('question_answers.task_id', $t->id)
                        ->where('question_answers.question_id', $q->id)
                        ->get();

                    // Loop through answers and geenerate HTML output for data table
                    if (!empty($answers)) {
                        foreach ($answers as $ans) {

                            $output['questions'][$qc]['type']  = $ans->question_type_id;
                            $output['questions'][$qc]['score'] = 0;

                            $answer_input = $ans->answer_text;
                            if ($ans->answer_numeric) {
                                $answer_input = $ans->answer_numeric;
                            }

                            if ($ans->answer_yn) {
                                $answer_input = ($ans->answer_yn ? 'Yes' : 'No');
                            }

                            if ($ans->answer_gpslat || $ans->answer_gpslong) {
                                $answer_input = $ans->answer_gpslat . "; " . $ans->answer_gpslong;
                            }

                            if ($ans->question_image_id) {
                                $image                           = DB::table('images')->where('id', $ans->question_image_id)->first();
                                $answer_input                    = "<span  class='reportThumb' style='background: url(" . asset('/images/' . $image->name) . ") center center no-repeat; background-size:cover'></span>";
                                $output['questions'][$qc]['src'] = asset('/images/' . $image->name);
                            }

                            if (!isset($output['questions'][$qc]['answer'])) {
                                $output['questions'][$qc]['answer'] = $answer_input;
                            } else {
                                $output['questions'][$qc]['answer'] .= ", " . $answer_input;
                            }
                        }

                        if (!isset($output['question'][$qc]['answer'])) {
                            $output['question'][$qc]['answer'] = ' ';
                        }

                    } else {
                        $output['question'][$qc]['answer'] = ' ';
                    }

                    // For questions with options. Calculate score if present
                    if (in_array($q->input_type, [2, 3, 8, 4, 7])) {

                        $options = DB::table('question_options')
                            ->where('question_id', $q->id)
                            ->get();

                        foreach ($options as $op) {
                            if (isset($output['questions'][$qc]['answer'])) {
                                if ($output['questions'][$qc]['answer'] == $op->name) {
                                    $output['questions'][$qc]['score'] = $op->score;
                                    $output['total_score']             = $output['total_score'] + $op->score;
                                }
                            }
                        }
                    }

                    $qc++;
                }

                $sheet_data['data'][] = $output;
            } else {

            }

        }
        return response()->json(['data' => $sheet_data, 'message' => ""], 200);

    }

    /**
     * Get all questions for a campaign
     *
     * @param $options
     * @param $question
     */
    public function allLocationData($id, $location_id)
    {
        // Get campaign and questions
        $campaignRaw = Campaign::with("questions")->findOrFail($id);

        // Get all tasks for the selected campaign
        $tasks = DB::select('SELECT tasks.*, question_answers.created_at as answer_created_at
            FROM `tasks`
            LEFT JOIN question_answers ON question_answers.task_id = tasks.id
        WHERE tasks.campaign_id = ' . $campaignRaw->id . '
        AND tasks.checked_out = 1
        AND tasks.location_id = ' . $location_id . '
        GROUP BY tasks.id ORDER BY answer_created_at ASC', []);

        // Generate initial headings for the data table
        $headings = array('Location', '', 'User ', 'Date submitted');
        foreach ($campaignRaw->questions as $q) {
            $headings[] = $q->question;
        }

        // Create headings for from the task questions
        $sheet_data['headings'] = $headings;

        // Loop throughthe tasks and check which have been submitted
        foreach ($tasks as $t) {
            $output = '';
            $user   = DB::table('question_answers')
                ->join('locations', 'question_answers.location_id', '=', 'locations.id')
                ->join('users', 'users.id', '=', 'question_answers.user_id')
                ->select('question_answers.created_at', 'locations.name', 'users.first_name', 'users.last_name')
                ->where('question_answers.task_id', $t->id)
                ->first();

            if (!empty($user)) {
                $output = array("task_id" => $t->id, "approved" => $t->approved, "location" => $user->name, "user" => $user->first_name . ' ' . $user->last_name, "date_created" => $user->created_at, "flagged" => $t->flagged, "answer_created_at" => $t->answer_created_at, "task_hash" => $t->hash);

                $qc = 0;
                foreach ($campaignRaw->questions as $q) {

                    $answers = DB::table('question_answers')
                        ->where('question_answers.task_id', $t->id)
                        ->where('question_answers.question_id', $q->id)
                        ->get();

                    if (!empty($answers)) {
                        foreach ($answers as $ans) {

                            $output['questions'][$qc]['type'] = $ans->question_type_id;

                            $answer_input = $ans->answer_text;
                            if ($ans->answer_numeric) {
                                $answer_input = $ans->answer_numeric;
                            }

                            if ($ans->answer_yn) {
                                $answer_input = ($ans->answer_yn ? 'Yes' : 'No');
                            }

                            if ($ans->answer_gpslat || $ans->answer_gpslong) {
                                $answer_input = $ans->answer_gpslat . "; " . $ans->answer_gpslong;
                            }

                            if ($ans->question_image_id) {
                                $image                           = DB::table('images')->where('id', $ans->question_image_id)->first();
                                $answer_input                    = "<span  class='reportThumb' style='background: url(" . asset('/images/' . $image->name) . ") center center no-repeat; background-size:cover'></span>";
                                $output['questions'][$qc]['src'] = asset('/images/' . $image->name);
                            }

                            if (!isset($output['questions'][$qc]['answer'])) {
                                $output['questions'][$qc]['answer'] = $answer_input;
                            } else {
                                $output['questions'][$qc]['answer'] .= ", " . $answer_input;
                            }
                        }

                        if (!isset($output['question'][$qc]['answer'])) {
                            $output['question'][$qc]['answer'] = ' ';
                        }

                    } else {
                        $output['question'][$qc]['answer'] = ' ';
                    }

                    $qc++;
                }

                $sheet_data['data'][] = $output;
            } else {

            }

        }
        return response()->json(['data' => $sheet_data, 'message' => ""], 200);

    }
}
