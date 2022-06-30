<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\API\ApiModelController;
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
        $model = $this->getModel($folder, $model);
        $requestData = $request->all();
        $requestData = $model->updateModifierBeforeValidation($requestData);
        $validated = $this->validate($requestData, $model->getRules())->validated();
        $requestData = $model->updateModifierBeforeValidation($validated);
        $result = $model::create($requestData);
        return response()->json(['data' => $result], Response::HTTP_CREATED);
    }
}