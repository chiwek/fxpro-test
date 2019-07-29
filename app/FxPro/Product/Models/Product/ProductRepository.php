<?php
namespace App\FxPro\Product\Models\Product;

use App\FxPro\Core\Repositories\DB\Repository;



use App\FxPro\Product\Models\Product\Criteria\FilterCriteria;



class ProductRepository extends Repository implements ProductInterface
{

    /**
     * @param $name
     * @param string $order
     * @param string $sort
     * @param int $perPage
     * @param $isActive
     * @return mixed
     */
    public function filter($name, $order = 'products.name', $sort = 'asc', $perPage = 10, $isActive)
    {
        $this->pushCriteria(new FilterCriteria($name, $order, $sort, $isActive));

        $res = $this->paginate($perPage);

        return $res;
    }




    public function model()
    {
        return Product::class;
    }

}