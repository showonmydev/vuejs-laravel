<?php

use Illuminate\Database\Seeder;

class CompanyRoleUserTableSeeder extends Seeder
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
        DB::table('company_role_user')->delete();

        DB::table('company_role_user')->insert([
            'company_id' => 2,
            'role_id'    => 1,
            'user_id'    => 1
        ]);

         DB::table('company_role_user')->insert([
            'company_id' => 5,
            'role_id'    => 1,
            'user_id'    => 1
        ]);

        DB::table('company_role_user')->insert([
            'company_id' => 2,
            'role_id'    => 1,
            'user_id'    => 2
        ]);

        DB::table('company_role_user')->insert([
            'company_id' => 2,
            'role_id'    => 5,
            'user_id'    => 3
        ]);

        DB::table('company_role_user')->insert([
            'company_id' => 3,
            'role_id'    => 5,
            'user_id'    => 1
        ]);
    }
}
