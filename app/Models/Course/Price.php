<?php

namespace App\Models\Course;

use App\Models\Model;

class Price extends Model
{
    protected $table = 'course_prices';

    protected $fillable = [
        'unique_name',
        'title',
        'course_id',
        'currency',
        'price',
        'margin_percent',
        'valid_from',
        'valid_to',
    ];

    protected $casts = [
        'valid_from' => 'datetime',
        'valid_to' => 'datetime',
    ];

    public function rules(): array
    {
        return [
            'create' => [
                'title' => 'required|string|max:255',
                'course_id' => 'integer|exists:courses,id',
                'currency' => 'string|max:3',
                'price' => 'numeric|min:0',
                'margin_percent' => 'integer|min:0',
                'valid_from' => 'nullable|date|date_format:Y-m-d H:i:s',
                'valid_to' => 'nullable|date|date_format:Y-m-d H:i:s',
            ],
        ];
    }
}
