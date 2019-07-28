<?php
namespace App\FxPro\Product\Models\Product\Criteria;

use App\FxPro\Core\Repositories\DB\Criteria;
use App\FxPro\Core\Repositories\DB\RepositoryInterface;
use Illuminate\Database\Eloquent\Builder;

class FilterCriteria extends Criteria {

    private $filterKey;
    private $order;
    private $sort;
    private $isActive;


    /**
     * FilterCriteria constructor.
     * @param $name
     * @param $order
     * @param $sort
     * @param $isActive
     */
    public function __construct($name, $order, $sort, $isActive)
    {
        $this->filterKey = $name;
        $this->order = $order;
        $this->sort = $sort;
        $this->isActive = $isActive;


    }


    /**
     * @param $model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply(Builder $model, RepositoryInterface $repository)
    {
        $model->where(function ($query) {
            $query->where('products.name', 'LIKE', '%' . $this->email . '%');
        });

        if ($this->isActive != '') {
            $model->where('products.is_active', "{$this->isActive}");
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