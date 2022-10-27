<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\API\ApiModelController;

class DeleteDynamicModelController extends ApiModelController
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request, String $folder, String $model, String $id)
    {
        $model = $this->getModel($folder, $model, $request->all());
        $permanent = $request->input('permanent', false);
        $object = $model::where('name', $id)->firstOrFail();
        if ($permanent) {
            $object->forceDelete();
        } else {
            $object->delete();
        }
        return ['data' => ['status' => true]];
    }
}
