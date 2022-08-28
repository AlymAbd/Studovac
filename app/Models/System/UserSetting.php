<?php

namespace App\Models\System;

use App\Models\Model;

class UserSetting extends Model
{
    protected $table = 'user_settings';

    protected $fillable = [
        'user_id',
        'settings',
    ];

    protected $casts = [
        'settings' => 'object'
    ];

    protected $accessType = [
        self::API_ACCESS_TYPE_WRITE,
        self::API_ACCESS_TYPE_READ,
        self::API_ACCESS_TYPE_CREATE
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
}
