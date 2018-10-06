<?php

namespace Wink\Http\Controllers;

use Auth;
use Carbon\Carbon;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Mail;
use Response;
use Storage;
use Wink\AccountingLog;
use Wink\Alert;
use Wink\Campaign;
use Wink\Company; 
use Wink\CompanyRoleUser;
use Wink\Events\RewardBalanceReminder;
use Wink\Http\Controllers\Controller;
use Wink\Image;
use Wink\Location;
use Wink\Question;
use Wink\QuestionAnswer;
use Wink\QuestionOption;
use Wink\Task;
use Wink\User;

class TasksController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['only' => ['all', 'saveMobileAnswers', 'checkout']]);
        //$this->middleware('cors', ['only' => ['all', 'saveMobileAnswers', 'checkout']]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Show the given task to the user
        $task = Task::find($id);

        $campaign = Campaign::find($task->campaign_id);

        // Update the status of the task to checked out
        $task->checked_out       = true;
        $task->checked_out_id    = Auth::user()->id;
        $task->checked_out_start = Carbon::now();
        $task->save();

        $answers = collect();

        if ($task->submitted) {
            $answers = QuestionAnswer::whereTaskId($task->id)->whereNull('deleted_at')->get();
        }

        return view('tasks.show', compact('campaign', 'task', 'answers'));
    }

    /**
     * Display all information for a selected submission for editing
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function showSubmissionData($id)
    {
        $task    = Task::find($id);
        $answers = QuestionAnswer::whereTaskId($task->id)->whereNull('deleted_at')->get()->toArray();

        $output = array();

        foreach ($answers as $a) {

            if (!array_key_exists($a['question_id'], $output)) {
                $qid            = $a['id'];
                $a['options']   = QuestionOption::where("question_id", $a['question_id'])->get();
                $a['answer_id'] = $a['id'];
                $a['question']  = Question::where('id', '=', $a['question_id'])->first();

                if ($a['question_type_id'] == 4) {
                    $a['choices'][] = $a['answer_text'];
                }
                $output[$a['question_id']] = $a;
            } else {
                $output[$a['question_id']]['answer_text'] .= "," . $a['answer_text'];
                $output[$a['question_id']]['choices'][] = $a['answer_text'];
            }

        }

        return response()->json(['task' => $task, 'answers' => $output], 200);
    }

    /**
     * Update and approve the selected tasks submission
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function tasksEditApprove(Request $request, $id)
    {

        $form = $request->all();

        $task    = Task::find($id);
        $answers = QuestionAnswer::whereTaskId($task->id)
            ->leftJoin('questions', 'questions.id', '=', 'question_answers.question_id')
            ->whereNull('question_answers.deleted_at')
            ->get();

        DB::beginTransaction();

        $campaign = Campaign::where('id', $task->campaign_id)->first();
        $company  = Company::where('id', $campaign->company_id)->first();

        try {

            // $task->approved = TRUE;
            // $task->save();

            foreach ($form as $key => $val) {

                $value = $val[0];

                $answer_id = str_replace("q_", "", $key);
                $answers   = QuestionAnswer::where("id", $answer_id)->whereNull('deleted_at')->first();

                if (in_array($answers->question_type_id, [4])) {

                    QuestionAnswer::where("question_id", $answers->question_id)->where("task_id", $answers->task_id)->delete();

                    foreach ($val as $v) {
                        $answer = new QuestionAnswer;

                        $answer->company_id  = $answers->company_id;
                        $answer->location_id = $answers->location_id;
                        $answer->campaign_id = $answers->campaign_id;
                        $answer->task_id     = $answers->task_id;

                        $answer->user_id          = $answers->user_id;
                        $answer->question_id      = $answers->question_id;
                        $answer->question_type_id = 4;
                        $answer->answer_text      = $v;
                        $answer->save();
                    }
                }

                if (in_array($answers->question_type_id, [1, 2, 3, 5, 9])) {
                    $answers->answer_text = $value;
                }

                if (in_array($answers->question_type_id, [8])) {
                    $answers->answer_numeric = $value;
                }

                if (in_array($answers->question_type_id, [7])) {
                    $answers->answer_text = $value;
                    // $answers->answer_yn = ($value == 'Yes' ? 1 : 0 );
                }

                if (in_array($answers->question_type_id, [6])) {
                    $answers->question_image_id = $value;
                }

                if (in_array($answers->question_type_id, [10])) {
                    $answers->answer_gpslat  = $val[0];
                    $answers->answer_gpslong = $val[1];
                }

                $answers->save();
            }

            DB::commit();

            return response()->json(['message' => 'Submission updated and approved successfully', 'status' => 200, 'data' => $answers], 200);

        } catch (\Exception $e) {

            DB::rollback();

            return response()->json(['message' => 'Error updating submission', 'error' => $e, 'status' => 422], 422);
        }

    }

    /**
     * Approve the selected tasks
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function tasksApprove(Request $request)
    {

        $form  = $request->all();
        $tasks = $form['selectedSubmissions'];

        DB::beginTransaction();

        try {

            foreach ($tasks as $t) {

                $task = Task::find($t);

                $campaign = Campaign::where('id', $task->campaign_id)->first();
                $company  = Company::where('id', $campaign->company_id)->first();
                $user     = User::where('id', $task->checked_out_id)->first();

                $count = 0;

                if ($company->rewards == 1 && $campaign->reward_value > 0 && $task->approved == 0 && !empty($user)) {
                    if ($company->balance >= $campaign->reward_value) {
                        $company->update(['balance' => ($company->balance - $campaign->reward_value)]);

                        if (!empty($user)) {
                            $user->update(['balance' => ($user->balance + $campaign->reward_value)]);

                            // Log reward payout
                            AccountingLog::create([
                                'user_id'    => $user->id,
                                'action'     => 'Submission Approval',
                                'notes'      => 'Reward Payout Success',
                                'amount'     => $campaign->reward_value,
                                'company_id' => $company->id,
                            ]);
                        }

                    } else {
                        // Generate the reminder email to be sent to all company admin
                        $company_users_list = CompanyRoleUser::where('company_id', '=', session('using_company'))->where('role_id', '>=', 1)->first();
                        $company_users      = User::whereIn('id', $company_users_list->pluck('user_id'))->get();
                        foreach ($company_users as $c_user) {
                            if ($c_user->email) {
                                event(new RewardBalanceReminder($company, $company_user));
                            }
                        }

                        // Log reward payout
                        AccountingLog::create([
                            'user_id'    => Auth::user()->id,
                            'action'     => 'Submission Approval',
                            'notes'      => 'Reward Payout Fail - Insufficient Funds',
                            'company_id' => $company->id,
                        ]);

                        throw new Exception("Insufficent funds to pay reward.");
                    }
                }

                $task           = Task::find($t);
                $task->approved = 1;
                $task->save();

                $count++;
                $campaign_id = $task->campaign_id;

            }

            DB::commit();

            return response()->json(['message' => 'Submissions approved successfully', 'status' => 200], 200);

        } catch (\Exception $e) {

            DB::rollback();

            return response()->json(['message' => 'Error approving submissions', 'error' => $e, 'status' => 422], 422);
        }

    }

    /**
     * Delete the selected tasks submissions
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function tasksDelete(Request $request)
    {

        $form  = $request->all();
        $tasks = explode(",", $form['deleteSubmissions']);

        DB::beginTransaction();

        try {

            foreach ($tasks as $t) {

                $task     = Task::find($t);
                $campaign = Campaign::find($task->campaign_id);

                $task->checked_out       = false;
                $task->in_progress       = 0;
                $task->submitted         = 0;
                $task->approved          = 0;
                $task->complete          = 0;
                $task->checked_out_id    = null;
                $task->checked_out_start = null;
                $task->created_at        = Carbon::now();
                $task->end_date          = Carbon::parse($campaign->end_date)->addDays(6);
                $task->save();

                DB::table('question_answers')->where('task_id', '=', $t)->delete();

            }

            if ($form['extendCampaign'] == true) {
                DB::table('campaigns')->where('id', '=', $campaign->id)->update(['end_date' => Carbon::parse($campaign->end_date)->addDays(7)]);
            }

            DB::commit();

            return response()->json(['message' => 'Submissions deleted successfully', 'status' => 200], 200);

        } catch (\Exception $e) {

            DB::rollback();

            return response()->json(['message' => 'Error deleting submissions', 'error' => $e, 'status' => 422], 422);
        }

    }

    //  Save the specified campaign answer submission.
    /**
     * @SWG\Get(
     *   path="/answers/{$task_id}}",
     *   summary="Save task answer submission",
     *   tags={"save_answers"},
     *   description="Submit answers for a task",
     *   operationId="single",
     *   produces={"application/json"},
     *   @SWG\Parameter(
     *       name="id",
     *       in="path",
     *       required=true,
     *       type="integer",
     *       description="Task ID",
     *   ),
     *    @SWG\Parameter(
     *       name="data",
     *       in="query",
     *       required=true,
     *       type="string",
     *       description="Json array of answers",
     *   ),
     *   @SWG\Response(
     *       response=200,
     *       description="successful operation",
     *   ),
     *   @SWG\Response(
     *       response="404",
     *       description="Tasks not found",
     *   ),
     *   deprecated=false
     * )
     */
    public function saveAnswers(Request $request, $id)
    {

        if ($request->isJson()) {
            $answers = json_decode($request->getContent(), true);
        } else {
            $answers = $request->all();
        }

        if (empty($answers)) {

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error saving your answers. No answers were submitted.'], 500);
            }

            flash()->error("Error", "There was an error saving your answers. No answers were submitted.");
        }

        $task     = Task::find($id);
        $campaign = Campaign::find($task->campaign_id);
        $company  = Company::find($campaign->company_id);

        if ($task->in_progress && $task->submitted) {

            if ($request->isJson()) {

                return Response::json([
                    'message' => 'This task has already been submitted',
                ], 500);

            }
            flash()->error("Error", "This task has already been submitted");

            return redirect()->back();

        }

        DB::beginTransaction();

        try {

            foreach ($answers as $keyk => $value) {

                if (stristr($keyk, "_")) {
                    $key_arr = explode("_", $keyk);
                    $key     = $key_arr[1];
                } else {
                    $key = $keyk;

                }

                $question = Question::findOrFail($key);

                $answer = new QuestionAnswer;

                $answer->company_id  = $question->company_id;
                $answer->location_id = $task->location_id;
                $answer->campaign_id = $task->campaign_id;
                $answer->task_id     = $task->id;

                $answer->user_id          = Auth::user()->id;
                $answer->question_id      = $key;
                $answer->question_type_id = $question->input_type;

                // If the question type is a text, dropdown, yes/no or barcode field or multi select
                $value_answers = [1, 2, 7, 9, 4, 11, 12];
                if (in_array($question->input_type, $value_answers)) {
                    $answer->answer_text = $value;
                }

                // Is a rating input type
                if ($question->input_type === 8 && gettype($value)) {
                    $answer->answer_numeric = $value;
                }

                // If the question type is image
                if ($question->input_type === 6) {

                    if (gettype($value) === 'object') {
                        Storage::put(
                            'images/q' . $key . '-' . $value->getClientOriginalName(),
                            file_get_contents($value->getRealPath())
                        );
                        $savedFile = Image::create([
                            'company_id'  => $question->company_id,
                            'question_id' => $question->id,
                            'name'        => 'q' . $key . '-' . $value->getClientOriginalName(),
                        ]);
                        $answer->question_image_id = $savedFile->id;
                    }

                    if (gettype($value) === 'integer') {
                        // check if image exists
                        $image = Image::where('id', $value)->first();
                        if ($image) {
                            $answer->question_image_id = $value;
                        }
                    }
                }

                // If the question type is GPS
                if ($question->input_type === 10) {
                    $gps                    = explode(",", $value);
                    $answer->answer_gpslat  = $gps[0];
                    $answer->answer_gpslong = $gps[1];
                }

                $answer->save();

                if ($rule = $question->alertRule()->first()) {

                    // If the answer matches the alert rule
                    $alert_rule_triggered = false;
                    if ($question->input_type != 6) {

                        if ($rule->comparator == "!=") {
                            if (strpos(strtolower($value), strtolower($rule->reference)) !== false) {
                                $alert_rule_triggered = true;
                            }
                        } else if ($rule->comparator == "=") {
                            if (strtolower($value) == strtolower($rule->reference)) {
                                $alert_rule_triggered = true;
                            }
                        } else if ($rule->comparator == ">") {
                            if (strtolower($value) > strtolower($rule->reference)) {
                                $alert_rule_triggered = true;
                            }
                        } else if ($rule->comparator == "<") {
                            if (strtolower($value) < strtolower($rule->reference)) {
                                $alert_rule_triggered = true;
                            }
                        }

                    }

                    if ($alert_rule_triggered) {
                        // Create an alert for this question

                        Alert::create([
                            'company_id'  => $question->company_id,
                            'campaign_id' => $task->campaign_id,
                            'location_id' => $task->location_id,
                            'task_id'     => $task->id,
                            'question_id' => $question->id,
                            'name'        => $rule->name,
                        ]);
                    }

                }
            }

            $task->in_progress = true;
            $task->submitted   = true;
            $task->submitted_date   = Carbon::now();
            $task->save();

            if ($campaign->alert_emails != '') {
                $emails = explode(",", $campaign->alert_emails);

                $email_data = array(
                    'task_id'  => $task->id,
                    'url'      => "http://" . $company->subdomain . "." . env('APP_DOMAIN_NAME') . '/reports/campaign/' . $campaign->id . '/submissions/' . $task->id,
                    'campaign' => $campaign,
                    'emails'   => $emails,
                );

                Mail::send('emails.submissionAlert', $email_data, function ($message) use ($email_data) {
                    $message->to($email_data['emails'])->subject('New Task Submission');
                    $message->from(env('PAYMENTS_FROM_EMAIL'), '');
                });
            }

            DB::commit();

            if ($request->isJson()) {
                return response()->json(['message' => 'Answers saved successfully'], 200);
            }

            return view('tasks.complete');

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error saving your answers', 'error' => $e], 500);
            }
            flash()->error("Error", "There was an error saving your answers");
        }
    }

    /**
     * Save mobile answers, setup this way s owe can add
     * jwt token security to the api
     *
     * @param Request $request
     * @param         $id
     */
    public function saveMobileAnswers(Request $request, $id)
    {
        return $this->saveAnswers($request, $id);
    }

    /**
     * Mark a task as checked out via the API
     */
    public function checkout($id)
    {

        $task = Task::find($id);
        if ($task) {

            $campaign = Campaign::find($task->campaign_id);

            if (strtotime($campaign->end_date) < strtotime(date("Y-m-d H:i:s"))) {
                return response()->json(['message' => 'Checkout task failed. Campaign is no longer active.'], 422);
            }

            $campaign = Campaign::where('id', $task->campaign_id)->first();
            $company  = Company::where('id', $campaign->company_id)->first();

            if ($company->rewards == 1 && $campaign->reward_value > 0) {
                if ($company->balance <= $campaign->reward_value) {
                    return response()->json(['message' => 'Checkout task failed. Insufficient funds for checkout.'], 422);
                }
            }

            DB::beginTransaction();

            try {

                $task->checked_out       = true;
                $task->checked_out_id    = Auth::user()->id;
                $task->checked_out_start = Carbon::now();
                $task->save();

                DB::commit();
                return Response::json([
                    'message' => 'Checkout task successful',
                ], 200);

            } catch (\Exception $e) {

                DB::rollback();
                return response()->json(['message' => 'Checkout task failed'], 500);

            }

        } else {
            return Response::json([
                'message' => 'Checkout task failed',
            ], 500);
        }
    }

    // Serve all the tasks back
    /**
     * @SWG\Get(
     *   path="/tasks/{$lat}/{$long}",
     *   summary="Get all tasks that user can checkout",
     *   tags={"tasks"},
     *   description="Get all tasks a user can checkout. The return will be a JSON object containing an array of available tasks",
     *   operationId="single",
     *   produces={"application/json"},
     *   @SWG\Parameter(
     *       name="lat",
     *       in="path",
     *       required=false,
     *       type="integer",
     *       description="INT",
     *   ),
     *    @SWG\Parameter(
     *       name="long",
     *       in="path",
     *       required=false,
     *       type="integer",
     *       description="INT",
     *   ),
     *   @SWG\Response(
     *       response=200,
     *       description="successful operation",
     *       @SWG\Schema(
     *               type="array",
     *               @SWG\Items(ref="#/definitions/Task")
     *          ),
     *   ),
     *   @SWG\Response(
     *       response="404",
     *       description="Tasks not found",
     *   ),
     *   deprecated=false
     * )
     */
    public function all($lat = '-33.918861', $long = '18.423300')
    {

        $start = Input::get('start', 0);
        $limit = Input::get('limit', 20);

        $tasks = with(new Task)->userShouldComplete($lat, $long, $start, $limit);

        if (!$tasks) {
            return Response::json([
                'data'    => [],
                'message' => 'There are no current tasks for you',
            ], 200);
        }

        return Response::json([
            'data' => $this->transformCollection($tasks),
        ], 200);

    }

    // Serve a single the tasks back
    /**
     * @SWG\Get(
     *   path="/task/{id}",
     *   summary="Get a single task by ID",
     *   tags={"tasks"},
     *   description="Get a task by its ID. The return will be a JSON block with the task and its questions defined",
     *   operationId="single",
     *   produces={"application/json"},
     *   @SWG\Parameter(
     *       name="id",
     *       in="path",
     *       required=true,
     *       type="integer",
     *       description="INT",
     *   ),
     *   @SWG\Response(
     *       response=200,
     *       description="successful operation",
     *       @SWG\Schema(
     *          type="array",
     *          @SWG\Items(ref="#/definitions/Task")
     *       ),
     *   ),
     *   @SWG\Response(
     *       response="404",
     *       description="Task not found",
     *   ),
     *   deprecated=false
     * )
     */
    public function single($id)
    {

        $task      = Task::find($id);
        $questions = Question::where('campaign_id', $task->campaign_id)->get();
        $campaign  = Campaign::where('id', $task->campaign_id)->first();

        if (!$task || !$questions) {
            return Response::json([
                'message' => 'Task not found',
            ], 404);
        }

        $campaign->description = strip_tags($campaign->description);

        return Response::json([
            'data' => array("task" => $task, "questions" => $questions, "campaign" => $campaign),
        ], 200);

    }

    private function transformCollection($tasks)
    {
        return array_map([$this, 'transform'], $tasks);
    }

    private function transform($task)
    {
        unset($task['created_at']);
        unset($task['updated_at']);
        unset($task['location.created_at']);
        unset($task['location.updated_at']);
        $task['description'] = strip_tags($task['description']);

        return $task;
    }

    /**
     * Toggle review flag
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function toggleReviewFlag($id)
    {

        DB::beginTransaction();

        try {

            $task          = Task::find($id);
            $flag          = ($task->flagged == 1 ? 0 : 1);
            $task->flagged = $flag;
            $task->save();

            DB::commit();

            return response()->json(['message' => 'Submissions updated', 'status' => 200, 'data' => $flag], 200);

        } catch (\Exception $e) {

            DB::rollback();

            return response()->json(['message' => 'Error updating submissions', 'error' => $e, 'status' => 422], 422);
        }

    }

    /**
     * Output user submission history
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function taskHistory($id)
    {

        $task_results = Task::where('checked_out_id', $id)->get();
        $output       = array();

        foreach ($task_results as $task) {
            $task->campaign = Campaign::where('id', $task->campaign_id)->first();
            $task->answers  = QuestionAnswer::where('task_id', $task->id)->leftJoin('questions', 'question_answers.question_id', '=', 'questions.id')->whereNull('question_answers.deleted_at')->get();
            $task->location = Location::where('id', $task->location_id)->first();
            $output[]       = $task;
        }

        return response()->json($output, 200);

    }
}
