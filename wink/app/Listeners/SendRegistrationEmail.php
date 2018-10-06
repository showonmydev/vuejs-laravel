<?php

namespace Wink\Listeners;

use Illuminate\Support\Facades\Mail;
use Wink\Events\NewRegistration;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendRegistrationEmail implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  NewRegistration  $event
     * @return void
     */
    public function handle(NewRegistration $event)
    {
        $new_registered_user = $event->registered;
        Mail::send('emails.registrationLink', ['registered' => $new_registered_user], function ($message) use ($new_registered_user) {
            $message->to($new_registered_user->email, $new_registered_user->first_name . ' ' . $new_registered_user->last_name);
            $message->replyTo('info@wink.app', 'Mike from Wink');
            $message->from('info@wink.app', 'Mike from Wink');
            $message->subject('Complete your registration for Wink');
        });
    }
}
