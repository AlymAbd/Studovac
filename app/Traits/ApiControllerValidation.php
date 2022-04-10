<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

trait ApiControllerValidation
{
    /**
     * Automatically return fail message
     *
     * @param Request $request
     * @param Array $rules
     * @param Array $messages
     * @return Validator||null
     */
    public function validate(
        Request|Array $request,
        Array $rules,
        Array $messages = []
    ) {
        $request = $request instanceof Request ? $request->all() : $request;
        if (empty($request)) {
            abort(
                response()->json(['error' => 'no data to process'], 401)
            );
        }

        $validation = $this->getValidator()::make($request, $rules, $messages);
        if ($validation->fails()) {
            abort(
                response()->json($validation->messages(), 401)
            );
        } else {
            return $validation;
        }
    }

    /**
     * Can be replaced by a custom Validator object with a custom rules
     *
     * @param Validator $validator
     * @return Validator
     */
    public function getValidator()
    {
        return Validator::class;
    }
}
