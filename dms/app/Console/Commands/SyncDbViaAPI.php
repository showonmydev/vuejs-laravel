<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\Sync\SyncViaAPIController;
use App\Http\Controllers\Sync\SyncController;
use App\Model\Cron;

class SyncDbViaAPI extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'SyncDB:API';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync DB Via API';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        \Log::info('CRON START');
         $objRabbit = new SyncController();
         $objRabbit->SyncInit();
        
        //$row = Cron::orderBy('id','DESC')->limit('1')->get()->toArray();
        //\Log::info($row);
        //if(isset($row[0]['task']) && $row[0]['task']  == 'APISYNCCOMPLETE'){
        //    \Log::info('CRON START FOR RabbitMQ SYNC');
        //    $objRabbit = new SyncController();
        //    $objRabbit->SyncInit();
        // } else {
        //    \Log::info('CRON START FOR API SYNC');
        //    $objAPI = new SyncViaAPIController();
        //    $objAPI->index();
        //}
    }
}
