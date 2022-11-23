<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\ModelApiTrait;
use Illuminate\Validation\Rule;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes, ModelApiTrait;

    /**
     * Access user types
     */
    const GUEST = 'guest';
    const STUDENT = 'student';
    const TEACHER = 'teacher';
    const ADMIN = 'administrator';

    const MAX_LIMIT = 50;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'title',
        'email',
        'phone',
        'password',
        'access_type',
        'deleted_at',
        'email_verified_at',
        'phone_verified_at',
        'account_verified'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'password',
        'remember_token'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    protected $relations = [
        'settings' => 'settings',
        'passwordResets' => 'passwordResets'
    ];

    /**
     * If user is admin
     */
    public function isAdmin()
    {
        return $this->access_type == static::ADMIN;
    }

    /**
     * If user is teacher
     */
    public function isTeacher()
    {
        return $this->access_type == static::TEACHER;
    }

    /**
     * If user is student
     */
    public function isStudent()
    {
        return $this->access_type == static::STUDENT;
    }

    public static function validateEmail($email, $token)
    {
        //
    }

    public function rules($params, $object): array
    {
        return [
            'create' => [
                'title' => ['required', 'string', 'max:50'],
                'phone' => ['regex:/[0-9]/', 'min:7', 'unique:users,phone'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'min:8', 'confirmed']
            ],
            'update' => [
                'title' => ['string', 'max:50'],
                'phone' => ['numeric', 'min:8', 'unique:users,phone,' . $object->id, "nullable"],
                'password' => ['min:8', 'confirmed'],
                'access_type' => Rule::in(array_keys($this->getRoles()))
            ]
        ];
    }

    public function updateModifierAfterValidation(array $query, $object = null): array
    {
        if (array_key_exists('password', $query)) {
            $query['password'] = \Hash::make($query['password']);
        }
        if (array_key_exists('phone', $query)) {
            $query['phone_verified_at'] = null;
        }
        return $query;
    }

    public function createModifierAfterValidation(array $query, $object = null): array
    {
        $query['access_type'] = self::GUEST;
        $query['password'] = bcrypt($query['password']);
        return $query;
    }

    public static function getRoles(): array
    {
        return [
            self::GUEST => 'Guest',
            self::STUDENT => 'Student',
            self::TEACHER => 'Teacher',
            self::ADMIN => 'Administrator'
        ];
    }

    public function settings()
    {
        return $this->hasOne(UserSetting::class, 'user_id');
    }

    public function passwordResets()
    {
        return $this->hasOne(PasswordReset::class, 'user_id');
    }

    public function getMaxLimit()
    {
        return self::MAX_LIMIT;
    }
}
