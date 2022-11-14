<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\API\ApiModelController;

class PutDynamicModelController extends ApiModelController
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, String $folder, String $model, String $id)
    {
        $requestData = $request->all();
        $model = $this->getModel($folder, $model, $requestData);
        $object = $model::where('name', $id)->firstOrFail();
        $requestData = $model->updateModifierBeforeValidation($requestData, $object);
        $requestData = $this->validate($requestData, $model->getRules('update', $requestData, $object))->validated();
        $requestData = $model->updateModifierAfterValidation($requestData, $object);
        $object->update($requestData);
        $object = $model->afterUpdate($request->all(), $requestData, $object);
        return $object;
    }
}
