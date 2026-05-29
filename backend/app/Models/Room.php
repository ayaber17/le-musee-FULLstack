<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory;

    protected $table = 'rooms';

    protected $fillable = [
        'room_type_id',
        'num_room',
        'floor',
        'status',
    ];

    protected $casts = [
        'floor' => 'integer',
    ];


    public function type()
    {
        return $this->belongsTo(RoomType::class, 'room_type_id');
    }

    public function images()
    {
        return $this->hasMany(Image::class, 'room_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'room_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'room_id');
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'room_services', 'room_id', 'service_id')
                    ->using(RoomService::class)
                    ->withTimestamps();
    }


    public function isAvailable(string $dateDebut, string $dateFin, ?int $excludeBookingId = null): bool
    {
        return !$this->bookings()
            ->where('status_payment', '!=', 'cancelled')
            ->when($excludeBookingId, fn($q) => $q->where('id', '!=', $excludeBookingId))
            ->where(function ($q) use ($dateDebut, $dateFin) {
                $q->whereBetween('date_debut', [$dateDebut, $dateFin])
                    ->orWhereBetween('date_fin',  [$dateDebut, $dateFin])
                    ->orWhere(function ($q2) use ($dateDebut, $dateFin) {
                        $q2->where('date_debut', '<=', $dateDebut)
                            ->where('date_fin',   '>=', $dateFin);
                    });
            })->exists();
    }

    public function getPricePerNightAttribute(): ?float
    {
        return $this->type?->base_price;
    }

    public function hasPriceConfigured(): bool
    {
        return $this->type !== null && !is_null($this->type->base_price);
    }
}
