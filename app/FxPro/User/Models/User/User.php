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


    public $with = ['role', 'franchise', 'files', 'filters', 'qualification'];

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
        if ($this->id < 0) {
            $creatingUser = true;
        }
        $saved = parent::save($options);
        if ($creatingUser) {


        }
        return $saved;
    }

    //<editor-fold desc="Private functions">


    //</editor-fold>
}
