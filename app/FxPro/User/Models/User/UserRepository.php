<?php
namespace App\FxPro\User\Models\User;

use App\FxPro\Core\Repositories\DB\Repository;


use App\FxPro\User\Models\Role\Role;
use App\FxPro\User\Models\User\Criteria\FilterCriteria;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class UserRepository extends Repository implements UserInterface
{

    /**
     * @param $filterKey
     * @param null $roleKey
     * @param string $orderKey
     * @param string $orderDirection
     * @param int $paginate
     * @return Collection
     */
    public function filter($name, $username, $type, $order = 'users.firstname', $sort = 'asc', $perPage = 10, $isActive)
    {
        $this->pushCriteria(new FilterCriteria($name, $username, $type, $order, $sort, $isActive));

        $res = $this->paginate($perPage);

        return $res;
    }

    public function getByToken($token) {
        return
            $this->makeModel()
                ->where('remember_token', $token)
                ->whereNotNull('remember_token')
                ->first();
    }


    public function model()
    {
        return User::class;
    }

}