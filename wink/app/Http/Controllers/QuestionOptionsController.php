<?php

namespace Wink\Http\Controllers;

use Auth;
use Wink\QuestionOption;
use Illuminate\Http\Request;
use Wink\Http\Requests;
use Wink\Http\Controllers\Controller;
use Wink\Http\Requests\QuestionOptionsPostRequest;

class QuestionOptionsController extends Controller
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
    public function create($question_id)
    {
        return view('question_options.create', compact('question_id'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(QuestionOptionsPostRequest $request, $id)
    {

        QuestionOption::create([
            'name'  => $request->name,
            'question_id' => $id,
            'score' => $request->score
            ]);

        return 200;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(QuestionOptionsPostRequest $request, $id)
    {
        $question_option = QuestionOption::whereId($id)->first();

        $question_option->update($request->all());

        // flash()->success("Success", $question->name. " has been updated");

        return 200;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
