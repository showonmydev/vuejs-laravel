<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserLogs extends Migration
{
    /**
     * Run the migrations.
     * This table is created for maintain log for every user like which task is perform.
     * @return void
     */
    public function up()
    {
        Schema::create('user_logs', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('user_id')->unsigned(); // Forign Key from User table.
            $table->integer('type'); // Type of log
            $table->string('operation'); // Task name which is user perform.
            $table->string('status'); // Status like Task is success or fail
            $table->rememberToken();
			$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_logs');
    }
}
