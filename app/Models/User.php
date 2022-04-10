<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes;

    /**
     * Access user types
     */
    const ACCESS_TYPES = ['guest', 'student', 'teacher', 'administrator'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'access_type',
        'deleted_at',
        'pin_code',
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
        'password',
        'remember_token',
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

    /**
     * If user is admin
     */
    public function isAdmin()
    {
        return $this->access_type == static::ACCESS_TYPES[3];
    }

    /**
     * If user is teacher
     */
    public function isTeacher()
    {
        return $this->access_type == static::ACCESS_TYPES[2];
    }

    /**
     * If user is student
     */
    public function isStudent()
    {
        return $this->access_type == static::ACCESS_TYPES[1];
    }

    public static function validateEmail($email, $token)
    {
        //
    }
}
