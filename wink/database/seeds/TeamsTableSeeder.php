<?php

use Wink\Team;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class TeamsTableSeeder extends Seeder
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
        DB::table('teams')->delete();

        Model::unguard();

        Team::create([
            'company_id' => 1,
            'name'     => 'All Agents',
            'description'     => '',
        ]);

        Team::create([
            'company_id' => 2,
            'name'     => 'All Agents',
            'description'     => '',
        ]);

        Team::create([
            'company_id' => 3,
            'name'     => 'All Agents',
            'description'     => '',
        ]);

        Team::create([
            'company_id' => 4,
            'name'     => 'All Agents',
            'description'     => '',
        ]);

        Team::create([
            'company_id' => 5,
            'name'     => 'All Agents',
            'description'     => '',
        ]);

        Model::reguard();
    }
}
