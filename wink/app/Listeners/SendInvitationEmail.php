<?php

namespace Wink\Listeners;

use Illuminate\Support\Facades\Mail;
use Wink\Events\NewInvitation;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendInvitationEmail
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
     * @param  NewInvitation  $event
     * @return void
     */
    public function handle(NewInvitation $event)
    {

        $new_invited_user = $event->invited;
        $user = $event->user;

        Mail::send('emails.invitationLink', ['invited' => $new_invited_user, 'user' => $user], function ($message) use ($new_invited_user, $user) {
            $message->to($new_invited_user->email);
            $message->replyTo('info@wink.app', 'Mike from Wink');
            $message->from('info@wink.app', 'Mike from Wink');
            $message->subject('Complete your invitation for ' . session('using_company_name'));
        });
    }
}
