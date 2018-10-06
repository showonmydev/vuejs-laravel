<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AppMapWithDevice extends Migration
{
    /**
     * Run the migrations.
     * This table created for map application to device
     * @return void
     */
    public function up()
    {
        Schema::create('application_map_device', function (Blueprint $table) {
            $table->engine = 'InnoDB';
                $table->increments('id');
                $table->integer('deviceId')->unsigned(); // deviceId is forign key for equipment tabel
                $table->string('bdid'); // here is device BDID
                $table->integer('appId')->unsigned(); // appId is forign key for app table
                $table->timestamp('date_modified')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('date_uploaded')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->foreign('appId')->references('id')->on('app')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign('deviceId')->references('id')->on('equipment')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('application_map_device')) {
            Schema::drop('application_map_device');
        }
    }
}
