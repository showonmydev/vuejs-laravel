<?php

namespace Wink;

use Wink\User;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'companies';
    protected $fillable = ['name', 'subdomain', 'primary_color', 'header_text_color', 'rewards', 'balance'];
    protected $hidden = [];

    public function companyroleusers()
    {
        return $this->hasMany('Wink\CompanyRoleUser');
    }

    public function users()
    {
        $company_users = $this->companyroleusers()->get();
        $users_array = collect();
        $company_users->each(function ($item, $key) use($users_array) {
            $users_array->push(User::whereId($item->user_id)->first());
        });
        return $users_array;
    }

}
