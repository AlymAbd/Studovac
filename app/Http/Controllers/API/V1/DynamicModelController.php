<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\API\ApiModelController;

class DynamicModelController extends ApiModelController
{
    const MAX_LIMIT = 1000;

    protected $modelClass = null;
    protected $modelQuery = null;

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function display(Request $request, String $folder, String $model)
    {
        $this->modelClass = $this->getModel($request->all(), $folder, $model);
        return [
            'result' => $this->modelClass->simplePaginate(15)
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, String $folder, String $model, String $id)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, String $folder, String $model, String $id)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request, String $folder, String $model, String $id)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, String $folder, String $model, String $id)
    {
        //
    }
}
