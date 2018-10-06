<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;

class Registered extends Model
{
    protected $table = 'registered';
    protected $fillable = ['company_name', 'company_subdomain', 'first_name', 'last_name', 'email', 'password', 'registration_link'];
    protected $hidden = ['password', 'registration_link'];
}
