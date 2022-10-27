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
        'name',
        'title',
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
            'title' => 'required|string|max:255'
        ];
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
