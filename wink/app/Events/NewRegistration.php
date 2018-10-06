<?php

namespace Wink\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Wink\Registered;

class NewRegistration
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $registered;

    /**
     * Create a new event instance.
     *
     * @param Registered $registered
     */
    public function __construct(Registered $registered)
    {
        $this->registered = $registered;
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
