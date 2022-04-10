<?php

namespace App\Http\Controllers\API\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Hash;

class RegisterController extends Controller
{
    /**
     * Registering user
     *
     * @param Request $request
     * @return response
     */
    public function register(Request $request)
    {
        $validation = $this->validate($request, $this->rules())->validated();
        $validation['access_type'] = 'guest';
        $validation['password'] = Hash::make($validation['password']);
        $validation['pin_code'] = random_int(1000, 9999);
        $user = User::create($validation);
        return response()->json($user);
    }

    /**
     * Validation rules
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:50',
            'phone' => 'required_without:email|number|email|max:9|unique:users,phone',
            'email' => 'required_without:phone|string|email|max:255|unique:users',
            'password' => 'required|min:8',
        ];
    }
}
