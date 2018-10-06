<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

//新建es_device_data table, 存放palyer藉由sendDeviceInfo API傳送給Server的設備資料

class CreateDeviceDataTable extends Migration {

    public function up()
    {
        if (!Schema::hasTable('device_data')) {
            Schema::create('device_data', function (Blueprint $table) {
                $table->engine = 'InnoDB';
                $table->increments('id'); // PK
                $table->string('bdid')->length(50)->collate('utf8_unicode_ci')->nullable();
                $table->string('mac_address')->length(1000)->collate('utf8_unicode_ci')->nullable();
                $table->string('model')->length(20)->collate('utf8_unicode_ci')->nullable();
				$table->string('name')->length(20)->collate('utf8_unicode_ci')->nullable();
				$table->string('description')->length(20)->collate('utf8_unicode_ci')->nullable();
                $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
                $table->timestamp('updated_at')->nullable();
            });
        }
    }


    public function down()
    {
        if (Schema::hasTable('device_data')) {
            Schema::drop('device_data');
        }
    }
}
