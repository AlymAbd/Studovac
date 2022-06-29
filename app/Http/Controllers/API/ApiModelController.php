<?php

namespace App\Http\Controllers\API;

use Eloquent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;

class ApiModelController extends Controller
{
    const MODEL_PATH = '\App\Models';
    protected $offset = 0;
    protected $limit = 50;

    protected function getModel(Array $query, String $folder, String $model)
    {
        $modelPath = $this->transformName($folder, $model);
        if (class_exists($modelPath)) {
            $model = $modelPath::select('*');
            $model = $this->modifySelect($model, $query);
            $model = $this->modifyOrder($model, $query);
            $model = $this->modifyScope($model, $query);
            return $model;
        } else {
            return abort(404, 'Model not found');
        }
        return;
    }

    protected function transformName($folder, $model)
    {
        $model = explode('-', $model);
        $model = implode("", array_map(function($row) {
            return ucfirst($row);
        }, $model));
        $modelPath = self::MODEL_PATH.'\\'.ucfirst($folder).'\\'.ucfirst($model);
        return $modelPath;
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
