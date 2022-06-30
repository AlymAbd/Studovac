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
            $model = $this->getModel($folder, $model)::select('*');
            $model = $this->modifySelect($model, $query);
            $model = $this->modifyOrder($model, $query);
            $model = $this->modifyScope($model, $query);
            $model = $model->simplePaginate(15);
        } catch (\Illuminate\Database\QueryException) {
            return abort(400, 'Wrong input data');
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
            $model = $this->getModel($folder, $model)::where('unique_name', $id);
            $model = $this->modifySelect($model, $query);
            $model = $this->modifyOrder($model, $query);
            $model = $this->modifyScope($model, $query);
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

    protected function modifyScope(Builder $eloq, Array $query): Builder
    {
        if (isset($query['modifier'])) {
            return $eloq->{$query['modifier']}($query['modifier_params'] ?: []);
        } else {
            return $eloq;
        }
    }
}