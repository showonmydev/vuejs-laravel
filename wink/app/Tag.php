<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table    = 'tags';
    protected $fillable = [
        'company_id',
        'name', 
        'type'
    ];

    public function scopeCurrentCompany($query){
        return $query->where('company_id', '=', session('using_company'));
    }

    /**
     * Get all of the posts that are assigned this tag.
     */
    public function locations()
    {
        return $this->morphedByMany('Wink\Location', 'taggable');
    }

    // /**
    //  * Get all of the videos that are assigned this tag.
    //  */
    // public function videos()
    // {
    //     return $this->morphedByMany('App\Video', 'taggable');
    // }

}
