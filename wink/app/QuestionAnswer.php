<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuestionAnswer extends Model
{
    use SoftDeletes;

    protected $table    = 'question_answers';
    protected $fillable = ['user_id', 'task_id', 'question_id', 'location_id', 'answer_text', 'answer_numeric', 'answer_yn'];
    protected $dates = ['deleted_at'];

    public function image()
    {
        return $this->hasOne('Wink\Image', 'id', 'question_image_id');
    }

    public function question()
    {
        return $this->hasOne('Wink\Question', 'id', 'question_id');
    }

    public function user(){
        return $this->hasOne('Wink\User', 'id', 'user_id');
    }
}
