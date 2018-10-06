<?php

use Wink\Board;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class BoardsTableSeeder extends Seeder
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
        DB::table('boards')->delete();

        Model::unguard();

        $faker = Faker::create();

        foreach (range(1, 5) as $index) {

            Board::create([
                'name'       => 'General',
                'company_id' =>  $index 
            ]);

        }
        Model::reguard();
    }
}

