<?php
namespace App\FxPro\User\Models\User;


use App\FxPro\Core\Repositories\DB\RepositoryInterface;

interface UserInterface extends RepositoryInterface
{
    public function filter($name, $username, $type, $order = 'users.firstname', $sort = 'asc', $perPage = 10, $isActive);

    public function getByToken($token);


}