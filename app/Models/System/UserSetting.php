<?php

namespace App\Models\System;

use App\Models\Model;

class UserSetting extends Model
{
    protected $table = 'user_settings';
    protected $filecol = 'path_to_photo';

    protected $hidden = [
        'id',
        'user_id'
    ];

    protected $fillable = [
        'name',
        'user_id',
        'settings',
        'path_to_photo'
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
        return $this->belongsTo(User::class, 'user_id');
    }

    public function rules($params = null, $object = null): array
    {
        return [
            'update' => [
                'settings' => ['required', 'array'],
            ],
            'create' => [
                'name' => ['unique:' . $this->getTable(), 'max:64'],
                'settings' => ['array'],
            ]
        ];
    }
}
