<?php

namespace Wink;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Campaign extends Model
{
    use SoftDeletes;

    protected $table = 'campaigns';
    protected $fillable = [
        'company_id',
        'creator_id',
        'board_id',
        'report_name',
        'task_name',
        'description',
        'frequency',
        'per_location',
        'time_to_complete',
        'one_per_location',
        'sort_order',
        'survey',
        'submitted',
        'complete',
        'reward_value',
        'start_date',
        'end_date',
        'brief',
        'alert_emails',
        'max_questionnaire_score',
        'benchmark_score',
        'hash',
        'archived'
    ];
    protected $hidden = ['created_at', 'updated_at'];
    protected $dates = ['start_date', 'end_date', 'deleted_at'];

    public function getCreatedAtAttribute($timestamp)
    {
        return Carbon::parse($timestamp)->toIso8601String();
    }
    public function getStartDateAttribute($timestamp)
    {
        return Carbon::parse($timestamp)->toIso8601String();
    }
    public function getEndDateAttribute($timestamp)
    {
        return Carbon::parse($timestamp)->toIso8601String();
    }
    public function getDeletedAtAttribute($timestamp)
    {
        return Carbon::parse($timestamp)->toIso8601String();
    }

    /**
     * Attach this to queries in controller to ensure we always restrict
     * the return to the current shop
     *
     * @param $query
     */
    public function scopeCurrentCompany($query)
    {
        $query->where('company_id', '=', session('using_company'));
    }

    public function company()
    {
        return $this->hasOne('Wink\Company', 'id', 'company_id');
    }

    public function board()
    {
        return $this->hasOne('Wink\Board', 'id', 'board_id');
    }

    public function howFrequent()
    {
        return $this->hasOne('Wink\CampaignFrequency', 'id', 'frequency');
    }

    public function questions()
    {
        return $this->hasMany('Wink\Question', 'campaign_id', 'id');
    }

    public function alerts()
    {
        return $this->hasMany('Wink\Alert', 'campaign_id', 'id');
    }

    public function alertRules()
    {
        return $this->hasMany('Wink\AlertRule', 'campaign_id', 'id');
    }

    public function images()
    {
        return $this->hasMany('Wink\Image', 'campaign_id', 'id');
    }

    public function questionAnswers()
    {
        return $this->hasMany('Wink\QuestionAnswer', 'campaign_id', 'id');
    }

    public function users()
    {
        return $this->belongsToMany('Wink\User', 'campaign_users', 'campaign_id', 'user_id')->withTimestamps();
    }

    public function teams()
    {
        return $this->belongsToMany('Wink\Team', 'campaign_teams', 'campaign_id', 'team_id')->withTimestamps();
    }

    public function locations()
    {
        return $this->belongsToMany('Wink\Location', 'campaign_locations', 'campaign_id', 'location_id');
    }

    public function createdTasks()
    {

        return Task::whereCompanyId(session('using_company'))
            ->whereCampaignId($this->id)
            ->get();
    }

    public function submittedTasks()
    {

        return Task::whereCompanyId(session('using_company'))
            ->whereCampaignId($this->id)
            ->whereSubmitted(1)
            ->get();
    }

    public function approvedTasks()
    {

        return Task::whereCompanyId(session('using_company'))
            ->whereCampaignId($this->id)
            ->whereApproved(1)
            ->get();
    }

    public function completedTasks()
    {

        return Task::whereCompanyId(session('using_company'))
            ->whereCampaignId($this->id)
            ->whereComplete(1)
            ->get();
    }

    public function hasTasksForReview()
    {

        $tasks = Task::whereCompanyId(session('using_company'))
            ->whereCampaignId($this->id)
            ->whereSubmitted(1)
            ->whereApproved(0)
            ->whereComplete(0)
            ->get();
    }
}
