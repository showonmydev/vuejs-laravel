<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */

$factory->define(Wink\Registered::class, function(Faker\Generator $faker) {
    
    $email = 'submitter@email.com';

    return [
        'company_name' => 'Acme',
        'company_subdomain' => 'acme',
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => $email,
        'password' => Hash::make('qwerty'),
        'registration_link' => Crypt::encrypt($email . '/Acme')
    ];
});

$factory->define(Wink\User::class, function (Faker\Generator $faker) {
    return [
        'first_name'         => $faker->name,
        'last_name'          => $faker->name,
        'email'              => $faker->email,
        'password'           => Hash::make(str_random(10)),
        'remember_token'     => str_random(10),
        'initial_company_id' => 2
    ];
});

$factory->define(Wink\Board::class, function (Faker\Generator $faker) {
    return [
        'name'       => $faker->randomElement($array = array("Pick 'n Pay", "Vida", "Kauai")),
        'manager_id' => $faker->numberBetween($min = 1, $max = 2),
        'company_id' => 2
    ];
});

$factory->define(Wink\Location::class, function (Faker\Generator $faker) {
    return [
        'name'       => $faker->city,
        'company_id' => $faker->numberBetween(1,5),
        'address'    => $faker->streetAddress,
        'province'   => $faker->state,
        'city'       => $faker->city,
        'latitude'   => $faker->randomFloat($nbMaxDecimals = 4, $min = -34.10, $max = -33.738),
        'longitude'  => $faker->randomFloat($nbMaxDecimals = 4, $min = 18.4, $max = 18.9)
    ];
});

$factory->define(Wink\Team::class, function (Faker\Generator $faker) {
    return [
        'name'        => $faker->word,
        'description' => $faker->sentence,
        'company_id'  => 2
    ];
});

$factory->define(Wink\Campaign::class, function (Faker\Generator $faker) {
    $board = Wink\Board::all()->random();
    $complete = $faker->boolean(25);
    return [
        'company_id'       => 2,
        'creator_id'       => 1,
        'board_id'         => $board->id,
        'report_name'      => "Campaign #" . $faker->word(),
        'task_name'        => "Campaign #" . $faker->word(),
        'description'      => $faker->sentence(15),
        'sort_order'       => $faker->randomNumber(3),
        'start_date'       => Carbon\Carbon::today(),
        'end_date'         => Carbon\Carbon::today()->addWeeks($faker->numberBetween(1, 8)),
        'frequency'        => $faker->numberBetween(1, 3),
        'per_location'     => $faker->numberBetween(1, 4),
        'time_to_complete' => $faker->numberBetween(1, 12),
        'submitted'        => $complete,
        'complete'         => $complete
    ];
});

$factory->define(Wink\Question::class, function (Faker\Generator $faker) {
    $campaign = Wink\Campaign::all()->random();
    return [
        'company_id'  => 2,
        'campaign_id' => $campaign->id,
        'input_type'  => $faker->numberBetween(1, 2),
        'question'    => $faker->sentence(4),
        'prompt'      => $faker->sentence(4),
        'required'    => $faker->numberBetween(0, 1)
    ];
});

$factory->define(Wink\QuestionOption::class, function (Faker\Generator $faker) {
    return [
        'question_id' => $question->id,
        'name'        => $faker->word
    ];
});

$factory->define(Wink\CampaignLocation::class, function (Faker\Generator $faker) {
    $campaign = Wink\Campaign::all()->random();
    $location = Wink\Location::all()->random();
    return [
        'campaign_id' => $campaign->id,
        'location_id' => $location->id
    ];
});

$factory->define(Wink\CampaignUser::class, function (Faker\Generator $faker) {
    $user = Wink\User::all()->random();
    $campaign = Wink\Campaign::all()->random();
    return [
        'campaign_id' => $campaign->id,
        'user_id'     => $user->id
    ];
});

$factory->define(Wink\CampaignTeam::class, function (Faker\Generator $faker) {
    $team = Wink\Team::all()->random();
    $campaign = Wink\Campaign::all()->random();
    return [
        'campaign_id' => $campaign->id,
        'team_id'     => $team->id
    ];
});

$factory->define(Wink\Task::class, function (Faker\Generator $faker) {
    $campaign = Wink\Campaign::all()->random();
    $campaign_locations = Wink\CampaignLocation::whereCampaignId($campaign->id)->get();
    $campaign_location = $campaign_locations->random();
    $location_details = $campaign_location->location;
    return [
        'company_id'  => 2,
        'campaign_id' => $campaign->id,
        'location_id' => $location_details->id,
        'wave_id' => $campaign->id
    ];
});

$factory->define(Wink\Tag::class, function (Faker\Generator $faker) {
    return [
        'company_id' => 2,
        'name'       => $faker->word,
        'type'       => $faker->randomElement(["location", "board"])
    ];
});
