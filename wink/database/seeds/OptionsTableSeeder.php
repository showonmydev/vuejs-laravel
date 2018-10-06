<?php

use Wink\Questions;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class OptionsTableSeeder extends Seeder
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
        DB::table('question_options')->delete();

        Model::unguard();

        //factory(\Wink\QuestionOption::class, 150)->create();

        Model::reguard();
    }
}

