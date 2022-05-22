<?php

namespace App\Http\Controllers\API;

use Eloquent;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\Controller;

class ApiModelController extends Controller
{
    const MODEL_PATH = '\App\Models';

    protected function getModel(Eloquent $eloq, String $model)
    {
        $modelPath = $this->MODEL_PATH.'\\'.$model;
        if ($modelPath instanceof Model) {
            dd($modelPath);
        }
        return ;
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
