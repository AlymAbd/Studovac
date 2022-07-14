<?php

namespace App\Models\Course;

use App\Models\Model;

class Category extends Model
{
    protected $table = 'course_categories';

    protected $fillable = [
        'unique_name',
        'title',
        'description',
        'parent_id',
        'icon'
    ];

    public function rules(): array
    {
        return [
            'create' => [
                'title' => 'required|string|max:255',
                'description' => 'nullable|string|max:255',
                'parent_id' => 'nullable|integer|exists:course_categories,id',
                'icon' => 'string|max:63'
            ],
            'update' => [
                'title' => 'string|max:255',
                'description' => 'string|max:255',
                'parent_id' => 'nullable|integer|exists:course_categories,id',
                'icon' => 'string|max:63'
            ]
        ];
    }
}
