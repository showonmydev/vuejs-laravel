<?php

use Wink\CampaignLocation;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CampaignLocationTableSeeder extends Seeder
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
        DB::table('campaign_locations')->delete();

        Model::unguard();

        factory(\Wink\CampaignLocation::class, 10)->create();

        Model::reguard();
    }
}

