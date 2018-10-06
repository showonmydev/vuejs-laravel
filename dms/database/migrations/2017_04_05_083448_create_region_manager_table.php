<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//Create region_manager table

class CreateRegionManagerTable extends Migration
{

    public function up()
    {
        if (!Schema::hasTable('region_manager')) {
            Schema::create('region_manager', function (Blueprint $table) {

                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->integer('region_id')->unsigned();
                $table->integer('mct_member_id')->unsigned()->comment('RO of this region');
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();

                $table->foreign('region_id')->references('id')->on('region')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign('mct_member_id')->references('mct_member_id')->on('member')->onUpdate('CASCADE')->onDelete('CASCADE');
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('region_manager')) {
            Schema::drop('region_manager');
        }
    }
}
