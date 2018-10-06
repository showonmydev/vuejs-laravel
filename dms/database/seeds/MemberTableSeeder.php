<?php

use Illuminate\Database\Seeder;

class MemberTableSeeder extends Seeder
{

    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('member')->delete();

        $member = array(
            array(
                'id' => 1,
                'name' => 'Superadmin',
                'account' => 'superadmin',
                'role' => 'SuperAdmin',
                'email' => 'Darren.CT.Fan@BenQ.com',
                'timezone' => 'Asia/Taipei',
                'company_id' => 1,
                'mct_member_id' => 1,
            ),
            array(
                'id' => 2,
                'name' => 'BQARO',
                'account' => 'bqaro',
                'role' => 'RO',
                'email' => 'BQARO@BenQ.com',
                'timezone' => 'Asia/Taipei',
                'company_id' => 1,
                'mct_member_id' => 2,
            ),
            array(
                'id' => 3,
                'name' => 'BQCRO',
                'account' => 'bqcro',
                'role' => 'RO',
                'email' => 'BQCRO@BenQ.com',
                'timezone' => 'Asia/Taipei',
                'company_id' => 1,
                'mct_member_id' => 3,
            ),
            array(
                'id' => 4,
                'name' => 'BQERO',
                'account' => 'bqero',
                'role' => 'RO',
                'email' => 'BQERO@BenQ.com',
                'timezone' => 'Asia/Taipei',
                'company_id' => 1,
                'mct_member_id' => 4,
            ),
            array(
                'id' => 5,
                'name' => 'BQLRO',
                'account' => 'bqlro',
                'role' => 'RO',
                'email' => 'BQLRO@BenQ.com',
                'timezone' => 'Asia/Taipei',
                'company_id' => 1,
                'mct_member_id' => 5,
            ),
            array(
                'id' => 6,
                'name' => 'BQPRO',
                'account' => 'bqpro',
                'role' => 'RO',
                'email' => 'BQPRO@BenQ.com',
                'timezone' => 'Asia/Taipei',
                'company_id' => 1,
                'mct_member_id' => 6,
            ),
            array(
                'id' => 7,
                'name' => 'BQTWRO',
                'account' => 'bqtwro',
                'role' => 'RO',
                'email' => 'BQTWRO@BenQ.com',
                'timezone' => 'Asia/Taipei',
                'company_id' => 1,
                'mct_member_id' => 7,
            ),
            array(
                'id' => 1001,
                'name' => 'Admin',
                'account' => 'admin',
                'role' => 'Administrator',
                'email' => 'Admin@BenQ.com',
                'timezone' => 'Asia/Taipei',
                'company_id' => 1001,
                'mct_member_id' => 1001,
            ),
        );
        DB::table('member')->insert($member);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
