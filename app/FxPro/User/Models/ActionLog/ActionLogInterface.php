<?php
namespace App\FxPro\User\Models\ActionLog;


use App\FxPro\Core\Repositories\DB\RepositoryInterface;

interface ActionLogInterface extends RepositoryInterface
{
    public function filter($action, $order = 'action_logs.user_id', $sort = 'asc', $perPage = 10);

}