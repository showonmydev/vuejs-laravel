<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateParameterTypeTable extends Migration
{

    public function up()
    {
        if (!Schema::hasTable('parameter_type')) {
            Schema::create('parameter_type', function (Blueprint $table) {
                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->string('name', 50);
                $table->string('description', 250);
                $table->integer('created_user');
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('parameter_type')) {
            Schema::drop('parameter_type');
        }
    }

}
