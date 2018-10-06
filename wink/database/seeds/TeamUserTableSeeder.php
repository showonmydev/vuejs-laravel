<?php

use Illuminate\Database\Seeder;

class TeamUserTableSeeder extends Seeder
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
        DB::table('team_user')->delete();

        DB::table('team_user')->insert([
            'team_id'    => 1,
            'user_id'    => 1
        ]);

        DB::table('team_user')->insert([
            'team_id'    => 1,
            'user_id'    => 2
        ]);
    }
}
