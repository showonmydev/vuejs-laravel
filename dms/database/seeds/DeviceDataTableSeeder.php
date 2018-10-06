<?php

use Illuminate\Database\Seeder;

class DeviceDataTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('device_data')->delete();
        $group = array(
            array('id' => 1, 'bdid' => 'MDA6MTQ6MjI6MDE6MjM6NDU=', 'mac_address' => '127.0.0.1', 'model' => 'TEST1', 'name' => 'TEST1', 'description'=> 'TEST')
        );
        DB::table('device_data')->insert($group);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
