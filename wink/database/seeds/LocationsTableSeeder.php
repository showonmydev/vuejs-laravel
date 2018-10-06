
<?php

use Wink\Location;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class LocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (App::environment() === 'production') {
            exit('Chill Winston. its no good in production');
        }
        DB::table('locations')->delete();

        Model::unguard();

                $faker = Faker::create();


        foreach (range(1, 30) as $v) {


            if($v < 6){

                Location::create([
                    'company_id'        => $v,
                    'name'              => 'Unknown',
                    'address'           => 'Unknown',
                    'city'           => 'Unknown',
                    'province'           => 'Unknown',
                    'country'           => 'Unknown',
                    'latitude'          => '0',
                    'longitude'         =>  '0'
                    ]);
            }else{

                \Wink\Location::create([
                    'name'       => $faker->city,
                    'company_id' => $faker->numberBetween(1,5),
                    'address'    => $faker->streetAddress,
                    'province'   => $faker->state,
                    'city'       => $faker->city,
                    'latitude'   => $faker->randomFloat($nbMaxDecimals = 4, $min = -34.10, $max = -33.738),
                    'longitude'  => $faker->randomFloat($nbMaxDecimals = 4, $min = 18.4, $max = 18.9)
                    ]);
            }
        }

        Model::reguard();
    }
}