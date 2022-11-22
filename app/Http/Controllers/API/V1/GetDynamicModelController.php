<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\API\ApiModelController;
use Illuminate\Database\Eloquent\RelationNotFoundException;

class GetDynamicModelController extends ApiModelController
{
    protected $paginate = 10;

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
            $model = $this->getModel($folder, $model, $request->all());
            $eloq = clone $model;
            $eloq = $eloq::select('*');
            $eloq = $this->modifySelect($eloq, $query, $model);
            $eloq = $this->modifyOrder($eloq, $query);

            $queryFilters = array_filter($query, function ($key) {
                return in_array($key, ['where', 'whereOr', 'whereIn']);
            }, ARRAY_FILTER_USE_KEY);

            foreach ($queryFilters as $key => $value) {
                switch ($key) {
                    case 'where':
                        $eloq = $this->modifyWhere($eloq, ['where' => $value]);
                        break;
                    case 'whereOr':
                        $eloq = $this->modifyWhereOr($eloq, ['whereOr' => $value]);
                        break;
                    case 'whereIn':
                        $eloq = $this->modifyWhereIn($eloq, ['whereIn' => $value]);
                        break;
                }
            }

            if (array_key_exists('limit', $query) && $query['limit'] < $model->getMaxLimit()) {
                $this->paginate = $query['limit'];
            }
            $eloq = $this->modifyScope($eloq, $query);
            $eloq = $eloq->paginate($this->paginate);
        } catch (\Illuminate\Database\QueryException $e) {
            return abort(400, 'Wrong input data: ' . $e);
        }
        return $eloq;
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
            $eloq = clone $model;
            $eloq = $eloq::where('name', $id);
            $eloq = $this->modifySelect($eloq, $query, $model);
            $eloq = $eloq->firstOrFail();
        } catch (\Illuminate\Database\QueryException) {
            return abort(400, 'Wrong input data');
        }
        return ['data' => $eloq];
    }

    protected function modifySelect(Builder $eloq, array $query, $model): Builder
    {
        //TODO TRY CATCH RelationNotFoundException
        if ($query['with'] ?? false) {
            return $eloq->with($query['with']);
        }
        if ($query['fields'] ?? false) {
            $relation = [];
            foreach ($query['fields'] as $ind => $field) {
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
            $model->relationHandler(function ($key, $relation) use (&$eloq) {
                $eloq->with([$relation]);
            });
            return $eloq->select('*');
        }
    }

    protected function getRelation(Builder $eloq, array $query): Builder
    {
        foreach ($query as $relation => $fields) {
            $eloq = $eloq->with([$relation . ':id,' . implode(',', $fields)]);
        }
        return $eloq;
    }

    protected function modifyOrder(Builder $eloq, array $query): Builder
    {
        if (isset($query['order_by'])) {
            return $eloq->orderBy($query['order_by'], ($query['order_dest'] ?? 'asc'));
        } else {
            return $eloq->orderBy('id');
        }
    }

    protected function modifyWhere(Builder $eloq, array $query): Builder
    {
        if (isset($query['where'])) {
            foreach ($query['where'] as $field => $value) {
                $fields = explode('.', $field);
                if (count($fields) > 1) {
                    $eloq->whereHas($fields[0], function ($query) use ($fields, $value) {
                        return $query->where($fields[1], $value);
                    });
                } else {
                    $eloq->where($field, $value);
                }
            }
        }
        return $eloq;
    }

    protected function modifyWhereRelation(Builder $eloq, array $query): Builder
    {
        if (isset($query['where'])) {
            foreach ($query['where'] as $field => $value) {
                $eloq = $eloq->where($field, $value);
            }
        }
        return $eloq;
    }

    protected function modifyWhereOr(Builder $eloq, array $query): Builder
    {
        if (isset($query['whereOr'])) {
            foreach ($query['whereOr'] as $field => $value) {
                $eloq = $eloq->orWhere($field, $value);
            }
        }
        return $eloq;
    }

    protected function modifyWhereIn(Builder $eloq, array $query): Builder
    {
        if (isset($query['whereIn'])) {
            foreach ($query['whereIn'] as $field => $value) {
                $eloq = $eloq->whereIn($field, $value);
            }
        }
        return $eloq;
    }

    protected function modifyScope(Builder $eloq, array $query): Builder
    {
        if (isset($query['modifier'])) {
            return $eloq->{$query['modifier']}($query['modifier_params'] ?: []);
        } else {
            return $eloq;
        }
    }
}
