<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\User;
use App\Models\Room;
use App\Models\Coupon;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    protected $model = Booking::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        $room = Room::inRandomOrder()->first() ?? Room::factory()->create();
        $user = User::inRandomOrder()->first() ?? User::factory()->create();

        $dateDebut = fake()->dateTimeBetween('now', '+3 months');
        $nights = fake()->numberBetween(1, 7);
        $dateFin = Carbon::instance($dateDebut)->copy()->addDays($nights);

        $pricePerNight = $room->type?->base_price ?? 500.00;
        $prixTotal = $pricePerNight * $nights;

        $couponId = null;
        if (fake()->boolean(30)) {
            $coupon = Coupon::inRandomOrder()->first();
            if ($coupon && $coupon->isValid()) {
                $couponId = $coupon->id;

                if ($coupon->discount_type === 'percent') {
                    $prixTotal -= ($prixTotal * ($coupon->discount_value / 100));
                } else {
                    $prixTotal -= $coupon->discount_value;
                }
                $prixTotal = max($prixTotal, 0);
            }
        }

        return [
            'user_id' => $user->id,
            'room_id' => $room->id,
            'coupon_id' => $couponId,
            'date_debut' => $dateDebut->format('Y-m-d'),
            'date_fin' => $dateFin->format('Y-m-d'),
            'prix_total' => $prixTotal,
            // التعديل هنا: القيم مطابقة تماماً للميجريشن ديالك
            'status_payment' => fake()->randomElement(['pending', 'confirmed', 'checked_in', 'completed', 'cancelled']),
            'note' => fake()->boolean(40) ? fake()->sentence() : null,
        ];
    }
}
