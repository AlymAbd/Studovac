<?php

namespace App\Http\Controllers\API\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class LoginLogoutController extends Controller
{
    /**
     * Login method by email
     *
     * @param Request $request
     * @return response
     */
    public function login(Request $request)
    {
        $validated = $this->validate($request, $this->rules())->validated();
        $authState = Auth::attempt($validated);
        if ($authState == false) {
            return response()->json(['error' => 'wrong email or password'], 401);
        }
        $user = Auth::user();
        $this->removeTokens();
        $user['token'] = $user->createToken('auth_token')->plainTextToken;
        return response()->json($user);
    }

    /**
     * Remove tokens by current auth session
     *
     * @param null
     * @return response
     */
    public function logout()
    {
        return response()->json([
            'deleted' => $this->removeTokens()
        ]);
    }

    /**
     * Obtain access token
     */
    public function token()
    {
        $user = Auth::user();
        $this->removeTokens();
        return response()->json(['token' => $user->createToken('auth_token')->plainTextToken]);
    }

    /**
     * Standart auth rules
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'email' => 'required|string|email|max:255',
            'password' => 'required|min:8',
        ];
    }

    /**
     * Remove tokens
     */
    protected function removeTokens()
    {
        return Auth::user()->tokens()->delete();
    }
}
