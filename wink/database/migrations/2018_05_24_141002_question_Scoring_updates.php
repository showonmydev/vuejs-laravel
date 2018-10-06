<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class QuestionScoringUpdates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
      public function up()
    {
        Schema::table('question_options', function($table) {
            $table->integer('score')->nullable()->default(0);
        });

        Schema::table('campaigns', function($table) {
            $table->integer('max_questionnaire_score')->nullable()->default(0);
            $table->integer('benchmark_score')->nullable()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('question_options', function($table) {
              $table->drop('score');
        });

        Schema::table('campaigns', function($table) {
              $table->drop('max_questionnaire_score');
               $table->drop('benchmark_score');
              
        });
    }
}
