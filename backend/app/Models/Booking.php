<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
class Booking extends Model
{
    use HasFactory;
    protected $table = 'bookings';
    protected $fillable = [
        'user_id',
        'room_id',
        'coupon_id',
        'date_debut',
        'date_fin',
        'prix_total',
        'status_payment',
        'note',
    ];

    // Force dates to serialize as plain "YYYY-MM-DD" strings in JSON
    // Avoids timezone shifts when frontend does new Date("2025-05-24T00:00:00.000Z")
    protected $casts = [
        'date_debut' => 'date:Y-m-d',
        'date_fin'   => 'date:Y-m-d',
    ];

    protected $appends = ['duration'];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function room() {
        return $this->belongsTo(Room::class, 'room_id');
    }
    public function coupon() {
        return $this->belongsTo(Coupon::class, 'coupon_id');
    }
    public function payments() {
        return $this->hasMany(Payment::class, 'booking_id');
    }

    public function getDurationAttribute() {
        $start = Carbon::parse($this->date_debut);
        $end = Carbon::parse($this->date_fin);
        return $start->diffInDays($end);
    }
}
