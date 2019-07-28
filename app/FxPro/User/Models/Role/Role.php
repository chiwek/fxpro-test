<?php

namespace App\FxPro\User\Models\Role;

use App\FxPro\User\Models\Permission\Permission;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    const ADMIN = 1;
    const REGULAR = 2;

    public $timestamps = false;

    protected $with = ['permissions'];

    public function permissions() {
        return $this->belongsToMany(Permission::class, 'role_permissions');
    }
}
