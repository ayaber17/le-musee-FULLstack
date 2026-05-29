<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $table = 'coupons';

    protected $fillable = [
        'code',
        'discount_type',
        'discount_value',
        'start_date',
        'end_date',
        'usage_limit',
    ];

    // ✅ FIX: 'datetime' بدل 'date' باش end_date يبقى 23:59:59 وماشيش 00:00:00
    protected $casts = [
        'start_date' => 'datetime',
        'end_date'   => 'datetime',
    ];

    /**
     * تنقص usage_limit بواحد عند استعمال الكوبون
     */
    public function useCoupon(): void
    {
        if ($this->usage_limit > 0) {
            $this->decrement('usage_limit');
        }
    }

    /**
     * العلاقة مع الحجوزات
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'coupon_id');
    }

    /**
     * ✅ FIX: استعمل startOfDay / endOfDay باش يشمل كامل اليوم
     */
    public function isValid(): bool
    {
        $now = now();

        return $now->gte($this->start_date->copy()->startOfDay())
            && $now->lte($this->end_date->copy()->endOfDay())
            && $this->usage_limit > 0;
    }

    /**
     * ✅ FIX: Global scope يستعمل whereDate() باش يتجنب مشاكل الوقت
     */
    protected static function booted()
    {
        static::addGlobalScope('valid', function ($query) {
            $today = now()->toDateString();

            $query->whereDate('start_date', '<=', $today)
                    ->whereDate('end_date',   '>=', $today)
                    ->where('usage_limit', '>', 0);
        });
    }
}
