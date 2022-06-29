<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\API\ApiModelController;

class GetDynamicModelController extends ApiModelController
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function display(Request $request, String $folder, String $model)
    {
        $query = $request->all();
        $model = $this->getModel($folder, $model);
        $model = $this->modifySelect($model, $query);
        $model = $this->modifyOrder($model, $query);
        $model = $this->modifyScope($model, $query);

        return [
            'result' => $model->simplePaginate(15)
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, String $folder, String $model, String $id)
    {
        //
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

    protected function modifyScope(Builder $eloq, Array $query): Builder
    {
        if (isset($query['modifier'])) {
            return $eloq->{$query['modifier']}($query['modifier_params'] ?: []);
        } else {
            return $eloq;
        }
    }
}