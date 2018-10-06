<?php namespace Wink;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Client;

class Device extends Model {
    
    protected $fillable = [
        'device_token', 'device_token_type', 'user_id'
    ];

}

