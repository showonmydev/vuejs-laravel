<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;

class Invited extends Model
{
    protected $table = 'invited';
    protected $fillable = ['company_id', 'first_name', 'last_name', 'email', 'team_invited', 'invitation_link', 'complete'];
}
