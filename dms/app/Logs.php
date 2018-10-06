<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class logs extends Model
{

    protected $table = 'user_logs';

    public function WithUser() {
    	return $this->hasOne('App\User', 'id');
    }
}
