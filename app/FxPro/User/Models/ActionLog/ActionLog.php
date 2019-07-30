<?php

namespace App\FxPro\User\Models\ActionLog;

use Illuminate\Database\Eloquent\Model;

class ActionLog extends Model
{
    public $fillable = ['user_id', 'resource_name', 'resource_id', 'action'];
}
