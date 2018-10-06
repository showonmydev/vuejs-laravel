<?php

use Illuminate\Database\Seeder;
use Wink\Company;

class CompaniesTableSeeder extends Seeder
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
        DB::table('companies')->delete();

        Company::create([
            'id'        => 1,
            'name'      => 'WinkHq',
            'subdomain' => 'app',
            'company_hash' => md5('WinkHq' . 'app')

        ]);

        Company::create([
            'id'        => 2,
            'name'      => 'Demo',
            'subdomain' => 'demo',
            'rewards'   => 1,
            'balance'   => 10000,
            'company_hash' => md5('Demo' . 'demo')
        ]);

        Company::create([
            'id'        => 3,
            'name'      => 'Barrows Global',
            'subdomain' => 'barrows',
            'company_hash' => md5('Barrows Global' . 'barrows')
        ]);

        Company::create([
            'id'        => 4,
            'name'      => 'KFC',
            'subdomain' => 'kfc',
            'company_hash' => md5('KFC' . 'kfc')
        ]);


        Company::create([
            'id'        => 5,
            'name'      => 'Rewards Test',
            'subdomain' => 'rewards',
            'rewards'   => 1,
            'balance'   => 0,
            'company_hash' => md5('Rewards Test' . 'rewards')
        ]);
    }
}
