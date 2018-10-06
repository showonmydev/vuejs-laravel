<?php

use Wink\Question;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class QuestionsTableSeeder extends Seeder
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
        DB::table('questions')->delete();

        Model::unguard();

        //factory(\Wink\Question::class, 50)->create();

        Model::reguard();
    }
}

