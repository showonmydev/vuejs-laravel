<?php

namespace Wink\Listeners;


use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;
use Wink\Events\RewardBalanceReminder;

class SendRewardBalanceReminderEmail
{
    /**
     * Create the event listener.
     *
     */
    use InteractsWithQueue, Queueable, SerializesModels;

    protected $company;
    protected $userID;
    protected $application;
    /**
     * Create a new job instance.
     *
     * @param User $user
     */
    public function __construct($company, $user)
    {
        $this->company = $company;
        $this->userID = $userID;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $company = $event->company;
        $user = $event->user;

        $past_time = Carbon::now()->subHours(24)->toDateTimeString();

        if($company->balance_low_last_sent <= $past_time){

            Mail::send('emails.rewardBalanceReminder', ['company' => $company, 'user' => $user], function ($message) use ($company, $user) {
                $message->to($user->email);
                $message->replyTo('info@wink.app', 'Mike from Wink');
                $message->from('info@wink.app', 'Mike from Wink');
                $message->subject('Task Rewards Balance Reminder - ' . session('using_company_name'));
            });
        }
    }
}
