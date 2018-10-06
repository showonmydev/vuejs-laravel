<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class DeviceData extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'device_data';

    function getDescription() {
        return $this->hasOne('App\Model\DeviceMeta', 'bdid', 'bdid')->where('parameter_key','description');
    }
}
