<?php

namespace Wink\Console\Commands;

use Wink\Task;
use Carbon\Carbon;
use Wink\CampaignWave;
use Illuminate\Console\Command;

class CreateTasksFromWaves extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'wink:create_tasks_from_waves';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create tasks for all waves that match today';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $current_date = Carbon::today();


        // Find all the waves that should be started today
        $waves_starting_today = CampaignWave::whereStartDate($current_date->toDateTimeString())->get();

        // For each of them set any current tasks to approved
        $waves_starting_today->each(function ($wave, $key) {

            // Find all the current tasks that are attached to the campaign and set them as complete
            // Task::whereCampaignId($wave->campaign_id)
            //     ->update([
            //         'complete' => true
            //     ]);

            if($wave->launch()){
                
                $wave->created = true;
                $wave->save();
                
            } else {
                
                \Log::info('Campaign Launch error');
                
                // TODO - trigger an email to the campaign creator that a wave failed.
                
            }

        });
    }
}
