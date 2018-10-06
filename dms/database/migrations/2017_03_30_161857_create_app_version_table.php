<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppVersionTable extends Migration {

    public function up()
    {
        if (!Schema::hasTable('app_version')) {
            Schema::create('app_version', function(Blueprint $table){

                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->integer('app_id')->unsigned()->nullable();
                $table->integer('version_code')->default(0);
                $table->string('version_name', 10);
                $table->text('url')->nullable();
                $table->string('md5', 32);
                $table->integer('size');
                $table->enum('status', ['1', '2'])->comment('1 -> Active, 2 -> Deactive');
                $table->integer('created_user')->unsigned()->nullable();
                $table->integer('updated_user')->unsigned()->nullable();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();
                $table->softDeletes();

                $table->foreign('app_id')->references('id')->on('app')->onUpdate('CASCADE')->onDelete('SET NULL');
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('app_version')) {
            Schema::drop('app_version');
        }
    }

}
