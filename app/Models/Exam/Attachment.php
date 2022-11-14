<?php

namespace App\Models\Exam;

use App\Models\Model;

class Attachment extends Model
{
    protected $table = 'exam_attachments';

    protected $fillable = [
        'name',
        'title',
        'filename',
        'file_type',
        'purpose',
        'path',
        'creator_id',
        'valid_to'
    ];

    public function rules($params = null, $object = null): array
    {
        return [
            'title' => 'string|required|max:255',
            'purpose' => 'string|required|max:100',
        ];
    }
}
