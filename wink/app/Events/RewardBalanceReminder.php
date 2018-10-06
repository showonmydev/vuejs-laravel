<?php

namespace Wink\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Wink\Company;
use Wink\User;

class RewardBalanceReminder
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $company;
    public $user;

    /**
     * Create a new event instance.
     *
     * @param Invited $invited
     * @param User $user
     */
    public function __construct(Comapny $company, User $user)
    {
        $this->company = $company;
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        //return new PrivateChannel('channel-name');
        return [];
    }
}
