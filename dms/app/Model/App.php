<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class App extends Model
{
    protected $table = 'app';

    public function getAppVersion()
    {
        return $this->hasOne('App\Model\AppVersion', 'app_id', 'id')->where('status',1)->orderBy('version_name', 'DESC');
    }

    public function getNeedUpdateVersion()
    {
        return $this->hasOne('App\Model\AppVersion', 'app_id', 'id')->where('status',2)->orderBy('version_name', 'DESC');
    }

    public function getAppVersionUpdateReq()
    {
        return $this->hasOne('App\Model\AppVersion', 'app_id', 'id')->where('status',2);
    }
}
