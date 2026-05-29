<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            // هاد السطر كيعني: يلا ما عطيناش يوزر، لارافيل غايكريي يوزر جديد تلقائياً ويربطو مع هاد الديتيلز
            'user_id' => User::factory(),

            // يعطي رقم بطاقة أو جواز سفر عشوائي فريد (Unique)
            'cin_passport' => fake()->unique()->bothify('??######'),

            'nationality' => fake()->country(),

            // تاريخ الازدياد عشوائي لشخص بين 18 و 60 سنة
            'dob' => fake()->dateTimeBetween('-60 years', '-18 years')->format('Y-m-d'),

            'adresse' => fake()->address(),
        ];
    }
}
