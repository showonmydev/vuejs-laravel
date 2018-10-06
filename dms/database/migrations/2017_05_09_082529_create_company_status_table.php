<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

//Create company_status table

class CreateCompanyStatusTable extends Migration
{

    public function up()
    {
        if (!Schema::hasTable('company_status')) {
            Schema::create('company_status', function(Blueprint $table)
            {
                $table->engine = 'InnoDB';

                $table->integer('company_id')->unsigned();
                $table->integer('total_space')->unsigned();
                $table->integer('used_space')->unsigned();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();

                $table->foreign('company_id')->references('id')->on('company')->onUpdate('CASCADE')->onDelete('CASCADE');
            });
        }
    }


    public function down()
    {

        if (Schema::hasTable('company_status')) {
            Schema::drop('company_status');
        }
    }
}
