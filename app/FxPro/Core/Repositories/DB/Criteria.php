<?php
namespace App\FxPro\Core\Repositories\DB;


use Illuminate\Database\Eloquent\Builder;

abstract class Criteria {

    /**
     * @param Builder $model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public abstract function apply(Builder $model, RepositoryInterface $repository);
}