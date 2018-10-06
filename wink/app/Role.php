<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';
    
    public function users()
    {
        return $this->hasMany('Wink\User', 'role_id', 'id');
    }
}
