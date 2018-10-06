<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SystemIntegratorSync extends Model
{
    use SoftDeletes;
    protected $table = 'system_integrator_sync';
    protected $dates = ['deleted_at'];
}
