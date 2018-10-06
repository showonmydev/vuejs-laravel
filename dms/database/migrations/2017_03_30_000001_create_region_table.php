<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRegionTable extends Migration {

    public function up()
    {
        if (!Schema::hasTable('region')) {
            Schema::create('region', function(Blueprint $table){
                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->char('name', 3);
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('region')) {
            Schema::drop('region');
        }
    }

}
