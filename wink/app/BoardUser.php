<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;

class BoardUser extends Model
{
    protected $table = 'board_users';
    protected $fillable = ['board_id', 'user_id'];

    public function user()
    {
        return $this->hasOne('Wink\User', 'id', 'user_id');
    }

    public function board()
    {
        return $this->hasOne('Wink\Board', 'id', 'board_id');
    }
}
