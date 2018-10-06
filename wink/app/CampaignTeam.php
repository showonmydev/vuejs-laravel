<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;

class CampaignTeam extends Model
{
    protected $table = 'campaign_teams';
    protected $fillable = ['campaign_id', 'team_id'];

    // Get all options for a question
    public function teams()
    {
        return $this->hasOne('Wink\Team', 'id', 'team_id');
    }

    public function campaigns()
    {
        return $this->hasOne('Wink\Campaign', 'id', 'campaign_id');
    }
}
