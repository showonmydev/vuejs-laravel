<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuestionOption extends Model
{
    use SoftDeletes;

    protected $table    = 'question_options';
    protected $fillable = ['name', 'question_id', 'campaign_id', 'company_id', 'score'];
    protected $hidden = ['created_at', 'updated_at'];
    protected $dates = ['deleted_at'];
}
