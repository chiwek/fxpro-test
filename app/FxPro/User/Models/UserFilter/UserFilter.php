<?php

namespace App\FxPro\User\Models\UserFilter;

use Illuminate\Database\Eloquent\Model;

class UserFilter extends Model
{
    protected $casts = [
        'value' => 'array'
    ];
}
