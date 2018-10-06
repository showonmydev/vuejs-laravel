<?php

use Wink\QuestionType;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class QuestionTypesTableSeeder extends Seeder
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
        DB::table('question_types')->delete();

        Model::unguard();

        QuestionType::create([
            'type'        => 'text',
            'answer_type' => 'string'
        ]);
        QuestionType::create([
            'type'        => 'dropdown',
            'answer_type' => 'string'
        ]);
        QuestionType::create([
            'type'        => 'select',
            'answer_type' => 'string'
        ]);
        QuestionType::create([
            'type'        => 'multi_select',
            'answer_type' => 'string'
        ]);
        QuestionType::create([
            'type'        => 'date',
            'answer_type' => 'date'
        ]);
        QuestionType::create([
            'type'        => 'image',
            'answer_type' => 'image'
        ]);
        QuestionType::create([
            'type'        => 'boolean',
            'answer_type' => 'string'
        ]);
        QuestionType::create([
            'type'        => 'rating',
            'answer_type' => 'integer'
        ]);
        QuestionType::create([
            'type'        => 'barcode',
            'answer_type' => 'string'
        ]);
        QuestionType::create([
            'type'        => 'gps',
            'answer_type' => 'string'
        ]);
          QuestionType::create([
            'type'        => 'number',
            'answer_type' => 'integer'
        ]);
            QuestionType::create([
            'type'        => 'calculation',
            'answer_type' => 'integer'
        ]);

        Model::reguard();
    }
}

