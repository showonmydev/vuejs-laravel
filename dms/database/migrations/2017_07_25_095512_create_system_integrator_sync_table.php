<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//create system_integrator_sync table

class CreateSystemIntegratorSyncTable extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('system_integrator_sync')) {
            Schema::create('system_integrator_sync', function (Blueprint $table) {

                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->integer('system_integrator_id')->unsigned();
                $table->timestamp('mct_info_updated_at')->nullable();
                $table->timestamp('mct_permission_updated_at')->nullable();

                $table->foreign('system_integrator_id')->references('id')->on('system_integrator')->onUpdate('CASCADE')->onDelete('CASCADE');
            });
        }
    }
    public function down()
    {
        if (Schema::hasTable('system_integrator_sync')) {
            Schema::drop('system_integrator_sync');
        }
    }
}
