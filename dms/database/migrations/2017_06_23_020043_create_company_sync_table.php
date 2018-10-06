<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//Create company_sync table

class CreateCompanySyncTable extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('company_sync')) {
            Schema::create('company_sync', function (Blueprint $table) {

                $table->engine = 'InnoDB';

                $table->integer('mct_company_id')->unsigned()->primary();
                $table->integer('mct_company_change_id')->unsigned()->default(0);
                $table->timestamp('mct_company_info_updated_at')->nullable();

                $table->foreign('mct_company_id')->references('mct_company_id')->on('company')->onUpdate('CASCADE')->onDelete('CASCADE');
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('company_sync')) {
            Schema::drop('company_sync');
        }
    }
}
