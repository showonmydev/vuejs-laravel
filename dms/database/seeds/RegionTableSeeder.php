<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class RegionTableSeeder extends Seeder
{

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $countries = array(
            array('id' => 1, 'name' => 'BQA'),
            array('id' => 2, 'name' => 'BQC'),
            array('id' => 3, 'name' => 'BQE'),
            array('id' => 4, 'name' => 'BQL'),
            array('id' => 5, 'name' => 'BQP'),
            array('id' => 6, 'name' => 'BQT'));
        DB::table('region')->insert($countries);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
