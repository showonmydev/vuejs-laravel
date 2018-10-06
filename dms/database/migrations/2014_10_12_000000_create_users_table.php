<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('name'); // Store User Name
            $table->string('email'); // Store User Email
            $table->string('password'); // Store User Password in bcript Encription
            $table->text('benQToken')->nullable(); // Store BenQ Active Token
            $table->string('company_id'); // Store User Company_Id
            $table->string('account_name'); // Store Account Name
            $table->text('remember_token1')->nullable(); // This is For Laravel Default Auth Token
            $table->integer('role')->comment('1 is Super, 2 is user'); // Store User Role
            $table->integer('member_id'); // Store User member Id which is stored in Member Table
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
