<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Image extends Model
{
    use HasFactory;

    protected $table = 'images';
    protected $fillable = [
        'room_id',
        'url_image',
        'is_primary'
    ];
    public function room(){
        return $this->belongsTo(Room::class , 'room_id');
    }
}
