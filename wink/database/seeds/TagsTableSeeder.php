<?php

use Wink\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class TagsTableSeeder extends Seeder
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
        DB::table('tags')->delete();

        Model::unguard();

        factory(\Wink\Tag::class, 10)->create();

        Model::reguard();
    }
}
