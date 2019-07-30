<?php
namespace App\FxPro\User\Models\ActionLog\Criteria;

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


    public function __construct($name, $order, $sort)
    {
        $this->filterKey = $name;
        $this->order = $order;
        $this->sort = $sort;

    }


    /**
     * @param $model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply(Builder $model, RepositoryInterface $repository)
    {

        $model->where(function ($query) {
            $query->where('action_logs.action', 'LIKE', '%' . $this->filterKey . '%');
        });

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