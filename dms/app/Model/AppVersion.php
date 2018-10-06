<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class AppVersion extends Model
{
    protected $table = 'app_version';

    public function getAppVersion()
    {
        return $this->hasOne('App\Model\App', 'id', 'app_id');
    }

    public function getOlderApp()
    {
        $results = AppVersion::groupBy('app_id', 'version_code')
            ->orderBy('app_id', 'asc')
            ->orderBy('version_code', 'desc')
            ->get();
        return $results;
    }
}
