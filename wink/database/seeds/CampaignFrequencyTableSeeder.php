<?php

use Wink\CampaignFrequency;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class CampaignFrequencyTableSeeder extends Seeder
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
        DB::table('campaign_frequency')->delete();

        Model::unguard();

        CampaignFrequency::create([
            'name' => 'Once off'
        ]);
        CampaignFrequency::create([
            'name' => 'Weekly'
        ]);
        CampaignFrequency::create([
            'name' => 'Monthly'
        ]);

        Model::reguard();
    }
}

