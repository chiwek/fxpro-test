<?php
namespace App\FxPro\Client\Models\Client;

use App\FxPro\Core\Repositories\DB\Repository;



use App\FxPro\Client\Models\Client\Criteria\FilterCriteria;


use Illuminate\Database\Eloquent\Collection;


class ClientRepository extends Repository implements ClientInterface
{

    /**
     * @param $filterKey
     * @param null $roleKey
     * @param string $orderKey
     * @param string $orderDirection
     * @param int $paginate
     * @return Collection
     */
    public function filter($name, $email, $order = 'clients.firstname', $sort = 'asc', $perPage = 10, $isActive)
    {
        $this->pushCriteria(new FilterCriteria($name, $email, $order, $sort, $isActive));

        $res = $this->paginate($perPage);

        return $res;
    }




    public function model()
    {
        return Client::class;
    }

}