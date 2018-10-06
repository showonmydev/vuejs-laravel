<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMemberTable extends Migration
{

    public function up()
    {
        if (!Schema::hasTable('member')) {
            Schema::create('member', function (Blueprint $table) {

                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->string('name', 50);
                $table->string('account', 100);
                $table->string('role', 50)->default('User');
                $table->string('email', 100);
                $table->string('timezone', 20)->nullable();
                $table->string('comment', 200)->nullable();
                $table->char('enable_flag', 1)->default('Y')->comment('Y or N');
                $table->integer('company_id')->unsigned();
                $table->integer('created_user')->unsigned()->nullable();
                $table->integer('updated_user')->unsigned()->nullable();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();
                $table->rememberToken();
                $table->softDeletes();
                $table->integer('mct_member_id')->unsigned()->unique();

                //$table->foreign('company_id')->references('id')->on('company')->onUpdate('CASCADE')->onDelete('CASCADE');
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('member')) {
            Schema::drop('member');
        }
    }

}
