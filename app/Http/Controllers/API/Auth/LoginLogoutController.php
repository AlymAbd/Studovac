<?php

namespace App\Http\Controllers\API\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;

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
        $validated = array_filter($validated);
        $authState = Auth::attempt($validated);
        if ($authState == false) {
            return response()->json(['error' => 'wrong email or password'], Response::HTTP_FORBIDDEN);
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
    protected function rules($params = null, $object = null)
    {
        return [
            'email' => 'required_without:phone|email|max:255',
            'phone' => 'required_without:email',
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
