<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\API\ApiModelController;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RegisterController extends ApiModelController
{
    public function store(Request $request)
    {
        $requestData = $request->all();
        $model = new \App\Models\System\User;
        $requestData = $model->createModifierBeforeValidation($requestData);
        $requestData = $this->validate($requestData, $model->getRules('create'))->validated();
        $requestData = $model->createModifierAfterValidation($requestData);
        $requestData['unique_name'] = \App\Models\Model::generateUniqueName();
        $result = $model::create($requestData);
        return response()->json(['data' => $result], Response::HTTP_CREATED);
    }
}
