<?php

namespace Wink;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;
use Wink\Notifications\MailResetPasswordToken;


class User extends Authenticatable
{

/**
    * @SWG\Definition(
    *   definition="User",
    *   required={"company_id"},
    *   @SWG\Property(
    *       property="first_name",
    *       type="string",
    *       description="The users first name",
    *       example="Phil"
    *   ),
    *   @SWG\Property(
    *       property="last_name",
    *       type="string",
    *       description="The users last name",
    *       example="Benoit"
    *   ),
    *   @SWG\Property(
    *       property="email",
    *       type="string",
    *       description="The users email",
    *       example="phil@incendiaryblue.com"
    *   ),
    *   @SWG\Property(
    *       property="password",
    *       type="string",
    *       description="The users hashed password"
    *   ),
    *   @SWG\Property(
    *       property="initial_company_id",
    *       type="int",
    *       description="The first company we should use to query the DB, a user can change their active company"
    *   ),
    *   @SWG\Property(
    *       property="account_name",
    *       type="string",
    *       description="The account holders name"
    *   ),
    *   @SWG\Property(
    *       property="account_number",
    *       type="string",
    *       description="The account number"
    *   ),
    *   @SWG\Property(
    *       property="account_bank",
    *       type="string",
    *       description="The account bank number"
    *   ),
    *   @SWG\Property(
    *       property="account_type",
    *       type="string",
    *       description="The type of account"
    *   )
    * )
*/
    use Notifiable;

    protected $table = 'users';
    protected $fillable = ['first_name', 'last_name', 'email', 'password', 'initial_company_id', 'account_name', 'account_number', 'account_bank', 'account_type', 'payout_requested', 'balance', 'pending_payout', 'dob', 'gender', 'ethnicity', 'mobile', 'city'] ;
    protected $hidden = ['password', 'remember_token'];

    public function getCreatedAtAttribute( $timestamp )
    {
        return Carbon::parse($timestamp)->toIso8601String();
    }
    public function getUpdatedAtAttribute( $timestamp )
    {
        return Carbon::parse($timestamp)->toIso8601String();
    }

    public function name(){
        return $this->first_name . " " . $this->last_name;
    }

    public function initials(){
        return $this->first_name[0] . $this->last_name[0];
    }

    // USAGE - Auth::user()->getRole()
    public function getRole()
    {
        $role = DB::table('company_role_user')
            ->whereCompanyId(session('using_company'))
            ->whereUserId($this->id)
            ->join('roles', 'role_id', '=', 'roles.id')
            ->value('roles.name');

        return $role;
    }

    public function hasRole($role)
    {
        return $role === $this->getRole() ? true : false;
    }

    public function doesNotHaveRole($role)
    {
        return $role !== $this->getRole() ? true : false;
    }

    public function teams()
    {
        return $this->belongsToMany('Wink\Team');
    }

    public function campaigns()
    {
        return $this->belongsToMany('Wink\Campaign', 'campaign_users', 'user_id', 'campaign_id');
    }

    public function devices(){
        return $this->hasMany('Wink\Device', 'user_id', 'id');
    }

    public function profile()
    {
        $user = $this;
        unset($user['initial_company_id']);
        unset($user['devices']);
        return $user;
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new MailResetPasswordToken($token));
    }
}
