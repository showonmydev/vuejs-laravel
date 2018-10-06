<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use SoftDeletes;

    protected $table = 'images';
    protected $fillable = ['company_id', 'campaign_id', 'location_id', 'question_id', 'user_id', 'task_id', 'name'];
    protected $dates = ['deleted_at'];

    public function question()
    {
        return $this->hasOne('Wink\Question', 'id', 'question_id');
    }
}
