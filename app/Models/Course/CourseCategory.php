<?php

namespace App\Models\Course;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Model;

class CourseCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'course_prices';

    protected $fillable = [
        'unique_name',
        'course_id',
        'currency',
        'price',
        'margin',
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
            'course_id' => 'exists:courses,id',
            'currency' => 'string|max:3',
            'price' => 'integer|min:0',
            'valid_from' => 'date',
            'valid_to' => 'date|after:valid_from',
        ];
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
