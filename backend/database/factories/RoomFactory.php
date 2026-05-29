<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    protected $model = Room::class;

    // مصفوفة غانعمروها بجميع الغرف الحقيقية بالترتيب
    protected static array $allRooms = [];
    protected static int $currentIndex = 0;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        // إذا كانت المصفوفة خاوية، غادي نعمروها بالداتا الحقيقية من ملف ch.docx
        if (empty(self::$allRooms)) {
            $this->initializeRoomsData();
        }

        // يلا تسالاو الغرف الحقيقية الـ 30، نولدو أرقام عشوائية للاحتياط فقط
        if (self::$currentIndex >= count(self::$allRooms)) {
            $numRoom = (string) fake()->unique()->numberBetween(600, 699);
            return [
                'room_type_id' => RoomType::inRandomOrder()->first()?->id ?? 1,
                'num_room' => $numRoom,
                'floor' => 6,
                'status' => 'available',
            ];
        }

        // أخذ الغرفة الحالية من المصفوفة وزيادة العداد
        $currentRoom = self::$allRooms[self::$currentIndex];
        self::$currentIndex++;

        // استخراج الطابق (floor) تلقائياً من الحرف الأول ديال رقم الغرفة (مثال: 106 -> طابق 1، 502 -> طابق 5)
        $floor = (int) substr($currentRoom['num_room'], 0, 1);

        return [
            'room_type_id' => $currentRoom['room_type_id'],
            'num_room' => $currentRoom['num_room'],
            'floor' => $floor,
            // نخليو أغلب الغرف فارغة (available) وشي بركة مشغولين ولا كيتنظفو باش يبان السيستيم حي
            'status' => fake()->randomElement(['available', 'available', 'available', 'occupied', 'cleaning', 'maintenance']),
        ];
    }

    /**
     * دالة مساعدة لربط كل رقم غرفة بالـ ID ديال النوع ديالها الحقيقي
     */
    private function initializeRoomsData(): void
    {
        // الخريطة الحقيقية مأخوذة من ملف ch.docx ومنسقة تماماً مع الأسماء لي فـ types ch.docx
        $mapping = [
            'Chambre Standard – Simple ou Double' => ['106', '107', '205', '206', '207', '306', '307', '406', '407', '503', '504'],
            'Chambre Supérieure – Simple ou Double' => ['104', '401', '402', '404'],
            'Chambre Supérieure –  Lits Jumeaux' => ['101', '102', '103', '201', '202', '203', '204', '301', '302', '303', '403'],
            'Chambre Triple Standard' => ['105', '305', '405'],
            'Chambre Triple Supérieure' => ['304'],
            'Suite Junior avec Grand Balcon – Vue sur Rabat' => ['501'],
            'Suite Familiale avec Grande Terrasse – Vue sur Rabat' => ['502'],
        ];

        foreach ($mapping as $typeName => $numbers) {
            // كيجيب الـ RoomType لي كرييناه ف قاعدة البيانات بنفس الإسم تماماً
            $roomType = RoomType::where('name', $typeName)->first();

            $typeId = $roomType ? $roomType->id : (RoomType::first()?->id ?? 1);

            foreach ($numbers as $number) {
                self::$allRooms[] = [
                    'room_type_id' => $typeId,
                    'num_room' => $number,
                ];
            }
        }
    }
}
