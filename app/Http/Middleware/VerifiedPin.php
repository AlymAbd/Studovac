<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifiedPin
{
    /**
     * Handle incoming request
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        $user = auth()->user();

        if (!!!empty($user) && $user->email_verified_at == null) {
            return response()->json(['Error' => 'Your email or phone is not verified'], 403);
        } else {
            return $response;
        }
    }
}
