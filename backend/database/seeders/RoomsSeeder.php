<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RoomType;
use App\Models\Room;

class RoomsSeeder extends Seeder
{
    /**
     * البيانات مأخوذة من Chambre_Standard.docx
     *
     * أنواع الغرف:
     * ┌─────────────────────────────────────┬───────────┬────────────────────────────────────────────────────────────────┐
     * │ النوع                               │ العدد     │ الأرقام                                                        │
     * ├─────────────────────────────────────┼───────────┼────────────────────────────────────────────────────────────────┤
     * │ Chambre Standard – Simple ou Double │ 11        │ 106,107,205,206,207,306,307,406,407,503,504                    │
     * │ Chambre Standard – Lits Jumeaux     │ 0         │ —                                                              │
     * │ Chambre Supérieure – Simple/Double  │ 4         │ 104,401,402,404                                                │
     * │ Chambre Supérieure – Lits Jumeaux   │ 11        │ 101,102,103,201,202,203,204,301,302,303,403                    │
     * │ Chambre Triple Standard             │ 3         │ 105,305,405                                                    │
     * │ Chambre Triple Supérieure           │ 1         │ 304                                                            │
     * │ Suite Junior                        │ 1         │ 501                                                            │
     * │ Suite Familiale                     │ 1         │ 502                                                            │
     * └─────────────────────────────────────┴───────────┴────────────────────────────────────────────────────────────────┘
     */
    public function run(): void
    {
        // ── 1. Room Types ──────────────────────────────────────────────────────
        $types = [
            [
                'name'               => 'Chambre Standard',
                'description'        => 'Chambre confortable avec vue sur le patio, idéale pour un séjour en solo ou en couple. Décoration sobre et élégante dans un esprit musée.',
                'base_price'         => 650.00,
                'bed_number'         => 1,
                'capacity_adult'     => 2,
                'capacity_children'  => 0,
            ],
            [
                'name'               => 'Chambre Standard – Lits Jumeaux',
                'description'        => 'Chambre standard aménagée avec deux lits séparés, parfaite pour deux voyageurs souhaitant leur propre espace.',
                'base_price'         => 650.00,
                'bed_number'         => 2,
                'capacity_adult'     => 2,
                'capacity_children'  => 0,
            ],
            [
                'name'               => 'Chambre Supérieure',
                'description'        => 'Chambre plus spacieuse avec finitions soignées, mobilier artisanal marocain et salle de bain de luxe.',
                'base_price'         => 850.00,
                'bed_number'         => 1,
                'capacity_adult'     => 2,
                'capacity_children'  => 1,
            ],
            [
                'name'               => 'Chambre Supérieure – Lits Jumeaux',
                'description'        => 'Version lits jumeaux de la Chambre Supérieure. Espace généreux, décoration raffinée et vue dégagée.',
                'base_price'         => 850.00,
                'bed_number'         => 2,
                'capacity_adult'     => 2,
                'capacity_children'  => 1,
            ],
            [
                'name'               => 'Chambre Triple Standard',
                'description'        => 'Idéale pour les familles ou groupes de trois, avec trois lits confortables et tout le nécessaire pour un séjour agréable.',
                'base_price'         => 1050.00,
                'bed_number'         => 3,
                'capacity_adult'     => 3,
                'capacity_children'  => 1,
            ],
            [
                'name'               => 'Chambre Triple Supérieure',
                'description'        => 'Triple chambre de standing supérieur avec mobilier sélectionné, grande salle de bain et vue sur les toits de la médina.',
                'base_price'         => 1250.00,
                'bed_number'         => 3,
                'capacity_adult'     => 3,
                'capacity_children'  => 2,
            ],
            [
                'name'               => 'Suite Junior',
                'description'        => 'Suite élégante avec espace salon séparé, décoration exclusive et prestations haut de gamme. Un havre de paix au cœur du musée.',
                'base_price'         => 1800.00,
                'bed_number'         => 1,
                'capacity_adult'     => 2,
                'capacity_children'  => 1,
            ],
            [
                'name'               => 'Suite Familiale',
                'description'        => 'Notre plus grande suite, conçue pour les familles. Deux chambres communicantes, salon privé et vue panoramique sur la ville.',
                'base_price'         => 2200.00,
                'bed_number'         => 2,
                'capacity_adult'     => 4,
                'capacity_children'  => 2,
            ],
        ];

        foreach ($types as $typeData) {
            RoomType::firstOrCreate(['name' => $typeData['name']], $typeData);
        }

        // ── 2. Rooms ───────────────────────────────────────────────────────────
        // كل غرفة: [num_room, type_name]
        // رقم الطابق مشتاق من أول رقم فـ num_room (101 → طابق 1، 501 → طابق 5)
        $rooms = [
            // Chambre Standard – Simple ou Double (11 غرفة)
            ['106', 'Chambre Standard'],
            ['107', 'Chambre Standard'],
            ['205', 'Chambre Standard'],
            ['206', 'Chambre Standard'],
            ['207', 'Chambre Standard'],
            ['306', 'Chambre Standard'],
            ['307', 'Chambre Standard'],
            ['406', 'Chambre Standard'],
            ['407', 'Chambre Standard'],
            ['503', 'Chambre Standard'],
            ['504', 'Chambre Standard'],

            // Chambre Supérieure – Simple ou Double (4 غرف)
            ['104', 'Chambre Supérieure'],
            ['401', 'Chambre Supérieure'],
            ['402', 'Chambre Supérieure'],
            ['404', 'Chambre Supérieure'],

            // Chambre Supérieure – Lits Jumeaux (11 غرفة)
            ['101', 'Chambre Supérieure – Lits Jumeaux'],
            ['102', 'Chambre Supérieure – Lits Jumeaux'],
            ['103', 'Chambre Supérieure – Lits Jumeaux'],
            ['201', 'Chambre Supérieure – Lits Jumeaux'],
            ['202', 'Chambre Supérieure – Lits Jumeaux'],
            ['203', 'Chambre Supérieure – Lits Jumeaux'],
            ['204', 'Chambre Supérieure – Lits Jumeaux'],
            ['301', 'Chambre Supérieure – Lits Jumeaux'],
            ['302', 'Chambre Supérieure – Lits Jumeaux'],
            ['303', 'Chambre Supérieure – Lits Jumeaux'],
            ['403', 'Chambre Supérieure – Lits Jumeaux'],

            // Chambre Triple Standard (3 غرف)
            ['105', 'Chambre Triple Standard'],
            ['305', 'Chambre Triple Standard'],
            ['405', 'Chambre Triple Standard'],

            // Chambre Triple Supérieure (1 غرفة)
            ['304', 'Chambre Triple Supérieure'],

            // Suite Junior (1 غرفة)
            ['501', 'Suite Junior'],

            // Suite Familiale (1 غرفة)
            ['502', 'Suite Familiale'],
        ];

        foreach ($rooms as [$numRoom, $typeName]) {
            $type = RoomType::where('name', $typeName)->first();

            if (!$type) {
                $this->command->warn("Type introuvable: {$typeName}");
                continue;
            }

            // استخراج الطابق من أول رقم فـ num_room
            $floor = (int) substr($numRoom, 0, 1);

            Room::firstOrCreate(
                ['num_room' => $numRoom],
                [
                    'room_type_id' => $type->id,
                    'floor'        => $floor,
                    'status'       => 'available',
                ]
            );
        }

        $this->command->info('✅ ' . Room::count() . ' chambres créées avec succès.');
    }
}
