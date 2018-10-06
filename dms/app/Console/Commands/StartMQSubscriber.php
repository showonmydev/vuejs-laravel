<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Config;
use App\Http\Controllers\Sync\RabbitMQService;

class StartMQSubscriber extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rabbitmq:subscribe';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start RabbitMQ Subscriber';

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
        \Log::info('START SUPERVISON');
        $rabbitMQService = new RabbitMQService();
        $rabbitMQService->listenQueue(Config::get('rabbitmq.queue'));
    }
}
