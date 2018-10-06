<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//Create member_token table

class CreateMemberTokenTable extends Migration
{

    public function up()
    {
        Schema::create('member_token', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('member_id')->unsigned();
            $table->string('access_token')->comment('IAM access token');
            $table->string('refresh_token')->nullable();
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->nullable();

            $table->foreign('member_id')->references('id')->on('member')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    public function down()
    {
        Schema::drop('member_token');
    }
}
