<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        // نحددوا نوع الخصم عشوائياً
        $discountType = fake()->randomElement(['percent', 'fixed']);

        // بناءً على النوع، نحددوا قيمة الخصم (مثلاً: بين 5% و 50%، أو بين 50 و 500 درهم ثابثة)
        $discountValue = $discountType === 'percent'
            ? fake()->randomElement([5, 10, 15, 20, 30, 50])
            : fake()->numberBetween(50, 500);

        // باش الكوبونات يجيو "صالحين للاستعمال" والـ Global Scope يقرأهم
        $startDate = fake()->dateTimeBetween('-1 week', 'now');
        $endDate = fake()->dateTimeBetween('+1 week', '+3 months');

        return [
            // كود الكوبون غيكون بحال: RAMADAN2026 أو PROMO10X (حروف كبيرة)
            'code' => strtoupper(fake()->randomLetter() . fake()->randomLetter() . fake()->randomLetter() . fake()->numberBetween(10, 99)),
            'discount_type' => $discountType,
            'discount_value' => $discountValue,
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
            'usage_limit' => fake()->numberBetween(10, 200), // عدد مرات الاستعمال المتاحة
        ];
    }
}
