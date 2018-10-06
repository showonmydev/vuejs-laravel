<?php

namespace Wink;

use Carbon\Carbon;
use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
    * @SWG\Definition(
    *   definition="Task",
    *   required={"company_id"},
    *   @SWG\Property(
    *       property="company_id",
    *       type="int",
    *       description="The company ID",
    *       example="1"
    *   ),
    *   @SWG\Property(
    *       property="campaign_id",
    *       type="int",
    *       description="The ID of the campaign",
    *       example="1"
    *   ),
    *   @SWG\Property(
    *       property="location_id",
    *       type="int",
    *       description="The ID of the location",
    *       example="1"
    *   ),
    *   @SWG\Property(
    *       property="wave_id",
    *       type="int",
    *       description="The ID of the wave this task is linked to",
    *       example="1"
    *   ),
    *   @SWG\Property(
    *       property="checked_out",
    *       type="bool",
    *       description="Is the task checked out currently",
    *       example="1"
    *   ),
    *   @SWG\Property(
    *       property="checked_out_start",
    *       type="string",
    *       format="date-time",
    *       description="Date the checked out task started",
    *       example="2017-03-01 00:00:00"
    *   ),
    *   @SWG\Property(
    *       property="checked_out_id",
    *       type="int",
    *       description="The ID of the user who has currently checked out this task",
    *       example="1"
    *   ),
    *   @SWG\Property(
    *       property="in_progress",
    *       type="bool",
    *       description="Is the task currently in progress",
    *       example="1"
    *   ),
    *   @SWG\Property(
    *       property="submitted",
    *       type="bool",
    *       description="Has the task been submitted with answers",
    *       example="1"
    *   ),
    *   @SWG\Property(
    *       property="approved",
    *       type="bool",
    *       description="Has the task been approved / accepted",
    *       example="1"
    *   ),
    *   @SWG\Property(
    *       property="complete",
    *       type="bool",
    *       description="Is the task complete",
    *       example="1"
    *   ),
    *   @SWG\Property(
    *       property="end_date",
    *       type="string",
    *       format="date-time",
    *       description="The end date of the task",
    *       example="2017-03-01 00:00:00"
    *   ),
    * )
*/

class Task extends Model
{
    use SoftDeletes;
    protected $table    = 'tasks';
    protected $fillable = [
        'company_id', 
        'campaign_id', 
        'location_id',
        'wave_id',
        'checked_out',
        'checked_out_start',
        'checked_out_id',
        'in_progress',
        'submitted',
        'approved',
        'reward_paid',
        'complete',
        'end_date',
        'updated_at',
        'flagged',
        'hash',
        'submitted_date'
    ];

    protected $dates = ['checked_out_start', 'end_date', 'deleted_at'];

    public function getCheckedOutStartAttribute( $timestamp )
    {
        return Carbon::parse($timestamp)->toIso8601String();
    }
    public function getEndDateAttribute( $timestamp )
    {
        return Carbon::parse($timestamp)->toIso8601String();
    }
    public function getDeletedAtAttribute( $timestamp )
    {
        return Carbon::parse($timestamp)->toIso8601String();
    }

    public function scopeCurrentCompany($query){
        return $query->where('company_id', '=', session('using_company'));
    }

    public function userShouldComplete($latCoordinate = '-33.918861', $longCoordinate = '18.423300', $start = 0, $limit = 50){

        $radiusKm = 50;

        $query = "SELECT a.id
       ,a.campaign
       ,a.location_id
       ,a.distance_kms
       ,a.survey
       ,min(a.task_id) task_id
  FROM (SELECT cu.id
               ,cu.campaign_id
               ,cu.campaign
               ,cu.one_per_location
               ,cu.survey
               ,t.id task_id
               ,t.location_id
               ,get_geo_dist_km(l.latitude, l.longitude, " . $latCoordinate .", " . $longCoordinate . ") distance_kms
          FROM (SELECT u.id
                       ,c.id campaign_id
                       ,c.report_name campaign
                       ,c.one_per_location
                       ,c.survey
                  FROM campaign_users cu
                       INNER JOIN campaigns c ON c.id = cu.campaign_id
                       INNER JOIN users u ON u.id = cu.user_id
                 WHERE u.id = ". Auth::user()->id . "
                 AND c.end_date > NOW()
                 ".(session()->get('using_company') ? "AND c.company_id = " . session()->get('using_company') : "" )."
                 
                UNION
                SELECT u.id
                       ,c.id campaign_id
                       ,c.report_name
                       ,c.one_per_location
                       ,c.survey
                  FROM campaign_teams ct
                       INNER JOIN campaigns c ON c.id = ct.campaign_id
                       INNER JOIN teams t ON t.id = ct.team_id
                       INNER JOIN team_user tu ON tu.team_id = t.id
                       INNER JOIN users u ON u.id = tu.user_id
                 WHERE u.id = ". Auth::user()->id . "
                 AND c.end_date > NOW()
                 ) cu

               INNER JOIN tasks t ON t.campaign_id = cu.campaign_id
               INNER JOIN locations l ON l.id = t.location_id
         WHERE cu.id = ". Auth::user()->id . "
           AND (t.checked_out = 0
            OR t.checked_out_id = ". Auth::user()->id . ")
           AND t.submitted = 0
           AND (get_geo_dist_km(l.latitude, l.longitude, " . $latCoordinate .", " . $longCoordinate . ") <= " . $radiusKm . "
            OR l.latitude <= 0 )
           AND NOT EXISTS (SELECT 1
                             FROM tasks t1
                            WHERE t1.checked_out_id = cu.id
                              AND t1.location_id = t.location_id
                              AND t1.campaign_id = t.campaign_id
                              AND t1.submitted = 0
                              AND t1.id != t.id)
                              ) a
  WHERE (a.one_per_location = 0
     OR NOT EXISTS (SELECT 1
                      FROM tasks t
                     WHERE t.checked_out_id = a.id
                       AND t.location_id = a.location_id
                       AND t.campaign_id = a.campaign_id
                       AND t.id != a.task_id
                       ))
 GROUP BY a.id
       ,a.campaign
       ,a.location_id
       ,distance_kms
ORDER BY     
       a.survey DESC
       ,distance_kms
       ,a.id
       ,a.campaign
LIMIT ".$start.", " . $limit;

        $taskResults = DB::SELECT(DB::raw($query));
        $tasks = [];

        foreach ($taskResults as $result){
            $task = Task::find($result->task_id);
            $task->distanceKms = $result->distance_kms;
            $task->load('location', 'campaign.questions.options');

            if($task->campaign->survey == 0){
              array_push($tasks, $task);
            }else{
              array_unshift($tasks, $task);
            }

        }

        return $tasks;

    }

    public function scopeIsAvailable($query){
        return $query->whereCheckedOut(0);
    }

    public function campaign()
    {
        return $this->hasOne('Wink\Campaign', 'id', 'campaign_id');
    }

    public function location()
    {
        return $this->hasOne('Wink\Location', 'id', 'location_id');
    }

    public function answers(){
        return $this->hasMany('Wink\QuestionAnswer', 'task_id', 'id');
    }

    public function user(){
        return $this->hasOne('Wink\User', 'id', 'checked_out_id');
    }

    public function alerts()
    {
        return $this->hasMany('Wink\Alert', 'task_id', 'id');
    }

}
