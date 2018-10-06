<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;

class CampaignUser extends Model
{
    protected $table = 'campaign_users';
    protected $fillable = ['campaign_id', 'user_id'];

    public function user()
    {
        return $this->hasOne('Wink\User', 'id', 'user_id');
    }

    public function campaign()
    {
        return $this->hasOne('Wink\Campaign', 'id', 'campaign_id');
    }
}
