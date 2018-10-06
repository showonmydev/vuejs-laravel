<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//Create key table

class CreateKeyTable extends Migration
{

    public function up()
    {
        Schema::create('key', function (Blueprint $table) {

            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('name');
            $table->string('key');
            $table->string('description');
            $table->boolean('revoked')->default(0)->comment('`0`:non-revoked  `1`:revoked <br> default `0`');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->nullable();

        });
    }

    public function down()
    {
        Schema::drop('key');
    }
}
