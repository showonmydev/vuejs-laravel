<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeviceMeta extends Migration
{
    /**
     * Run the migrations.
     * This table is created for store meta date of any equipment like Power, Mac, HDMI, Vol etc.
     * @return void
     */
    public function up()
    {
        Schema::create('device_meta', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id'); 
            $table->integer('bdid')->unsigned(); // Here is Equipment table Device ID
            $table->string('parameter_key'); // This is used for meta field of Device like Vol.,Power, HDMI Etc.
            $table->string('parameter_value'); // This is used for meta value of Device like Vol. = 1,Power = 2, HDMI = 5 Etc.
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
        Schema::drop('device_meta');
    }
}
