<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {

        Model::unguard();

        $this->call(RegionTableSeeder::class);
        $this->call(NationRegionTableSeeder::class);
        $this->call(CompanyTableSeeder::class);
        $this->call(MemberTableSeeder::class);
        $this->call(RegionManagerTableSeeder::class);
        $this->call(group::class);
        $this->call(DeviceDataTableSeeder::class);
		// $this->call(SoftwareTableSeeder::class);
        Model::reguard();
    }
}
