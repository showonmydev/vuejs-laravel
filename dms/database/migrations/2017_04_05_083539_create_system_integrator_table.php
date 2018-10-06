<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

//Create system_integrator table

class CreateSystemIntegratorTable extends Migration
{

    public function up()
    {
        if (!Schema::hasTable('system_integrator')) {
            Schema::create('system_integrator', function(Blueprint $table){

                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->integer('member_id')->unsigned()->comment('member_id of system integrator');
                $table->integer('company_id')->unsigned()->comment('the company_id assigned to this system integrator');
                $table->char('enable_flag',1)->default('Y')->comment('Y or N');
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();
                $table->softDeletes();

                $table->foreign('member_id')->references('id')->on('member')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign('company_id')->references('id')->on('company')->onUpdate('CASCADE')->onDelete('CASCADE');
            });
        }
    }


    public function down()
    {
        if (Schema::hasTable('system_integrator')) {
            Schema::drop('system_integrator');
        }
    }
}
