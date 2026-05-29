<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingNotificationModel extends Model
{
    use HasFactory;

    // FIX: Laravel infers "booking_notification_models" without this.
    // The migration creates "booking_notifications" — must match explicitly.
    protected $table = 'booking_notifications';

    protected $fillable = [
        'user_id',
        'booking_id',
        'type',
        'message',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function booking() {
        return $this->belongsTo(Booking::class);
    }
}
