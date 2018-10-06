<?php

namespace Wink;

use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CampaignWave extends Model
{
    use SoftDeletes;

    protected $table = 'campaign_waves';
    protected $fillable = ['company_id', 'campaign_id', 'wave_id', 'created', 'start_date', 'end_date'];
    protected $dates = ['start_date', 'end_date', 'deleted_at'];

    public function campaign()
    {
        return $this->hasOne('Wink\Campaign', 'id', 'campaign_id');
    }

    public function launch()
    {

        $campaign = Campaign::whereId($this->campaign_id)->firstOrFail();

        if($campaign->survey != 1) {
            // Get the campaigns locations
            $locations = $campaign->locations;

            // For each location
            $locations->each(function ($location, $key) use ($campaign) {

                // For each number of $campaign->per_location create the tasks
                for ($i = 0; $i < $campaign->per_location; $i++) {
                    Task::create([
                        'company_id'  => $campaign->company_id,
                        'campaign_id' => $campaign->id,
                        'location_id' => $location->id,
                        'wave_id'     => $this->id,
                        'end_date'    => $this->end_date,
                        'hash'        =>  hash('ripemd160', $campaign->id.$campaign->company_id.$location->id.$this->id.rand(1000000, 9999999))
                    ]);
                }
            });
        }else{
            $location = Location::whereCompanyId(session('using_company'))->where('latitude', 0)->firstOrFail();
            for ($i = 0; $i < $campaign->per_location; $i++) {
                Task::create([
                    'company_id'  => $campaign->company_id,
                    'campaign_id' => $campaign->id,
                    'location_id' => $location->id,
                    'wave_id'     => $this->id,
                    'end_date'    => $this->end_date,
                    'hash'        =>  hash('ripemd160', $campaign->id.$campaign->company_id.$location->id.$this->id.rand(1000000, 9999999))
                ]);
            }

        }

      //  $this->sendPushNotifications();

        return true;
    }

    public function sendPushNotifications()
    {

        // Find all the users in all the teams and all their devices
        // return as an array of devices.

        $query = "select d.device_token
  from devices d
       inner join (SELECT u.id
                     FROM campaign_users cu
                          INNER JOIN campaigns c ON c.id = cu.campaign_id
                          INNER JOIN users u ON u.id = cu.user_id
                    WHERE c.id = " . $this->campaign_id . "
                   UNION
                   SELECT u.id
                     FROM campaign_teams ct
                          INNER JOIN campaigns c ON c.id = ct.campaign_id
                          INNER JOIN teams t ON t.id = ct.team_id
                          INNER JOIN team_user tu ON tu.team_id = t.id
                          INNER JOIN users u ON u.id = tu.user_id
                    WHERE c.id = " . $this->campaign_id . ") u on u.id = d.user_id";

        $queryReturn = DB::SELECT(DB::raw($query));
        $token_array = [];
        foreach ($queryReturn as $token) {
            array_push($token_array, $token->device_token);
        }

        // Update this to be dynamic based on the type of data coming in
        $data = [
            'tokens'       => $token_array,
            'profile'      => 'android_push',
            'notification' => [
                'title'   => 'New tasks',
                'message' => 'You have been assigned new tasks',
                'ios'     => [
                    'sound'            => 'ping.aiff',
                    'priority'         => 10,
                    'contentAvailable' => true
                ],
                'android' => [
                    'collapse_key'     => 'foo',
                    'delay_while_idle' => true,
                    'time_to_live'     => 300,
                    'icon_color'       => '#28a8d3',
                ]
            ]
        ];

        $client = new \GuzzleHttp\Client();

        $client->request('POST', 'https://api.ionic.io/push/notifications', [
            'headers' => [
                'Authorization' => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmNGZhZGVlYi0wOGJiLTQyZTMtODM2Yy0xOGNmYmRlMTA5YzQifQ.E6IWLGw6qYoEZRv6BiKrtn4VgHn8yJdMEB3lahoB8tI',
                'Content-Type'  => 'application/json'
            ],
            'json'    => $data
        ]);

        return true;
    }
}
