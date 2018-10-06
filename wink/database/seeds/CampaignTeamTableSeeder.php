<?php

use Wink\CampaignTeam;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CampaignTeamTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (App::environment() === 'production') {
            exit('Chill Winston. its no good in production');
        }
        DB::table('campaign_teams')->delete();

        Model::unguard();

        CampaignTeam::create([
            'campaign_id' => 1,
            'team_id'     => 1,
        ]);

        CampaignTeam::create([
            'campaign_id' => 2,
            'team_id'     => 2,
        ]);


        Model::reguard();
    }
}

