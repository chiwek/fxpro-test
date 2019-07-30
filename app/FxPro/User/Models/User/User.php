<?php

namespace App\FxPro\User\Models\User;


use App\FxPro\User\Models\Role\Role;

use App\FxPro\User\Models\UserFilter\UserFilter;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    public $with = ['role', 'filters'];

    //<editor-fold desc="Relations">


    public function filters()
    {
        return $this->hasMany(UserFilter::class);
    }

    //</editor-fold>

    public function hasRole($roles)
    {
        foreach ($roles as $role) {
            if ($this->role->name == $role) {
                return true;
            }
        }
        return false;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }


    public function save(array $options = [])
    {
        $creatingUser = false;
        if ($this->id < 1) {
            $creatingUser = true;
            $this->date_registered = date('Y-m-d H:i:s');
            $this->remember_token = '';
        }
        $saved = parent::save($options);
        if ($creatingUser) {


        }
        return $saved;
    }

    /**
     * @return bool
     */
    public function canDelete() {
        return $this->hasPermissionAction('delete');
    }


    //<editor-fold desc="Private functions">
    private function hasPermissionAction($name) {
        foreach ($this->role->permissions as $permission) {
            if ($permission->action == $name) {
                return true;
            }
        }
        return false;
    }

    private function checkPermissionUrl($name) {
        foreach ($this->role->permissions as $permission) {
            if ($permission->url == $name) {
                return true;
            }
        }
        return false;
    }

    //</editor-fold>
}
