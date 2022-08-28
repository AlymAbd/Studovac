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
     * @return Validator|null
     */
    public function validate(
        Request|array $request,
        array $rules,
        array $messages = []
    ) {
        $request = $request instanceof Request ? $request->all() : $request;
        if (empty($request)) {
            abort(
                response()->json(['error' => 'no data to process'], 400)
            );
        }
        $messages = $messages ?: $this->getValidationMessages();

        $validation = $this->getValidator()::make($request, $rules, $messages);
        if ($validation->fails()) {
            abort(
                response()->json($validation->messages(), 400)
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

    /**
     * Standart messages
     */
    public function getValidationMessages(): array
    {
        return [
            'required' => 'Field :attribute is required',
            'string' => 'Field :attribute should be string',
            'numeric' => 'Field :attribute should be number',
            'email' => 'Field :attribute isn\'\t an email',
            'min' => 'Field :attribute should be minimum than :min',
            'max' => 'Field :attribute should be max than :max',
            'confirmed' => 'Field :attribute should be confirmed',
            'unique' => 'Field :attribute is not unique'
        ];
    }
}
