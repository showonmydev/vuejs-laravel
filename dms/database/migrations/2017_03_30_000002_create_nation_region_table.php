<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNationRegionTable extends Migration {


    public function up()
    {
        if (!Schema::hasTable('nation_region')) {
            Schema::create('nation_region', function(Blueprint $table){

                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->string('name', 50);
                $table->char('code', 2);
                $table->integer('region_id')->unsigned()->nullable();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();

                $table->foreign('region_id')->references('id')->on('region')->onUpdate('CASCADE')->onDelete('SET NULL');
            });
        }
    }


    public function down()
    {
        if (Schema::hasTable('nation_region')) {
            Schema::drop('nation_region');
        }
    }

}
