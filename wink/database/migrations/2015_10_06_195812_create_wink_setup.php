<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWinkSetup extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('registered', function (Blueprint $table) {
            $table->increments('id');
            $table->string('company_name');
            $table->string('company_subdomain');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('password');
            $table->text('registration_link');
            $table->timestamps();
        });

        Schema::create('companies', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('subdomain');
            $table->string('primary_color')->nullable();
            $table->string('header_text_color')->nullable();
            $table->timestamps();
        });

        Schema::create('invited', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email');
            $table->text('invitation_link');
            $table->integer('team_invited')->nullable();
            $table->boolean('complete')->default(0);
            $table->timestamps();
        });

        Schema::table('invited', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 40);
            $table->string('description', 255);
            $table->timestamps();
        });

        Schema::create('company_role_user', function(Blueprint $table)
        {
            $table->integer('company_id')->unsigned();
            $table->integer('role_id')->unsigned();
            $table->integer('user_id')->unsigned();
        });

        Schema::table('company_role_user', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('role_id')->references('id')->on('roles');
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::create('brands', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->string('name');
            $table->integer('manager_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('brands', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('manager_id')->references('id')->on('users');
        });

        Schema::create('locations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->string('name');
            $table->string('address');
            $table->string('street_number')->nullable();
            $table->string('street')->nullable();
            $table->string('suburb')->nullable();
            $table->string('city')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('province')->nullable();
            $table->string('country')->nullable();
            $table->string('latitude');
            $table->string('longitude');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('locations', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
        });

        Schema::create('teams', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->string('name');
            $table->string('description');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('teams', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
        });

        Schema::create('team_user', function(Blueprint $table)
        {
            $table->integer('team_id')->unsigned();
            $table->integer('user_id')->unsigned();
        });

        Schema::table('team_user', function($table) {
            $table->foreign('team_id')->references('id')->on('teams');
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::create('campaigns', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->integer('creator_id')->unsigned();
            $table->integer('brand_id')->unsigned()->nullable();
            $table->string('report_name');
            $table->string('task_name');
            $table->text('description')->nullable();
            $table->integer('frequency')->default(1);
            $table->string('per_location')->default(0); // number of tasks per location
            $table->string('time_to_complete')->default('1');
            $table->boolean('one_per_location')->default(1); // can a user only complete 1 task at this location
            $table->integer('sort_order')->default(0);
            $table->boolean('survey')->default(0);
            $table->boolean('submitted')->default(0);
            $table->boolean('complete')->default(0);
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('campaigns', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('creator_id')->references('id')->on('users');
            $table->foreign('brand_id')->references('id')->on('brands');
        });

        Schema::create('campaign_waves', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->integer('campaign_id')->unsigned();
            $table->boolean('created')->default(0);
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('campaign_waves', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
        });

        Schema::create('tasks', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->integer('campaign_id')->unsigned();
            $table->integer('location_id')->unsigned();
            $table->integer('wave_id')->unsigned();
            $table->boolean('checked_out')->default(0);
            $table->timestamp('checked_out_start')->nullable();
            $table->integer('checked_out_id')->unsigned()->nullable();
            $table->boolean('in_progress')->default(0);
            $table->boolean('submitted')->default(0);
            $table->boolean('approved')->default(0);
            $table->boolean('complete')->default(0);
            $table->timestamp('end_date')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('tasks', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('checked_out_id')->references('id')->on('users');
            $table->foreign('wave_id')->references('id')->on('campaign_waves');
        });

        Schema::create('question_types', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('type');
            $table->string('answer_type');
        });

        Schema::create('questions', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->integer('input_type')->unsigned();
            $table->integer('campaign_id')->unsigned();
            $table->string('question');
            $table->string('prompt')->nullable();
            $table->boolean('required');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('questions', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('input_type')->references('id')->on('question_types');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
        });

        Schema::create('question_options', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->integer('campaign_id')->unsigned();
            $table->integer('question_id')->unsigned();
            $table->string('name');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('question_options', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('question_id')->references('id')->on('questions');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
        });

        Schema::create('images', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->integer('campaign_id')->unsigned();
            $table->integer('location_id')->unsigned();
            $table->integer('question_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->integer('task_id')->unsigned();
            $table->string('name');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('images', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('question_id')->references('id')->on('questions');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('task_id')->references('id')->on('tasks');
        });

        Schema::create('question_answers', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->integer('location_id')->unsigned();
            $table->integer('campaign_id')->unsigned();
            $table->integer('task_id')->unsigned();
            $table->integer('question_id')->unsigned();
            $table->integer('question_type_id')->unsigned();
            $table->integer('question_image_id')->unsigned()->nullable();
            $table->text('answer_text')->nullable();
            $table->integer('answer_numeric')->nullable();
            $table->boolean('answer_yn')->nullable();
            $table->string('answer_gpslat')->nullable();
            $table->string('answer_gpslong')->nullable();
            $table->boolean('alert')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('question_answers', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('task_id')->references('id')->on('tasks');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->foreign('question_id')->references('id')->on('questions');
            $table->foreign('question_type_id')->references('id')->on('question_types');
            $table->foreign('question_image_id')->references('id')->on('images');
        });

        Schema::create('campaign_locations', function(Blueprint $table)
        {
            $table->integer('campaign_id')->unsigned();
            $table->integer('location_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('campaign_locations', function($table) {
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->foreign('location_id')->references('id')->on('locations');
        });

        Schema::create('campaign_frequency', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('name');
        });

        Schema::create('campaign_teams', function(Blueprint $table)
        {
            $table->integer('campaign_id')->unsigned();
            $table->integer('team_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('campaign_teams', function($table) {
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->foreign('team_id')->references('id')->on('teams');
        });

        Schema::create('campaign_users', function(Blueprint $table)
        {
            $table->integer('campaign_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('campaign_users', function($table) {
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::create('brand_locations', function(Blueprint $table)
        {
            $table->integer('brand_id')->unsigned();
            $table->integer('location_id')->unsigned();
        });

        Schema::table('brand_locations', function($table) {
            $table->foreign('brand_id')->references('id')->on('brands');
            $table->foreign('location_id')->references('id')->on('locations');
        });

        Schema::create('tags', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->string('name');
            $table->enum('type', ['location', 'brand']);
            $table->timestamps();
        });

        Schema::table('tags', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
        });

        Schema::create('taggables', function(Blueprint $table)
        {
            $table->integer('tag_id');
            $table->integer('taggable_id');
            $table->string('taggable_type');
        });

        Schema::create('alert_rules', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->integer('campaign_id')->unsigned();
            $table->integer('question_id')->unsigned();
            $table->enum('operator', ['if', 'and', 'or', 'not']);
            $table->enum('comparator', ['>', '=', '<', '!=']);
            $table->string('reference');
            $table->string('name')->nullable();
            $table->timestamps();
        });

        Schema::table('alert_rules', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('question_id')->references('id')->on('questions');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
        });

        Schema::create('alerts', function(Blueprint $table)
        {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->integer('campaign_id')->unsigned();
            $table->integer('location_id')->unsigned();
            $table->integer('task_id')->unsigned();
            $table->integer('question_id')->unsigned();
            $table->boolean('actioned')->default(0);
            $table->string('name')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('alerts', function($table) {
            $table->foreign('company_id')->references('id')->on('companies');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('task_id')->references('id')->on('tasks');
            $table->foreign('question_id')->references('id')->on('questions');
        });

        Schema::create('devices', function(Blueprint $table)
        {
            $table->increments('id');
            $table->string('device_token', 255)->nullable();
            $table->string('device_token_type')->nullable();
            $table->integer('user_id')->unsigned();
            $table->timestamps();
        });
        Schema::table('devices', function($table) {
            $table->foreign('user_id')->references('id')->on('users');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {   

        Schema::table('invited', function($table) {
            $table->dropForeign('invited_company_id_foreign');
        });

        Schema::table('company_role_user', function($table) {
            $table->dropForeign('company_role_user_company_id_foreign');
            $table->dropForeign('company_role_user_role_id_foreign');
            $table->dropForeign('company_role_user_user_id_foreign');
        });

        Schema::table('brands', function($table) {
            $table->dropForeign('brands_company_id_foreign');
            $table->dropForeign('brands_manager_id_foreign');
        });

        Schema::table('locations', function($table) {
            $table->dropForeign('locations_company_id_foreign');
            // $table->dropForeign('locations_brand_id_foreign');
        });

        Schema::table('teams', function($table) {
            $table->dropForeign('teams_company_id_foreign');
        });

        Schema::table('team_user', function($table) {
            $table->dropForeign('team_user_team_id_foreign');
            $table->dropForeign('team_user_user_id_foreign');
        });

        Schema::table('campaigns', function($table) {
            $table->dropForeign('campaigns_company_id_foreign');
            $table->dropForeign('campaigns_creator_id_foreign');
            $table->dropForeign('campaigns_brand_id_foreign');
        });

        Schema::table('campaign_waves', function($table) {
            $table->dropForeign('campaign_waves_company_id_foreign');
            $table->dropForeign('campaign_waves_campaign_id_foreign');
        });

        Schema::table('tasks', function($table) {
            $table->dropForeign('tasks_company_id_foreign');
            $table->dropForeign('tasks_campaign_id_foreign');
            $table->dropForeign('tasks_location_id_foreign');
            $table->dropForeign('tasks_checked_out_id_foreign');
            $table->dropForeign('tasks_wave_id_foreign');
        });

        Schema::table('questions', function($table) {
            $table->dropForeign('questions_company_id_foreign');
            $table->dropForeign('questions_input_type_foreign');
            $table->dropForeign('questions_campaign_id_foreign');
        });

        Schema::table('question_options', function($table) {
            $table->dropForeign('question_options_question_id_foreign');
        });

        Schema::table('images', function($table) {
            $table->dropForeign('images_company_id_foreign');
            $table->dropForeign('images_campaign_id_foreign');
            $table->dropForeign('images_location_id_foreign');
            $table->dropForeign('images_question_id_foreign');
            $table->dropForeign('images_user_id_foreign');
            $table->dropForeign('images_task_id_foreign');
        });

        Schema::table('question_answers', function($table) {
            $table->dropForeign('question_answers_company_id_foreign');
            $table->dropForeign('question_answers_user_id_foreign');
            $table->dropForeign('question_answers_location_id_foreign');
            $table->dropForeign('question_answers_task_id_foreign');
            $table->dropForeign('question_answers_campaign_id_foreign');
            $table->dropForeign('question_answers_question_id_foreign');
            $table->dropForeign('question_answers_question_type_id_foreign');
            $table->dropForeign('question_answers_question_image_id_foreign');
        });

        Schema::table('campaign_locations', function($table) {
            $table->dropForeign('campaign_locations_campaign_id_foreign');
            $table->dropForeign('campaign_locations_location_id_foreign');
        });

        Schema::table('campaign_teams', function($table) {
            $table->dropForeign('campaign_teams_campaign_id_foreign');
            $table->dropForeign('campaign_teams_team_id_foreign');
        });

        Schema::table('campaign_users', function($table) {
            $table->dropForeign('campaign_users_campaign_id_foreign');
            $table->dropForeign('campaign_users_user_id_foreign');
        });

        Schema::table('brand_locations', function($table) {
            $table->dropForeign('brand_locations_brand_id_foreign');
            $table->dropForeign('brand_locations_location_id_foreign');
        });

        Schema::table('tags', function($table) {
            $table->dropForeign('tags_company_id_foreign');
        });

        Schema::table('alert_rules', function($table) {
            $table->dropForeign('alert_rules_company_id_foreign');
            $table->dropForeign('alert_rules_question_id_foreign');
        });

        Schema::table('alerts', function($table) {
            $table->dropForeign('alerts_company_id_foreign');
            $table->dropForeign('alerts_campaign_id_foreign');
            $table->dropForeign('alerts_location_id_foreign');
            $table->dropForeign('alerts_task_id_foreign');
            $table->dropForeign('alerts_question_id_foreign');
        });

        Schema::table('devices', function($table) {
            $table->dropForeign('devices_user_id_foreign');
        });



        Schema::drop('invited');
        Schema::drop('roles');
        Schema::drop('company_role_user');
        Schema::drop('brands');
        Schema::drop('locations');
        Schema::drop('teams');
        Schema::drop('team_user');
        Schema::drop('campaigns');
        Schema::drop('campaign_waves');
        Schema::drop('tasks');
        Schema::drop('question_types');
        Schema::drop('questions');
        Schema::drop('question_options');
        Schema::drop('images');
        Schema::drop('question_answers');
        Schema::drop('campaign_locations');
        Schema::drop('campaign_frequency');
        Schema::drop('campaign_teams');
        Schema::drop('campaign_users');
        Schema::drop('brand_locations');
        Schema::drop('tags');
        Schema::drop('taggables');
        Schema::drop('alert_rules');
        Schema::drop('alerts');
        Schema::drop('devices');
        Schema::drop('registered');
        Schema::drop('companies');


    }
}
