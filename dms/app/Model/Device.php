<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'equipment';
	
	public function dms_equipment() {

        return $this->hasMany('App\Model\DeviceMeta', 'bdid');
    }

    public function device_data() {

        return $this->hasOne('App\Model\DeviceData', 'bdid');
    }

    public function device_meta() {

        return $this->hasOne('App\Model\DeviceMeta', 'bdid')->where('parameter_key','bdid');
    }

    public function company_info() {

        return $this->hasOne('App\Model\Company', 'id', 'company_id')->select(['name','id']);
    }

    public function user_info() {

        return $this->hasOne('App\User', 'id', 'created_user')->select(['name','email','id']);
    }
}
