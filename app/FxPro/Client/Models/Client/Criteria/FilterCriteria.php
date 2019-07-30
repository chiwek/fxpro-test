<?php
namespace App\FxPro\Client\Models\Client\Criteria;

use App\FxPro\Core\Repositories\DB\Criteria;
use App\FxPro\Core\Repositories\DB\RepositoryInterface;
use App\FxPro\User\Models\Role\Role;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class FilterCriteria extends Criteria {

    private $filterKey;
    private $order;
    private $sort;
    private $isActive;
    private $email;


    /**
     * FilterCriteria constructor.
     * @param $name
     * @param $email
     * @param $order
     * @param $sort
     * @param $isActive
     */
    public function __construct($name, $email, $order, $sort, $isActive)
    {
        $this->filterKey = $name;
        $this->order = $order;
        $this->sort = $sort;
        $this->isActive = $isActive;

        $this->email = $email;
    }


    /**
     * @param $model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply(Builder $model, RepositoryInterface $repository)
    {
        $model->where(function ($query) {
            $query->where('clients.email', 'LIKE', '%' . $this->email . '%')
                ->orWhere('clients.firstname', 'LIKE', '%' . $this->filterKey . '%')
                ->orWhere('clients.lastname', 'LIKE', '%' . $this->filterKey . '%');
        });



        if ($this->isActive != '') {
            $model->where('clients.is_active', "{$this->isActive}");
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

        $user = Auth::user();

        if ($user->role_id == Role::REGULAR) {
            $model->where('user_id', $user->id);
        }
        return $model;
    }
}