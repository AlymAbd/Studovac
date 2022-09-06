<?php

namespace App\Models\System;

use App\Mail\EmailVerification;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\HasApiTokens;
use App\Traits\ModelApiTrait;
use Mail;
use App\Utils\Crypt;

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

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'unique_name',
        'title',
        'email',
        'phone',
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
        'pin_code'
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

    public static function createEmailVerification($email): array
    {
        $user = self::whereNull('email_verified_at')
            ->where('email', '=', $email)
            ->firstOrFail();
        if (empty($user)) {
            return [
                'status' => Response::HTTP_FORBIDDEN,
                'message' => ['message' => 'user email already confirmed']
            ];
        }

        $now = new \DateTime;
        $timediff = ($now->getTimestamp() - $user->updated_at->getTimestamp()) < 45;
        if (($user->created_at !== $user->updated_at) && $timediff) {
            return [
                'status' => Response::HTTP_FORBIDDEN,
                'message' => ['message' => 'too much requests']
            ];
        }
        $jwt = Crypt::encrypt(['email' => $user->email, 'pin' => $user->pin_code]);
        $user->pin_code = rand(1000, 9999);
        $user->save();
        return [
            'status' => Response::HTTP_OK,
            'token' => $jwt,
            'message' => 'OK'
        ];
    }

    public function rules(): array
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
                'phone' => ['numeric', 'min:8', 'unique:users,phone'],
                'password' => ['min:8', 'confirmed']
            ]
        ];
    }

    public function updateModifierAfterValidation(array $query): array
    {
        if (array_key_exists('password', $query)) {
            $query['password'] = \Hash::make($query['password']);
        }
        if (array_key_exists('phone', $query)) {
            $query['phone_verified_at'] = null;
        }
        return $query;
    }

    public function createModifierAfterValidation(array $query): array
    {
        $query['access_type'] = self::GUEST;
        $query['pin_code'] = rand(1000, 9999);
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
        return $this->hasOne(UserSettings::class, 'user_id');
    }
}
