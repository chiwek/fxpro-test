<?php
namespace App\FxPro\User\Models\User\Criteria;

use App\FxPro\Core\Repositories\DB\Criteria;
use App\FxPro\Core\Repositories\DB\RepositoryInterface;
use Illuminate\Database\Eloquent\Builder;

class FilterCriteria extends Criteria {

    private $filterKey;
    private $order;
    private $sort;
    private $isActive;
    private $username;
    private $type;


    public function __construct($name, $username, $type, $order, $sort, $isActive)
    {
        $this->filterKey = $name;
        $this->order = $order;
        $this->sort = $sort;
        $this->isActive = $isActive;

        $this->username = $username;
        $this->type = $type;
    }


    /**
     * @param $model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply(Builder $model, RepositoryInterface $repository)
    {
        $model->where(function ($query) {
            $query->where('users.email', 'LIKE', '%' . $this->filterKey . '%')
                ->orWhere('users.firstname', 'LIKE', '%' . $this->filterKey . '%')
                ->orWhere('users.lastname', 'LIKE', '%' . $this->filterKey . '%');
        });

        $model->where('users.username', 'LIKE', '%' . $this->username . '%');

        if ($this->isActive != '') {
            $model->where('users.is_active', "{$this->isActive}");
        }

        if ($this->type > 0) {
            $model->where('users.role_id', $this->type);
        }

        if (is_array($this->order)) {
            foreach ($this->order as $k => $value) {
                if ($value != '' && $value != 'none') {
                    $model->orderBy($this->order[$k], $this->sort[$k]);
                }
            }
        } else {
            $model->orderBy($this->order, $this->sort);
        }

        return $model;
    }
}