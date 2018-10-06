<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Location extends Model
{
    use SoftDeletes;

    protected $table = 'locations';
    protected $fillable = ['name', 'address', 'street_number', 'street', 'suburb', 'city', 'postal_code', 'province', 'country', 'longitude', 'latitude', 'company_id', 'hash'];
    protected $hidden = ['created_at', 'updated_at'];
    protected $dates = ['deleted_at'];

    /**
     * Attach this to queries in controller to ensure we always restrict
     * the return to the current shop
     * @param $query
     */
    public function scopeCurrentCompany($query)
    {
        $query->where('company_id', '=', session('using_company'));
    }

    public function boards()
    {
        return $this->belongsToMany('Wink\Board', 'board_locations', 'location_id', 'board_id');
    }

    /**
     * Get all of the tags for the location.
     */
    public function tags()
    {
        return $this->morphToMany('Wink\Tag', 'taggable');
    }

    // Get the latest timestamp for all tasks at this location for
    // the passed in campaign
    public function thisCampaignAllTasks($campign_id)
    {
        return Task::whereCompanyId(session('using_company'))
            ->whereCampaignId($campign_id)
            ->whereLocationId($this->id)
            ->get();
    }

    // Get the latest timestamp for all tasks at this location for
    // the passed in campaign
    public function thisCampaignLatestSubmitted($campign_id)
    {
        return Task::whereCompanyId(session('using_company'))
            ->whereCampaignId($campign_id)
            ->whereLocationId($this->id)
            ->max('updated_at');
    }

    // Get all the tasks at this location for the passed in campaign
    public function thisCampaignTotalTasks($campign_id)
    {
        return Task::whereCompanyId(session('using_company'))
            ->whereCampaignId($campign_id)
            ->whereLocationId($this->id);
    }

    // Get all the submitted tasks at this location for the passed in campaign
    public function thisCampaignSubmittedTasks($campign_id)
    {
        return Task::whereCompanyId(session('using_company'))
            ->whereCampaignId($campign_id)
            ->whereLocationId($this->id)
            ->whereSubmitted(1);
    }
}
