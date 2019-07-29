<?php
namespace App\FxPro\Product\Models\Product;


use App\FxPro\Core\Repositories\DB\RepositoryInterface;

interface ProductInterface extends RepositoryInterface
{
    /**
     * @param $name
     * @param string $order
     * @param string $sort
     * @param int $perPage
     * @param $isActive
     * @return mixed
     */
    public function filter($name, $order = 'products.name', $sort = 'asc', $perPage = 10, $isActive);

}