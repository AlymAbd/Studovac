<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\System\User;
use App\Models\System\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;

class VerificationCodeController extends Controller
{
    const COOLDOWN_SECONDS = 60;

    /**
     * Verify pin from email
     */
    public function verify(Request $request)
    {
        $validated = $this->validate($request, $this->rules('verify'))->validated();
        $password = PasswordReset::where('token', $validated['token'])->with('user');
        $password->whereHas('user', function ($query) {
            return $query->whereNull('email_verified_at');
        });
        $password = $password->firstOrFail();
        $password->user->email_verified_at = Carbon::now();
        $password->user->account_verified = true;
        $password->user->save();
        $password->delete();
        return response()->json(['message' => 'OK']);
    }

    /**
     * Resend pin verification
     */
    public function resend(Request $request)
    {
        // only superadmin can resend email verification somebody
        $data = $this->validate($request, $this->rules('resend'))->validated();
        if (!$request->user()->isAdmin()) {
            if (array_key_exists('email', $data)) {
                $data['email'] = request()->user()->email;
            } else if (array_key_exists('phone', $data)) {
                $data['phone'] = request()->user()->phone;
            }
        }

        $user = User::whereNull('email_verified_at');
        $type = null;
        if (array_key_exists('phone', $data) && isset($data['phone'])) {
            $user->where('phone', $data['phone']);
            $type = PasswordReset::TYPE_PHONE;
        } else if (array_key_exists('email', $data) && isset($data['email'])) {
            $user->where('email', $data['email']);
            $type = PasswordReset::TYPE_EMAIL;
        }
        $user = $user->with('passwordResets')
            ->firstOrFail();

        if (empty($user)) {
            return response()->json(['message' => 'user email already confirmed'], Response::HTTP_FORBIDDEN);
        }
        $now = new \DateTime;
        if (empty($user->passwordResets)) {
            $this->sendVerification($type, $user->id, $data['email'] ?? null, $data['phone'] ?? null);
            return response()->json(['message' => 'OK']);
        } else {
            if (($now->getTimestamp() - $user->passwordResets->created_at->getTimestamp()) < self::COOLDOWN_SECONDS) {
                return response()->json(['message' => 'to many requests, wait a bit'], Response::HTTP_TOO_MANY_REQUESTS);
            } else {
                $this->sendVerification($type, $user->id, $data['email'] ?? null, $data['phone'] ?? null);
                return response()->json(['message' => 'OK']);
            }
        }
    }

    /**
     * Verify email rule
     *
     * @return array
     */
    protected function rules(string $type = null): array
    {
        $rules = [
            'resend' => [
                'email' => ['required_without:phone', 'email', 'exists:users,email'],
                'phone' => ['required_without:email', 'exists:users,phone']
            ],
            'verify' => ['token' => ['required', 'string']]
        ];
        return empty($type) ? $rules : $rules[$type];
    }

    // todo: must be async
    protected function sendVerification($type, $userId, $email = null, $phone = null)
    {
        $token = PasswordReset::createResetToken($type, $userId);
        switch ($type) {
            case PasswordReset::TYPE_EMAIL:
                Mail::to($email)->send(new \App\Mail\EmailVerification($token->token));
        }
    }
}
