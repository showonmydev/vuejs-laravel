<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;

class CampaignFrequency extends Model
{
    protected $table = 'campaign_frequency';
    protected $fillable = ['name'];
    public $timestamps  = false;
}
