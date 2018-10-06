<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SoftwareTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('softwares')->delete();

        $softwares = array(
            array('id' => 1, 'app_name' => 'App1', 'description' => 'Description 1', 'version' => '1.1', 'file_name' => 'FB', 'size' => '512MB', 'isLatest' => 0),
            array('id' => 2, 'app_name' => 'App2', 'description' => 'Description 2', 'version' => '1.2', 'file_name' => 'Insta', 'size' => '128MB', 'isLatest' => 1),
            array('id' => 3, 'app_name' => 'App3', 'description' => 'Description 3', 'version' => '1.3', 'file_name' => 'Google', 'size' => '300MB', 'isLatest' => 1),
            array('id' => 4, 'app_name' => 'App4', 'description' => 'Description 4', 'version' => '1.4', 'file_name' => 'Google1', 'size' => '512MB', 'isLatest' => 1),
            array('id' => 5, 'app_name' => 'App5', 'description' => 'Description 5', 'version' => '1.5', 'file_name' => 'Google2', 'size' => '278MB', 'isLatest' => 0),
            array('id' => 6, 'app_name' => 'App6', 'description' => 'Description 6', 'version' => '1.6', 'file_name' => 'Google3', 'size' => '50MB', 'isLatest' => 1),
            array('id' => 7, 'app_name' => 'App7', 'description' => 'Description 7', 'version' => '1.7', 'file_name' => 'Google1', 'size' => '512MB', 'isLatest' => 1),
            array('id' => 8, 'app_name' => 'App8', 'description' => 'Description 8', 'version' => '1.8', 'file_name' => 'Google1', 'size' => '60MB', 'isLatest' => 1),
            array('id' => 9, 'app_name' => 'App9', 'description' => 'Description 9', 'version' => '1.9', 'file_name' => 'Google1', 'size' => '126MB', 'isLatest' => 1),
            array('id' => 10, 'app_name' => 'App10', 'description' => 'Description 10', 'version' => '1.10', 'file_name' => 'Google1', 'size' => '512MB', 'isLatest' => 1),
            array('id' => 11, 'app_name' => 'App1', 'description' => 'Description 1', 'version' => '1.2', 'file_name' => 'Google1', 'size' => '512MB', 'isLatest' => 1),
            array('id' => 12, 'app_name' => 'App5', 'description' => 'Description 5', 'version' => '1.6', 'file_name' => 'Google2', 'size' => '278MB', 'isLatest' => 1),
        );
        DB::table('softwares')->insert($softwares);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
