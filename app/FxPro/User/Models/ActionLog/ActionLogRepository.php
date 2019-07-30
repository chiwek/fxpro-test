<?php
namespace App\FxPro\User\Models\ActionLog;

use App\FxPro\Core\Repositories\DB\Repository;


use App\FxPro\User\Models\User\Criteria\FilterCriteria;

use Illuminate\Database\Eloquent\Collection;



class ActionLogRepository extends Repository implements ActionLogInterface
{

    /**
     * @param $filterKey
     * @param null $roleKey
     * @param string $orderKey
     * @param string $orderDirection
     * @param int $paginate
     * @return Collection
     */
    public function filter($action, $order = 'action_logs.user_id', $sort = 'asc', $perPage = 10)
    {
        $this->pushCriteria(new FilterCriteria($action, $order, $sort));

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