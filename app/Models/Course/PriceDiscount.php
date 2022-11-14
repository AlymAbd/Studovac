<?php

namespace App\Models\Course;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Model;

class PriceDiscount extends Model
{
    protected $table = 'course_price_discounts';

    protected $fillable = [
        'name',
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

    public function rules($params = null, $object = null): array
    {
        return [
            'create' => [
                'title' => 'required|string|max:255',
                'course_id' => 'integer|exists:courses,id',
                'currency' => 'string|max:3',
                'price' => 'numeric|min:0',
                'valid_from' => 'nullable|date|date_format:Y-m-d H:i:s',
                'valid_to' => 'nullable|date|date_format:Y-m-d H:i:s',
            ],
            'update' => [
                'valid_to' => 'nullable|date|date_format:Y-m-d H:i:s|gte',
            ]
        ];
    }
}
