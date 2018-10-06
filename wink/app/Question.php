<?php

namespace Wink;

use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use SoftDeletes;

    protected $table    = 'questions';
    protected $fillable = ['company_id', 'campaign_id', 'input_type', 'question', 'prompt', 'required', 'calc_type'];
    protected $hidden = ['created_at', 'updated_at'];
    protected $dates = ['deleted_at'];

    /**
     * Attach this to queries in controller to ensure we always restrict
     * the return to the current shop
     * @param $query
     */
    public function scopeCurrentCompany($query){
        $query->where('company_id', '=', session('using_company'));
    }

    // Get the type for a question
    public function type()
    {
        return $this->hasOne('Wink\QuestionType', 'id', 'input_type');
    }

    // Get all options for a question
    public function options()
    {
        return $this->hasMany('Wink\QuestionOption', 'question_id', 'id');
    }

    // Get all the images for this question
    public function images()
    {
        return $this->hasMany('Wink\Image', 'question_id', 'id');
    }

    // find out if this question has an alert rule
    public function alertRule()
    {
        return $this->hasOne('Wink\AlertRule', 'question_id', 'id');
    }
    
    public function firstAnswer(){
        $results =  QuestionAnswer::whereCompanyId(session('using_company'))
            ->whereQuestionId($this->id)->first();
        
        return $results;
    }

    public function getAnswerData()
    {
        return $this->answerData();
    }

    // Return the current answer data for this question
    public function answerData(){

        $results = DB::table('question_answers')
            ->whereCompanyId(session('using_company'))
            ->whereQuestionId($this->id)
            ->selectRaw('answer_text, count(*) as numAnswers')
            ->groupBy('answer_text')
            ->orderBy('numAnswers', 'DESC')
            ->get();

        $return = [];
        foreach ( $results as $result){
            $return[$result->answer_text] = $result->numAnswers;
        }

        return $return;

    }
}
