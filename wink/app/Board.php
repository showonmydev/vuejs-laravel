<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Board extends Model
{
    use SoftDeletes;

    protected $table = 'boards';
    protected $fillable = ['name', 'company_id', 'manager_id'];
    protected $hidden = ['company_id'];
    protected $dates = ['deleted_at'];
    

    /**
     * Attach this to queries in controller to ensure we always restrict
     * the return to the current shop
     * @param $query
     */
    public function scopeCurrentCompany($query){
        $query->where('company_id', '=', session('using_company'));
    }


    /**
     * Get all of the managers for the board.
     */

    public function users()
    {

        return $this->belongsToMany( 'Wink\User', 'board_users', 'board_id', 'user_id' )->withTimestamps();
    }

    /**
     * Get all of the managers for the board.
    */

    public function campaigns()
    {

        return $this->hasMany( 'Wink\Campaign', 'board_id', 'id' );
    }

    public function campaignsCount()
    {

        return Campaign::whereCompanyId(session('using_company'))
            ->whereBoardId($this->id)
            ->count();
    }

}
