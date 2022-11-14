<?php

namespace App\Models\Exam;

use App\Models\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Exam extends Model
{
    use SoftDeletes;

    protected $table = 'exams';

    protected $fillable = [
        'name',
        'title',
        'active_from',
        'active_to',
        'description_for_teacher',
        'description_for_student',
        'duration_minutes',
        'calculation_type',
        'type',
        'exercise_limit',
        'creator_id',
        'level_logic_id'
    ];

    public function rules($params = null, $object = null): array
    {
        return [
            'create' => [
                'title' => 'string|required|max:255',
                'active_from' => 'date|required|date_format:Y-m-d H:i:s',
                'active_to' => 'date|required|date_format:Y-m-d H:i:s',
                'description_for_teacher' => 'string|max:500',
                'description_for_students' => 'string|required|max:500',
                'duration_minutes' => 'integer|max:300',
                'calculation_type' => 'string|in:typ1,typ2',
                'type' => 'in:typ1,typ2',
                'exercise_limit' => 'nullable|integer|max:100',
                'level_logic_id' => 'exists:exam_levels,id'
            ],
            'update' => [
                'title' => 'string|required|max:255',
                'active_to' => 'date|required|date_format:Y-m-d H:i:s',
                'description_for_teacher' => 'string|max:500',
                'description_for_students' => 'string|required|max:500',
                'duration_minutes' => 'integer|max:300',
                'calculation_type' => 'string|in:typ1,typ2',
                'type' => 'in:typ1,typ2',
                'exercise_limit' => 'nullable|integer|max:100',
                'level_logic_id' => 'exists:exam_levels,id'
            ]
        ];
    }
}
