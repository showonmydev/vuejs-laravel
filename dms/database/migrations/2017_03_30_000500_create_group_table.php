<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

//Create group table

class CreateGroupTable extends Migration
{

    public function up()
    {
        if (!Schema::hasTable('group')) {
            Schema::create('group', function(Blueprint $table){

                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->string('name', 50);
                $table->integer('company_id')->unsigned();
                $table->integer('parent_id')->unsigned()->nullable();
                $table->integer('lft')->unsigned();
                $table->integer('rgt')->unsigned();
                $table->integer('depth')->unsigned();
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
        if (Schema::hasTable('group')) {
            Schema::drop('group');
        }
    }
}
