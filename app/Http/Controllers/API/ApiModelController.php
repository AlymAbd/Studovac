<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;

class ApiModelController extends Controller
{
    const MODEL_PATH = '\App\Models';
    const MAX_LIMIT = 1000;

    protected $offset = 0;
    protected $limit = 50;
    protected $modelClass = null;
    protected $modelQuery = null;

    protected function getModel(String $folder, String $model, Array $query)
    {
        $modelPath = $this->transformName($folder, $model);
        if (class_exists($modelPath)) {
            return new $modelPath;
        } else {
            return abort(Response::HTTP_NOT_FOUND, 'Model not found');
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
}
