<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;


class DatabaseSeeder extends Seeder
{

    use WithoutModelEvents;


    /**
     * Seed the application's database.
     */
    public function run(): void
{
    // 1. الإعدادات والكوبونات
    \App\Models\Setting::factory()->count(8)->create();
    \App\Models\Coupon::factory()->count(5)->create();

    // 2. أنواع الغرف والغرف الحقيقية
    \App\Models\RoomType::factory()->count(7)->create();
    \App\Models\Room::factory()->count(30)->create();

    // 3. الخدمات وربطها بالغرف
    $services = \App\Models\Service::factory()->count(11)->create();
    \App\Models\Room::all()->each(function ($room) use ($services) {
        $room->services()->attach(
            $services->random(rand(4, 8))->pluck('id')->toArray()
        );
    });

    // 4. الحجوزات
    \App\Models\Booking::factory()->count(15)->create();
}
}
