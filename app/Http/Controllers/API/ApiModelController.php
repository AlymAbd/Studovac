<?php

namespace App\Http\Controllers\API;

use Eloquent;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\Controller;

class ApiModelController extends Controller
{
    const MODEL_PATH = '\App\Models';

    protected function getModel(String $folder, String $model)
    {
        $modelPath = $this->transformName($folder, $model);
        if (class_exists($modelPath)) {
            return $modelPath::select('*');
        } else {
            $this->failTo404();
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

    protected function failTo404()
    {
        return abort(404, 'Model not found');
    }

    protected function getSelect(Eloquent $eloq, String $query)
    {
        //
    }

    protected function getWhere(Eloquent $eloq, String $query)
    {
        //
    }

    protected function getOrder(Eloquent $eloq, String $query)
    {
        //
    }

    protected function getModifier(Model $model, String $modifier, array $params = null)
    {
        //
    }
}
