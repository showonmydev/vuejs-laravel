    <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEquipmentTable extends Migration
{

    public function up()
    {
        if (!Schema::hasTable('equipment')) {
            Schema::create('equipment', function (Blueprint $table) {
                $table->engine = 'InnoDB';

                $table->increments('id');
                $table->string('name', 50)->nullable();
                $table->string('mac', 1000);
                $table->string('model_name', 20)->collate('utf8_unicode_ci')->nullable();
                $table->string('gps', 50);
                $table->string('type', 50)->nullable()->comment('IFP,Signage');
                $table->integer('company_id')->unsigned();
                $table->integer('group_id')->unsigned()->nullable();
                $table->string('description', 250)->nullable();
                $table->integer('created_user')->unsigned()->nullable();
                $table->integer('updated_user')->unsigned()->nullable();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();
                $table->softDeletes();

                $table->foreign('company_id')->references('id')->on('company')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign('group_id')->references('id')->on('group')->onUpdate('CASCADE')->onDelete('SET NULL');
            });
        }
    }

    public function down()
    {
        if (Schema::hasTable('equipment')) {
            Schema::drop('equipment');
        }
    }

}
