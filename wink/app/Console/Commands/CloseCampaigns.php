<?php

namespace Wink\Console\Commands;

use Wink\Task;
use Carbon\Carbon;
use Wink\Campaign;
use Wink\CampaignWave;
use Illuminate\Console\Command;

class CloseCampaigns extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'wink:close_campaigns';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Close campaigns that are due to close today';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $current_date = Carbon::today();

        // Get all the campaigns closing today
        $campaigns_closing = Campaign::whereEndDate($current_date->toDateTimeString())->get();

        $campaigns_closing->each(function ($campaign, $key) {
            
            // Find each of the tasks that are still open and set them to closed.
            Task::whereCampaignId($campaign->id)
                ->update(['complete' => 1]);

            $campaign->complete = 1;
            $campaign->save();

        });
        
    }
}
