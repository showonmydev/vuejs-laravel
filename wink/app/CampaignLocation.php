<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;

class CampaignLocation extends Model
{
    protected $table = 'campaign_locations';
    protected $fillable = ['campaign_id', 'location_id'];

    public function location()
    {
        return $this->hasOne('Wink\Location', 'id', 'location_id');
    }

    public function campaign()
    {
        return $this->hasOne('Wink\Campaign', 'id', 'campaign_id');
    }
}


