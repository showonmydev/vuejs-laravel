<?php

use Wink\CampaignUser;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CampaignUserTableSeeder extends Seeder
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
        DB::table('campaign_users')->delete();

        Model::unguard();

        CampaignUser::create([
            'campaign_id' => 1,
            'user_id'     => 1,
        ]);

         CampaignUser::create([
            'campaign_id' => 1,
            'user_id'     => 2,
        ]);


        CampaignUser::create([
            'campaign_id' => 2,
            'user_id'     => 1,
        ]);

         CampaignUser::create([
            'campaign_id' => 2,
            'user_id'     => 2,
        ]);

        

        Model::reguard();
    }
}

