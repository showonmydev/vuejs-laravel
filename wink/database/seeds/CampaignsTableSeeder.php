<?php

use Wink\Board;
use Wink\Campaign;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Wink\CampaignWave;

class CampaignsTableSeeder extends Seeder
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

        Model::unguard();

        $faker = Faker::create();

        foreach (range(1, 2) as $i) {

            $board = Board::all()->random();

            $campaign = Campaign::create([
                'company_id'  => ( $i > 1 ? 5 : 2 ),
                'creator_id'  => 1,
                'board_id'    => ( $i > 1 ? 5 : 2 ),
                'report_name' => "Campaign #" . $i,
                'task_name'   => "Campaign #" . $i,
                'submitted'   => 1,
                'description' => $faker->sentence(15),
                'sort_order'  => $i,
                'start_date'  => Carbon\Carbon::today(),
                'end_date'    => Carbon\Carbon::today()->addWeeks(2),
                'reward_value' => ( $i > 1 ? 250 : 0 )
            ]);

            // Build questions, one of each type
            $question1 = \Wink\Question::create([
                'company_id'  => $campaign->company_id,
                'campaign_id' => $campaign->id,
                'input_type'  => 1,
                'question'    => "Question #1 " . $faker->sentence(2),
                'prompt'      => $faker->sentence(4),
                'required'    => $faker->numberBetween(0, 1)
                ]);

            $question2 = \Wink\Question::create([
                'company_id'  => $campaign->company_id,
                'campaign_id' => $campaign->id,
                'input_type'  => 2,
                'question'    => "Question #2 " . $faker->sentence(2),
                'prompt'      => $faker->sentence(4),
                'required'    => $faker->numberBetween(0, 1)
                ]);

            $question3 = \Wink\Question::create([
                'company_id'  => $campaign->company_id,
                'campaign_id' => $campaign->id,
                'input_type'  => 6,
                'question'    => "Question #3 " . $faker->sentence(2),
                'prompt'      => $faker->sentence(4),
                'required'    => $faker->numberBetween(0, 1)
                ]);

            $question4 = \Wink\Question::create([
                'company_id'  => $campaign->company_id,
                'campaign_id' => $campaign->id,
                'input_type'  => 8,
                'question'    => "Question #4 " . $faker->sentence(2),
                'prompt'      => $faker->sentence(4),
                'required'    => $faker->numberBetween(0, 1)
                ]);

            $question5 = \Wink\Question::create([
                'company_id'  => $campaign->company_id,
                'campaign_id' => $campaign->id,
                'input_type'  => 9,
                'question'    => "Question #5 " . $faker->sentence(2),
                'prompt'      => $faker->sentence(4),
                'required'    => $faker->numberBetween(0, 1)
                ]);

            if ($question2->input_type === 2) {
                foreach (range(1, $faker->numberBetween(2, 6)) as $index => $y) {
                    \Wink\QuestionOption::create([
                        'question_id' => $question2->id,
                        'campaign_id' => $campaign->id,
                        'company_id'  => $question2->company_id,
                        'name'        => "Option #" . $y
                        ]);
                }
            }
            

            foreach (range(1, 5) as $v) {
                $location = Wink\Location::where('address','<>','Unknown')->get();
                $location = $location->random();
                \Wink\CampaignLocation::create([
                    'campaign_id' => $campaign->id,
                    'location_id' => $location->id
                ]);
            }

            CampaignWave::create([
                'company_id' => 2,
                'campaign_id' => $campaign->id,
                'created' => 1,
                'start_date' => \Carbon\Carbon::now(),
                'end_date' => \Carbon\Carbon::now()
            ]);

            foreach (range(1, 5) as $w) {
                $campaign_locations = Wink\CampaignLocation::whereCampaignId($campaign->id)->get();
                $campaign_location = $campaign_locations->random();
                $location_details = $campaign_location->location;

                $checked_out = 0;
                $checked_out_start = NULL;
                $in_progress =  0;
                $submitted = 0;
                $approved = 0;

                $task = \Wink\Task::create([
                    'company_id'        => $campaign->company_id,
                    'campaign_id'       => $campaign->id,
                    'location_id'       => $location_details->id,
                    'wave_id'           => $campaign->id,
                    'checked_out'       => $checked_out,
                    'checked_out_start' => $checked_out_start,
                    'in_progress'       => $in_progress,
                    'submitted'         => $submitted,
                    'approved'          => $approved,
                    'end_date' => \Carbon\Carbon::now()
                    ]);
            }

        }

        Model::reguard();
    }
}

