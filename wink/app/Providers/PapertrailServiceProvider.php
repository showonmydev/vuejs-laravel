<?php

namespace Wink\Providers;

use Illuminate\Support\ServiceProvider;

class PapertrailServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
       if (app('app')->environment() == 'local') return;

        $monolog   = app(\Illuminate\Log\Writer::class)->getMonolog();
        $syslog    = new \Monolog\Handler\SyslogHandler('laravel');
        $formatter = new \Monolog\Formatter\LineFormatter('%channel%.%level_name%: %message% %extra%');

        $syslog->setFormatter($formatter);
        $monolog->pushHandler($syslog);
    }
}
