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
        $model = $this->getModel($folder, $model, $request->all());
        $object = $model::where('name', $id)->firstOrFail();
        $requestData = $model->updateModifierBeforeValidation($request->all());
        $validated = $this->validate($requestData, $model->getRules('update'))->validated();
        $requestData = $model->updateModifierAfterValidation($validated);
        $object->update($requestData);
        return $object;
    }
}
