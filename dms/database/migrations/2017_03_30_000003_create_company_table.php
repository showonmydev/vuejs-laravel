<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCompanyTable extends Migration
{

    public function up()
    {
        if (!Schema::hasTable('company')) {
            Schema::create('company', function (Blueprint $table) {
                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->string('name', 50);
                $table->integer('nation_region_id')->unsigned()->nullable();
                $table->char('enable_flag', 1)->default('Y')->comment('Y or N');
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();
                $table->integer('mct_company_id')->unsigned()->unique();

                $table->foreign('nation_region_id')->references('id')->on('nation_region')->onUpdate('CASCADE')->onDelete('SET NULL');
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('company')) {
            Schema::drop('company');
        }
    }

}
