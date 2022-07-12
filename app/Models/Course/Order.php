<?php

namespace App\Models\Course;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
    ];
}
