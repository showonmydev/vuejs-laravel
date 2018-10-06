<?php

use Wink\Role;
use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
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
        DB::table('roles')->delete();

        Role::create([
            'id'            => 1,
            'name'          => 'Root',
            'description'   => 'Use this account with extreme caution. When using this account it is possible to cause irreversible damage to the system.'
        ]);
        Role::create([
            'id'            => 2,
            'name'          => 'Administrator',
            'description'   => 'Full access to create, edit, and update users, brands, stores and campaigns as well as view all reports.'
        ]);
        Role::create([
            'id'            => 3,
            'name'          => 'Brand Manager',
            'description'   => 'Ability to add store managers and create campaigns and stores as well as view reports for their brand.'
        ]);
        Role::create([
            'id'            => 4,
            'name'          => 'Store Manager',
            'description'   => 'Responsible for a particular set of stores as well as view reports for thier store.'
        ]);
        Role::create([
            'id'            => 5,
            'name'          => 'Submitter',
            'description'   => 'A standard user that can complete campaign questions.'
        ]);
    }
}
