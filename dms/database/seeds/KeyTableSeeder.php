<?php

use Illuminate\Database\Seeder;

class KeyTableSeeder extends Seeder
{

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('key')->delete();

        $key = array(
            array('name' => 'Smart DMS MDA Tool', 'key' => 'rlsJeZIsNGv7HZ7AOxBEv6e4GIz7E151', 'description' => 'key for mda tool'),
        );
        DB::table('key')->insert($key);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
