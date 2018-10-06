<?php

namespace Wink\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'Wink\Events\NewRegistration' => [
            'Wink\Listeners\SendRegistrationEmail',
        ],
        'Wink\Events\NewInvitation' => [
            'Wink\Listeners\SendInvitationEmail',
        ],
        'Wink\Events\RewardBalanceRemnider' => [
            'Wink\Listeners\SendRewardBalanceRemnider',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
