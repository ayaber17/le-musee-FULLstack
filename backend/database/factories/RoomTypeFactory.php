<?php

namespace Database\Factories;

use App\Models\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomTypeFactory extends Factory
{
    protected $model = RoomType::class;

    protected static int $index = 0;


    public function definition(): array
    {
        $roomTypesData = [
            [
                'name' => 'Chambre Standard – Simple ou Double',
                'capacity_adult' => 2,
                'capacity_children' => 0,
                'bed_number' => 1,
                'base_price' => 450.00,
                'description' => 'Idéales pour un séjour confortable à deux ou en solo, offrant une surface d’environ 20 m² avec une agréable vue sur la terrasse.',
            ],
            [
                'name' => 'Chambre Supérieure – Simple ou Double',
                'capacity_adult' => 2,
                'capacity_children' => 0,
                'bed_number' => 1,
                'base_price' => 600.00,
                'description' => 'Spacieuses, lumineuses et décorées avec élégance, d’environ 25 m² avec une belle vue sur la ville.',
            ],
            [
                'name' => 'Chambre Supérieure –  Lits Jumeaux',
                'capacity_adult' => 2,
                'capacity_children' => 0,
                'bed_number' => 2,
                'base_price' => 650.00,
                'description' => 'Idéales pour deux personnes souhaitant dormir séparément, disposent de deux lits simples avec vue sur la ville.',
            ],
            [
                'name' => 'Chambre Triple Standard',
                'capacity_adult' => 3,
                'capacity_children' => 1,
                'bed_number' => 3,
                'base_price' => 800.00,
                'description' => 'Conçues pour accueillir jusqu’à trois personnes, offrent un espace confortable de 20 à 25 m², idéal pour un séjour entre amis ou en famille.',
            ],
            [
                'name' => 'Chambre Triple Supérieure',
                'capacity_adult' => 3,
                'capacity_children' => 1,
                'bed_number' => 3,
                'base_price' => 900.00,
                'description' => 'Espace confortable d’environ 25 m², idéal pour un séjour en famille, bénéficient d’une agréable vue sur le musée.',
            ],
            [
                'name' => 'Suite Junior avec Grand Balcon – Vue sur Rabat',
                'capacity_adult' => 3,
                'capacity_children' => 1,
                'bed_number' => 2,
                'base_price' => 1300.00,
                'description' => 'Située au 5 ᵉ et dernier étage, espace raffiné de 40 m² avec un grand balcon privé donnant sur une vue exceptionnelle de la ville de Rabat.',
            ],
            [
                'name' => 'Suite Familiale avec Grande Terrasse – Vue sur Rabat',
                'capacity_adult' => 5,
                'capacity_children' => 2,
                'bed_number' => 3,
                'base_price' => 1800.00,
                'description' => 'Superficie généreuse de 50 m², comprend deux chambres séparées, un espace salon indépendant et une grande terrasse meublée.',
            ],
        ];

        $current = $roomTypesData[self::$index % count($roomTypesData)];
        self::$index++;

        return [
            'name' => $current['name'],
            'capacity_adult' => $current['capacity_adult'],
            'capacity_children' => $current['capacity_children'],
            'bed_number' => $current['bed_number'],
            'base_price' => $current['base_price'],
            'description' => $current['description'],
        ];
    }
}
