<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Mail\EmailVerification;
use App\Models\System\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;

class VerificationCodeController extends Controller
{
    /**
     * Verify pin from email
     */
    public function verify(Request $request)
    {
        $validated = $this->validate($request, $this->rules('verify'))->validated();
        dd($validated);
    }

    /**
     * Resend pin verification
     */
    public function resend(Request $request)
    {
        // only superadmin can resend email verification somebody
        if ($request->user()->isAdmin()) {
            $data = $this->validate($request, $this->rules('resend'))->validated();
        } else {
            $data = ['email' => request()->user()->email];
        }
        $data = User::createEmailVerification($data['email']);
        if ($data['status'] === Response::HTTP_OK) {
            Mail::to($request->user()->email)->send(new \App\Mail\EmailVerification($data['token']));
        }
        return response()->json($data['message'], $data['status']);
    }

    /**
     * Verify email rule
     *
     * @return array
     */
    protected function rules(string $type = null): array
    {
        $rules = [
            'resend' => ['email' => ['required', 'email', 'exists:users,email']],
            'verify' => ['hash' => ['required', 'string']]
        ];
        return empty($type) ? $rules : $rules[$type];
    }
}
