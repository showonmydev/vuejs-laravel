<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppTable extends Migration {

    public function up()
    {
        if (!Schema::hasTable('app')) {
            Schema::create('app', function(Blueprint $table){

                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->char('status', 1)->nullable()->default('Y');
                $table->string('name', 255)->nullable();
                $table->string('package_name', 255)->nullable();
                $table->string('description', 500);
                $table->integer('company_id')->unsigned()->nullable();
                $table->integer('created_user')->unsigned()->nullable();
                $table->integer('updated_user')->unsigned()->nullable();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();
                $table->softDeletes();

                $table->foreign('company_id')->references('id')->on('company')->onUpdate('CASCADE')->onDelete('CASCADE');
            });
        }
    }


    public function down()
    {
        if (Schema::hasTable('app')) {
            Schema::drop('app');
        }
    }

}
