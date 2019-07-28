<?php

namespace App\FxPro\Product\Models\Product;



use App\FxPro\Client\Models\Client\Client;
use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];



    //<editor-fold desc="Relations">


    public function clients()
    {
        return $this->hasMAny(Client::class);
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
