<?php

namespace App\FxPro\Client\Models\Client;



use Illuminate\Database\Eloquent\Model;


class Client extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'email', 'password',
    ];



    public $with = ['product'];

    //<editor-fold desc="Relations">


    public function product()
    {
        return $this->hasOne(Product::class);
    }

    //</editor-fold>



    public function save(array $options = [])
    {
        $creating = false;
        if ($this->id < 0) {
            $creating = true;
        }
        $saved = parent::save($options);
        if ($creating) {


        }
        return $saved;
    }

    //<editor-fold desc="Private functions">


    //</editor-fold>
}
