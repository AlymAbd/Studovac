<?php

namespace App\Models\Course;

use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Model;

class Course extends Model
{
    use SoftDeletes;

    protected $table = 'courses';

    protected $fillable = [
        'name',
        'title',
        'description',
        'creator_id',
        'moderator_id',
        'active_from',
        'active_to',
        'checked_at',
        'deactivated_at',
        'path_to_photo',
        'style',
    ];

    protected $casts = [
        'active_from' => 'datetime',
        'active_to' => 'datetime',
        'deactivated_at' => 'datetime',
        'checked_at' => 'datetime'
    ];

    public function rules($params = null, $object = null): array
    {
        return [
            'create' => [
                'title' => 'required|string|max:255',
                'description' => 'nullable|string|max:65000',
                'moderator_id' => 'integer|exists:users,id',
                'active_from' => 'nullable|date|date_format:Y-m-d H:i:s',
                'active_to' => 'nullable|date|date_format:Y-m-d H:i:s',
                'deactivated_at' => 'nullable|date|date_format:Y-m-d H:i:s',
                'path_to_photo' => 'nullable|string|max:255',
                'style' => 'nullable|string|max:255',
                'checked_at' => 'date|date_format:Y-m-d H:i:s'
            ],
            'update' => [
                'title' => 'string|max:255',
                'description' => 'string|max:255',
                'active_from' => 'nullable|date|date_format:Y-m-d H:i:s',
                'active_to' => 'nullable|date|date_format:Y-m-d H:i:s',
                'deactivated_at' => 'nullable|date|date_format:Y-m-d H:i:s',
                'path_to_photo' => 'nullable|string|max:255',
                'style' => 'nullable|string|max:255',
                'checked_at' => 'date|date_format:Y-m-d H:i:s'
            ]
        ];
    }

    public function creator()
    {
        return $this->belongsTo('App\Models\User\User', 'creator_id');
    }

    public function moderator()
    {
        return $this->belongsTo('App\Models\User\User', 'moderator_id');
    }

    public function createModifierAfterValidation(array $query, $object = null): array
    {
        $query['creator_id'] = auth()->id();
        return $query;
    }
}
