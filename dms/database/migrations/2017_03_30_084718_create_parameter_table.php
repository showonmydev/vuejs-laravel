<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParameterTable extends Migration {

	public function up()
	{
		if (!Schema::hasTable('parameter')) {
			Schema::create('parameter', function(Blueprint $table){
				$table->engine = 'InnoDB';

				$table->increments('id');
				$table->string('name', 50);
				$table->string('value', 150);
				$table->integer('parameter_type_id')->unsigned();
				$table->string('description', 250);
				$table->integer('created_user');
				$table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
				$table->timestamp('updated_at')->nullable();
				
				$table->foreign('parameter_type_id')->references('id')->on('parameter_type')->onUpdate('CASCADE')->onDelete('CASCADE');
			});
		}
	}

	public function down()
	{
		if (Schema::hasTable('parameter')) {
			Schema::drop('parameter');
		}
	}

}
