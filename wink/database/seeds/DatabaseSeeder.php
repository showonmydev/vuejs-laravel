<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        $this->call(RoleTableSeeder::class);
        $this->call(CompaniesTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(CompanyRoleUserTableSeeder::class);
        $this->call(BoardsTableSeeder::class);
        $this->call(LocationsTableSeeder::class);
        $this->call(TeamsTableSeeder::class);
        $this->call(TeamUserTableSeeder::class);
        $this->call(QuestionTypesTableSeeder::class);
        $this->call(CampaignsTableSeeder::class);
        $this->call(CampaignsTableSeeder2::class);
        $this->call(CampaignFrequencyTableSeeder::class);
        $this->call(TagsTableSeeder::class);
        $this->call(CampaignUserTableSeeder::class);
        $this->call(CampaignTeamTableSeeder::class);

        // Add the Stored proc we need 
        DB::unprepared('DROP FUNCTION IF EXISTS get_geo_dist_km; 
        CREATE FUNCTION `get_geo_dist_km`(lat1 FLOAT, lon1 FLOAT, lat2 FLOAT, lon2 FLOAT) RETURNS decimal(9,6)
        BEGIN
          DECLARE pi, q1, q2, q3 FLOAT;
          DECLARE rads FLOAT DEFAULT 0;
          SET pi = PI();
          SET lat1 = lat1 * pi / 180;
          SET lon1 = lon1 * pi / 180;
          SET lat2 = lat2 * pi / 180;
          SET lon2 = lon2 * pi / 180;
          SET q1 = COS(lon1-lon2);
          SET q2 = COS(lat1-lat2);
          SET q3 = COS(lat1+lat2);
          SET rads = ACOS( 0.5*((1.0+q1)*q2 - (1.0-q1)*q3) ); 
          RETURN convert(6378.388 * rads, decimal(9,6));
        END;');

        Model::reguard();
    }
}
