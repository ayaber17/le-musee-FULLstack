<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * الحساب الافتراضي للباسورد باش ما يبقاش يتكريا كل مرة ويتقل السيرفر
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        // غادي نحددوا واش أجنبي أولا لا بشكل عشوائي (True أو False)
        $isForeign = fake()->boolean();

        return [
            'nom' => fake()->lastName(),
            'prenom' => fake()->firstName(),
            'email' => fake()->unique()->safeEmail(),
            // كاع الأعضاء لي غايتكرياو غايكون الباسورد ديالهم هو كلمة: password
            'password' => static::$password ??= Hash::make('password'),
            'telephone' => fake()->phoneNumber(),

            // اختيار قيم عشوائية من الـ Enums لي حددتي في الـ Migration
            'role' => fake()->randomElement(['admin', 'staff', 'client']),
            'status' => fake()->randomElement(['active', 'inactive', 'banned']),

            'is_foreign' => $isForeign,
            // يلا كان أجنبي يعطيه رقم جواز سفر عشوائي، يلا كان مغربي يعطيه رقم بطاقة وطنية (مثال: AB123456)
            'cin_passport' => $isForeign ? fake()->bothify('??######') : fake()->bothify('?######'),

            'email_verified_at' => now(),
            'last_login' => fake()->optional()->dateTimeBetween('-1 month', 'now'),
            'avatar' => fake()->imageUrl(150, 150, 'users'), // رابط صورة وهمي
            'remember_token' => Str::random(10),
        ];
    }
}
