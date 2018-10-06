<?php

namespace Wink\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \Wink\Console\Commands\UpdateInactiveTasks::class,
        \Wink\Console\Commands\CreateTasksFromWaves::class,
        \Wink\Console\Commands\CloseCampaigns::class,
        \Wink\Console\Commands\RewardBulkPayout::class,
        \Spatie\MigrateFresh\Commands\MigrateFresh::class,

    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('wink:update_inactive_tasks')
                 ->everyFiveMinutes();

        $schedule->command('wink:close_campaigns')
                 ->daily();

        $schedule->command('wink:create_tasks_from_waves')
                 ->daily();         
        
        //$schedule->command('wink:reward_bulk_payout')->daily();             
    }
}
