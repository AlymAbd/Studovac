<?php

namespace App\Models\Course;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'name',
        'course_id',
        'price_id',
        'buyer_id',
        'discount_id',
        'is_paid',
        'order_status',
    ];

    public function rules($params = null, $object = null): array
    {
        return [
            'create' => [
                'course_id' => 'exists:courses,id',
                'price_id' => 'exists:course_prices,id',
                'buyer_id' => 'exists:users,id',
                'discount_id' => 'exists:course_price_discounts,id',
            ],
        ];
    }
}
