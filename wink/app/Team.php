<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use SoftDeletes;
    protected $table = 'teams';
    protected $fillable = ['name', 'description', 'company_id'];
    protected $hidden = [];
    protected $dates = ['deleted_at'];

    /**
     * Attach this to queries in controller to ensure we always restrict
     * the return to the current shop
     * @param $query
     */
    public function scopeCurrentCompany($query){
        return $query->where('company_id', '=', session('using_company'));
    }

    public function members()
    {
        return $this->belongsToMany('Wink\User');
    }

    public function invitedMembers()
    {
        return $this->hasMany('Wink\Invited', 'team_invited', 'id');
    }
}
