<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBoardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('boards', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->string('name');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('boards', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
        });

        Schema::create('board_users', function(Blueprint $table)
        {
            $table->integer('board_id')->unsigned();
            $table->integer('user_id')->unsigned();
        });

        DB::statement("ALTER TABLE tags MODIFY COLUMN type ENUM('location','board')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
       Schema::drop('boards');
       Schema::drop('board_users');
   }
}
