<?php
namespace App\FxPro\Client\Models\Client;


use App\FxPro\Core\Repositories\DB\RepositoryInterface;

interface ClientInterface extends RepositoryInterface
{
    /**
     * @param $name
     * @param $email
     * @param string $order
     * @param string $sort
     * @param int $perPage
     * @param $isActive
     * @return mixed
     */
    public function filter($name, $email, $order = 'clients.firstname', $sort = 'asc', $perPage = 10, $isActive);

}