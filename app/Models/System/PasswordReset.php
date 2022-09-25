<?php

namespace App\Models\System;

use Illuminate\Support\Str;
use App\Models\Model;

class PasswordReset extends Model
{
    protected $table = 'password_resets';
    const UPDATED_AT = null;
    const TYPE_EMAIL = 'email';
    const TYPE_PHONE = 'phone';

    protected $fillable = [
        'user_id',
        'type',
        'token'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Return random string
     */
    public static function createResetToken(String $type = 'email', Int $userId)
    {
        self::where('user_id', $userId)->delete();
        return self::create([
            'type' => $type,
            'user_id' => $userId,
            'token' => Str::random(99)
        ]);
    }
}
