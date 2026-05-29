<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\RoomService;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';
    protected $fillable = [
        'nom_service',
        'icon',
    ];

public function rooms()
    {
        return $this->belongsToMany(Room::class, 'room_services', 'service_id', 'room_id')
                    ->using(RoomService::class)
                    ->withTimestamps(); // Zidi hadi bach t-matchi l-Model dyal Room
    }

}
