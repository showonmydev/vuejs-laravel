<?php

use Illuminate\Database\Seeder;

//RegionManagerTableSeeder.php

class RegionManagerTableSeeder extends Seeder
{

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $region_manager = array(
            array(
                'id' => 1,
                'region_id' => 1,
                'mct_member_id' => 2,
            ),
            array(
                'id' => 2,
                'region_id' => 2,
                'mct_member_id' => 3,
            ),
            array(
                'id' => 3,
                'region_id' => 3,
                'mct_member_id' => 4,
            ),
            array(
                'id' => 4,
                'region_id' => 4,
                'mct_member_id' => 5,
            ),
            array(
                'id' => 5,
                'region_id' => 5,
                'mct_member_id' => 6,
            ),
            array(
                'id' => 6,
                'region_id' => 6,
                'mct_member_id' => 7,
            ),
        );
        DB::table('region_manager')->insert($region_manager);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
