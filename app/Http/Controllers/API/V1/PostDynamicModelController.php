<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\API\ApiModelController;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PostDynamicModelController extends ApiModelController
{
    /**
     * Create a new record.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, String $folder, String $model)
    {
        $model = $this->getModel($folder, $model, $request->all());
        $requestData = $request->all();
        $requestData = $model->createModifierBeforeValidation($requestData);
        $requestData = $this->validate($requestData, $model->getRules('create'))->validated();
        $requestData = $model->createModifierAfterValidation($requestData);
        $requestData['unique_name'] = \App\Models\Model::generateUniqueName();
        $result = $model::create($requestData);
        return response()->json(['data' => $result], Response::HTTP_CREATED);
    }
}