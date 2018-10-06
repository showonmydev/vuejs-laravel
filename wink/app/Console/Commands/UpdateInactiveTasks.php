<?php

namespace Wink\Console\Commands;

use Wink\Campaign;
use Wink\CampaignWave;
use Wink\Task;
use Carbon\Carbon;
use Illuminate\Console\Command;

class UpdateInactiveTasks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'wink:update_inactive_tasks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove tasks that have been checked out but not compelted within the 2 hour window';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        // All campaigns that are active that are within the date range
        $active_campaigns = Campaign::whereComplete(0)
                            ->where('start_date', '<=', Carbon::today()->toDateTimeString())
                            ->where('end_date', '>=', Carbon::today()->toDateTimeString())
                            ->get();

        $active_campaigns->each(function ($item, $key) {
            
            $past_time = Carbon::now()->subHours($item->time_to_complete)->toDateTimeString();

            // Update all tasks that have been checked out over 5 hours ago
            // but are not in progress, meaning someone has not actioned it.
            Task::where('submitted', 0)
              ->whereCheckedOut(1)
              ->whereCampaignId($item->id)
              ->where('checked_out_start','<=', $past_time)
              ->update([
                    'checked_out_start' => NULL,
                    'checked_out'       => 0,
                    'checked_out_id'    => NULL,
                    'submitted'         => 0,
                    'complete'          => 0,
                    'end_date'          => $item->end_date
                ]);

            CampaignWave::whereCampaignId($item->id)
              ->where('end_date','<', $item->end_date)
              ->update([
                    'end_date'          => $item->end_date
            ]);

        });

        
    }
}
