<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\System\User;
use Illuminate\Http\Request;

class VerificationCodeController extends Controller
{
    /**
     * Verify pin from email
     */
    public function verify(Request $request)
    {
        $validated = $this->validate($request, $this->rules())->validated();
        dd($validated);
    }

    /**
     * Resend pin verification
     */
    public function resend(Request $request)
    {
        $validated = $this->validate($request, ['email' => ['required', 'email', 'exists:users,email']])->validated();
        User::sendVerificationEmail($validated['email']);
    }

    /**
     * Verify email rule
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'hash' => 'required|string',
        ];
    }
}
