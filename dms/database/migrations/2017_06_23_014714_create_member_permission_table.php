<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberPermissionTable extends Migration
{

    public function up()
    {
        Schema::create('member_permission', function (Blueprint $table) {

            $table->engine = 'InnoDB';

            $table->integer('member_id')->unsigned();
            $table->string('permission_name');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));

            //Set unique on two columns
            $table->unique(array('member_id', 'permission_name'));

            $table->foreign('member_id')->references('id')->on('member')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    public function down()
    {
        Schema::drop('member_permission');
    }
}
