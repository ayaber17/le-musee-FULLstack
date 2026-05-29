<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SettingFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        // غادي نولدوا "مفتاح" عشوائي من الإعدادات المشهورة
        $key = fake()->unique()->randomElement([
            'hotel_name',
            'hotel_email',
            'hotel_phone',
            'hotel_address',
            'currency',
            'check_in_time',
            'check_out_time',
            'tax_rate'
        ]);

        // بناءً على الـ key، غادي نعطيو قيمة منطقية في الـ value
        $value = match ($key) {
            'hotel_name' => fake()->company() . ' Hotel & Spa',
            'hotel_email' => 'contact@' . fake()->domainName(),
            'hotel_phone' => fake()->phoneNumber(),
            'hotel_address' => fake()->address(),
            'currency' => fake()->randomElement(['MAD', 'USD', 'EUR']),
            'check_in_time' => '14:00',
            'check_out_time' => '12:00',
            'tax_rate' => fake()->randomElement(['10', '14', '20']), // النسبة المئوية للضريبة
            default => fake()->word(),
        };

        return [
            'key' => $key,
            'value' => $value,
        ];
    }
}
