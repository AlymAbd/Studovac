<?php

namespace App\Http\Controllers\API\Auth\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;

class VerificationCodeController extends Controller
{
    /**
     * Verify pin from email
     */
    public function verify(Request $request, String $email, Int $pin)
    {
        $validated = $this->validate([
            'email' => $email,
            'pin_code' => $pin
        ], $this->rules())->validated();
        dd($validated);
    }

    /**
     * Resend pin verification
     */
    public function resend(Request $request, String $email)
    {
        $validated = $this->validate(['email' => $email], $this->rules())->validated();
        dd($validated);
    }

    /**
     * Verify email rule
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'email' => 'required|string|email|max:255',
            'pin_code' => 'number|max:9999|min:1000'
        ];
    }
}
