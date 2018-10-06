<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRewardsToCampaignTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         // Update the company record to include a company balance
        Schema::table('campaigns', function($table) {
            $table->integer('reward_value')->default(0);
        });

        Schema::table('tasks', function($table) {
            $table->integer('reward_paid')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('campaigns', function($table) {
            $table->dropColumn('reward_value');
        });

         Schema::table('tasks', function($table) {
            $table->dropColumn('reward_paid');
        });
    }
}
