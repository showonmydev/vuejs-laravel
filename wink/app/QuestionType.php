<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;

class QuestionType extends Model
{
    protected $table    = 'question_types';
    protected $fillable = ['type', 'answer_type'];
    public $timestamps  = false;
}
