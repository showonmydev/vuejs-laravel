<?php

namespace Wink\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Wink\AlertRule;
use Wink\Campaign;
use Wink\Http\Controllers\Controller;
use Wink\Http\Requests\QuestionPostRequest;
use Wink\Question;
use Wink\QuestionOption;

class QuestionsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param Request|QuestionPostRequest $request
     * @param $id
     *
     * @return \Illuminate\Http\Response
     */
    public function store(QuestionPostRequest $request, $id)
    {

        DB::beginTransaction();

        try {

            // Remove all current AlertRules, Options and Questions for this campaign
            // We are in draft so we can do this.
            //AlertRule::where
            QuestionOption::whereCampaignId($id)->delete();
            Question::whereCampaignId($id)->delete();

            $questions  = $request->all();
            $dbQuestion = null;

            foreach ($questions as $question) {

                // Build question and answers
                if ($question['question']) {
                    $dbQuestion = Question::create([
                        'company_id'  => $request->session()->get('using_company'),
                        'campaign_id' => $id,
                        'question'    => $question['question'],
                        'prompt'      => $question['prompt'],
                        'calc_type'   => $question['calc_type'],
                        'input_type'  => $question['input_type'],
                        'required'    => $question['required'],
                    ]);
                }

                // Add question options for relevant question types
                if ($question['input_type'] == 2 || $question['input_type'] == 4 || $question['input_type'] == 7 || $question['input_type'] == 8) {
                    $this->saveOptions($question['options'], $dbQuestion);
                }

                // Add an alert for this question if requested
                // if (isset($question['alert'])) {
                //     AlertRule::create([
                //         'company_id'  => $request->session()->get('using_company'),
                //         'question_id' => $dbQuestion->id,
                //         'comparator'  => $question['comparator'],
                //         'reference'   => ($question['reference_input']) ? strtolower($question['reference_input']) : strtolower($question['reference_select']),
                //         'name'        => $question['name'],
                //     ]);
                // }

            }

            DB::commit();

            $returnCampaign = Campaign::whereId($id)->with('questions.options')->first();

            return response()->json(['data' => $returnCampaign->questions, 'message' => ""], 200);

        } catch (\Exception $e) {

            DB::rollback();
            return response()->json(['error' => "There was an error saving your question" . json_encode($e)], 404);

        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(QuestionPostRequest $request, $id)
    {

        \Log::info($request->all());

        $question = Question::whereId($id)->first();

        if ($request->has('required')) {
            $request['required'] = ($request->required === "on" ? true : false);
        } else {
            $request['required'] = false;
        }

        DB::beginTransaction();

        try {

            $question->update($request->all());

            // On all new question submission remove all the current ones
            QuestionOption::whereQuestionId($question->id)->delete();

            // If the updated question is a dropdown then add the options back in
            if ($request->has('option') && ($question->input_type == 2 || $question->input_type == 4)) {

                $options = $request->option;
                $this->saveOptions($options, $question);

            }

            if ($request->has('reference_input') || $request->has('reference_select')) {
                AlertRule::create([
                    'company_id'  => $request->session()->get('using_company'),
                    'question_id' => $question->id,
                    'comparator'  => $request->comparator,
                    'reference'   => ($request->has('reference_input')) ? strtolower($request->reference_input) : strtolower($request->reference_select),
                    'name'        => $request->name,
                ]);
            }

            DB::commit();

        } catch (\Exception $e) {

            DB::rollback();
            flash()->error("Error", "There was an error saving your question");

        }

        return redirect('/campaigns/' . $question->campaign_id . '/questionnaire');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $question = Question::whereId($id)->first();

        // Delete all associated elements
        QuestionOption::whereQuestionId($question->id)->delete();
        AlertRule::whereQuestionId($question->id)->delete();

        $question->delete();

        return redirect('/campaigns/' . $question->campaign_id . '/questionnaire');
    }

    /**
     * Save the options for a question to the DB
     *
     * @param $options
     * @param $question
     */
    public function saveOptions($options, $question)
    {
        foreach ($options as $option) {
            if ($option['name'] != null) {
                QuestionOption::create([
                    'name'        => $option['name'],
                    'company_id'  => $question->company_id,
                    'campaign_id' => $question->campaign_id,
                    'question_id' => $question->id,
                    'score'       => $option['score'],
                ]);
            }
        }
        return;

    }

}
