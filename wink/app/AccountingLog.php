<?php

namespace Wink;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AccountingLog extends Model
{
    use SoftDeletes;

    protected $table = 'accounting_log';
    protected $fillable = ['user_id', 'action','amount', 'notes', 'company_id'];
    protected $dates = ['deleted_at'];

}
