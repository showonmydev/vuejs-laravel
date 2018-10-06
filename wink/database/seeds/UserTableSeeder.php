<?php

use Wink\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
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
        DB::table('users')->delete();

        User::create([
            'id'                 => 1,
            'first_name'         => 'Phil',
            'last_name'          => 'Benoit',
            'email'              => 'phil@kiwidc.com',
            'password'           => Hash::make('CapeTown2*14'),
            'initial_company_id' => 2
        ]);

        User::create([
            'id'                 => 2,
            'first_name'         => 'Mike',
            'last_name'          => 'Metelerkamp',
            'email'              => 'mike.metelerkamp@gmail.com',
            'password'           => Hash::make('Wink!234'),
            'initial_company_id' => 2
        ]);

        User::create([
            'id'                 => 3,
            'first_name'         => 'Test',
            'last_name'          => 'Submitter',
            'email'              => 'submitter@email.com',
            'password'           => Hash::make('submitter'),
            'initial_company_id' => 2
        ]);

        User::create([
            'id'                 => 4,
            'first_name'         => 'Aidan',
            'last_name'          => 'Classe',
            'email'              => 'aidan@citylogic.co.za',
            'password'           => Hash::make('Wink!Pass'),
            'initial_company_id' => 2
        ]);

    }
}
