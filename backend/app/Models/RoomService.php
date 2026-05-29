<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class RoomService extends Pivot
{
    use HasFactory;
    protected $table = 'room_services';
    protected $fillable = [
        'room_id',
        'service_id'
    ];
    public $timestamps = true;

}
