<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RoomTypesSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('room_types')->truncate();

        $types = [
            [
                'name' => 'Chambre Standard',
                'base_price' => 950.00,
                'capacity_adult' => 2,
                'capacity_children' => 1,
                'bed_number' => 1,
                'description' => 'Classic Heritage Room: A timeless sanctuary blending Moroccan craftsmanship with modern minimalism.',
                // 'image' => '/images/ch1.webp' // إلا زدتي هاد الكولون فـ migration
            ],
            [
                'name' => 'Chambre Supérieure',
                'base_price' => 1100.00,
                'capacity_adult' => 2,
                'capacity_children' => 1,
                'bed_number' => 1,
                'description' => 'Luxury Museum Suite: Panoramic views with a private sun-drenched terrace.',
            ],
            [
                'name' => 'Chambre Triple Standard',
                'base_price' => 1300.00,
                'capacity_adult' => 3,
                'capacity_children' => 1,
                'bed_number' => 1,
                'description' => 'Spacious Standard Triple room for small families.',
            ],
            [
                'name' => 'Chambre Triple Supérieure',
                'base_price' => 1350.00,
                'capacity_adult' => 3,
                'capacity_children' => 1,
                'bed_number' => 3,
                'description' => 'Premium Triple room with three separate beds.',
            ],
            [
                'name' => 'Suite Junior',
                'base_price' => 1400.00,
                'capacity_adult' => 2,
                'capacity_children' => 1,
                'bed_number' => 1,
                'description' => 'Junior Executive Suite: Refined ambiance for a luxury experience.',
            ],
            [
                'name' => 'Suite Familiale',
                'base_price' => 1800.00,
                'capacity_adult' => 2,
                'capacity_children' => 2,
                'bed_number' => 2,
                'description' => 'Royal Family Suite: Exquisite space designed for families who value privacy.',
            ],
        ];

        foreach ($types as $type) {
            DB::table('room_types')->insert(array_merge($type, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        Schema::enableForeignKeyConstraints();
    }
}
