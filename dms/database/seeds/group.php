<?php

use Illuminate\Database\Seeder;

class group extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('group')->delete();
        $group = array(
            array('id' => 1, 'name' => 'Default', 'company_id' => 2, 'parent_id' => 0, 'lft' => 0, 'rgt'=> 0, 'depth'=>1, 'created_user'=>1, 'updated_user'=>1)
        );
        DB::table('group')->insert($group);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
