<?php

namespace App\Models\Course;

use App\Models\Model;
use Illuminate\Validation\Rule;

class Category extends Model
{
    protected $table = 'course_categories';

    protected $fillable = [
        'name',
        'title',
        'description',
        'parent_id',
        'icon'
    ];


    public function parentId()
    {
        return $this->belongsTo(self::class, 'parent_id', 'id');
    }

    public function relations()
    {
        return [
            'parent_id' => 'parentId'
        ];
    }

    public function rules($params = null, $object = null): array
    {
        return [
            'create' => [
                'title' => 'required|string|max:255',
                'description' => 'nullable|string|max:255',
                'parent_id' => 'nullable|exists:course_categories,id',
                'icon' => 'string|max:63|required'
            ],
            'update' => [
                'title' => 'string|max:255',
                'description' => 'string|max:255',
                'parent_id' => ['nullable', 'exists:course_categories,id', Rule::notIn([$object->id])],
                'icon' => 'string|max:63'
            ]
        ];
    }
}
