<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//Create member_sync table

class CreateMemberSyncTable extends Migration
{

    public function up()
    {
        if (!Schema::hasTable('member_sync')) {
            Schema::create('member_sync', function (Blueprint $table) {

                $table->engine = 'InnoDB';

            $table->integer('mct_member_id')->unsigned()->primary();
            $table->integer('mct_member_change_id')->unsigned()->default(0);
            $table->integer('mct_si_change_id')->unsigned()->default(0);
            $table->timestamp('mct_member_info_updated_at')->nullable();
            $table->timestamp('mct_permission_updated_at')->nullable();

            $table->foreign('mct_member_id')->references('mct_member_id')->on('member')->onUpdate('CASCADE')->onDelete('CASCADE');
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('member_sync')) {
            Schema::drop('member_sync');
        }
    }
}
