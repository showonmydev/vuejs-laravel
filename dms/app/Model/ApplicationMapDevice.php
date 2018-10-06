<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ApplicationMapDevice extends Model
{
    protected $table = 'application_map_device';

    public function getApp()
    {
        return $this->hasOne('App\Model\App', 'id', 'appId')->with('getAppVersion','getNeedUpdateVersion');
    }

    public function getUpdate()
    {
        return $this->hasOne('App\Model\App', 'id', 'appId')->with('getAppVersionUpdateReq','getNeedUpdateVersion');
    }

}
