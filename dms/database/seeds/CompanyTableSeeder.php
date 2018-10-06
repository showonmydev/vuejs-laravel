<?php

use Illuminate\Database\Seeder;

class CompanyTableSeeder extends Seeder
{

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('company')->delete();

        $company = array(
            array('id' => 1, 'name' => 'BenQ', 'nation_region_id' => 218, 'mct_company_id' => 1),
            array('id' => 2, 'name' => 'RETAIL', 'nation_region_id' => 218, 'mct_company_id' => 2),
            array('id' => 1001, 'name' => 'Admin', 'nation_region_id' => 218, 'mct_company_id' => 1001));
        DB::table('company')->insert($company);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
