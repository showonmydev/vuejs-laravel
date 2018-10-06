<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Alert extends Model
{

    use SoftDeletes;

    protected $table = 'alerts';
    protected $fillable = ['company_id','campaign_id', 'location_id', 'task_id', 'question_id', 'actioned', 'name'];
    protected $hidden = ['company_id'];
    protected $dates = ['deleted_at'];

    public function location()
    {
        return $this->hasOne('Wink\Location', 'id', 'location_id');
    }

    public function task()
    {
        return $this->hasOne('Wink\Task', 'id', 'task_id');
    }
}
