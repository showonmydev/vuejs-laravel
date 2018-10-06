<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//Create system_integrator_permission table

class CreateSystemIntegratorPermissionTable extends Migration
{

    public function up()
    {
        Schema::create('system_integrator_permission', function (Blueprint $table) {

            $table->engine = 'InnoDB';

            $table->integer('system_integrator_id')->unsigned();
            $table->string('permission_name');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));

            $table->foreign('system_integrator_id')->references('id')->on('system_integrator')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    public function down()
    {
        Schema::drop('system_integrator_permission');
    }
}
