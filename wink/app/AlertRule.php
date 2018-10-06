<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;

class AlertRule extends Model
{
    protected $table = 'alert_rules';
    protected $fillable = ['company_id', 'campaign_id', 'question_id', 'operator', 'comparator', 'reference', 'name'];
    protected $hidden = ['company_id'];
}
