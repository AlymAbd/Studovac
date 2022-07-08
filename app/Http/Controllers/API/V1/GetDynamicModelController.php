<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\API\ApiModelController;

class GetDynamicModelController extends ApiModelController
{
    /**
     * Display resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function display(Request $request, String $folder, String $model)
    {
        try {
            $query = $request->all();
            $model = $this->getModel($folder, $model, $request->all())::select('*');
            $model = $this->modifySelect($model, $query);
            $model = $this->modifyOrder($model, $query);

            $queryFilters = array_filter($query, function ($key) {
                return in_array($key, ['where', 'whereOr', 'whereIn']);
            }, ARRAY_FILTER_USE_KEY);

            foreach($queryFilters as $key => $value) {
                switch ($key) {
                    case 'where':
                        $model = $this->modifyWhere($model, ['where' => $value]);
                        break;
                    case 'whereOr':
                        $model = $this->modifyWhereOr($model, ['whereOr' => $value]);
                        break;
                    case 'whereIn':
                        $model = $this->modifyWhereIn($model, ['whereIn' => $value]);
                        break;
                }
            }

            $model = $this->modifyScope($model, $query);
            $model = $model->simplePaginate(15);
        } catch (\Illuminate\Database\QueryException $e) {
            return abort(400, 'Wrong input data: '. $e);
        }
        return $model;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, String $folder, String $model, String $id)
    {
        try {
            $query = $request->all();
            $model = $this->getModel($folder, $model, $request->all());
            $model = $model::where('unique_name', $id);
            $model = $this->modifySelect($model, $query);
            $model = $model->firstOrFail();
        } catch (\Illuminate\Database\QueryException) {
            return abort(400, 'Wrong input data');
        }
        return ['data' => $model];
    }

    protected function modifySelect(Builder $eloq, Array $query): Builder
    {
        if (isset($query['fields'])) {
            $relation = [];
            foreach($query['fields'] as $ind => $field) {
                if (str_contains($field, '.')) {
                    $fields = explode('.', $field);
                    $relation[$fields[0]][] = $fields[1];
                    unset($query['fields'][$ind]);
                }
            }
            $eloq = $eloq->select(...$query['fields']);
            $eloq = $this->getRelation($eloq, $relation);
            return $eloq;
        } else {
            return $eloq->select('*');
        }
    }

    protected function getRelation(Builder $eloq, Array $query): Builder
    {
        foreach($query as $relation => $fields) {
            $eloq = $eloq->with([$relation.':id,'.implode(',', $fields)]);
        }
        return $eloq;
    }

    protected function modifyOrder(Builder $eloq, Array $query): Builder
    {
        if (isset($query['order_field'])) {
            return $eloq->orderBy($query['order_field'], ($query['order_destination'] ?? 'asc'));
        } else {
            return $eloq->orderBy('id');
        }
    }

    protected function modifyWhere(Builder $eloq, Array $query): Builder
    {
        if (isset($query['where'])) {
            foreach($query['where'] as $field => $value) {
                $eloq = $eloq->where($field, $value);
            }
        }
        return $eloq;
    }

    protected function modifyWhereOr(Builder $eloq, Array $query): Builder
    {
        if (isset($query['whereOr'])) {
            foreach($query['whereOr'] as $field => $value) {
                $eloq = $eloq->orWhere($field, $value);
            }
        }
        return $eloq;
    }

    protected function modifyWhereIn(Builder $eloq, Array $query): Builder
    {
        if (isset($query['whereIn'])) {
            foreach($query['whereIn'] as $field => $value) {
                $eloq = $eloq->whereIn($field, $value);
            }
        }
        return $eloq;
    }

    protected function modifyScope(Builder $eloq, Array $query): Builder
    {
        if (isset($query['modifier'])) {
            return $eloq->{$query['modifier']}($query['modifier_params'] ?: []);
        } else {
            return $eloq;
        }
    }
}