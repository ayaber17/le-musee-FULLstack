<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RoomType extends Model
{
    use HasFactory;
    protected $table = 'room_types';
    protected $fillable = [
        'name',
        'description',
        'base_price',
        'bed_number',
        'capacity_adult',
        'capacity_children'
    ];

    public function rooms(){
        return $this->hasMany(Room::class , 'room_type_id');
    }
    public function getFullDescriptionAttribute()
    {
        return "{$this->name} - {$this->capacity_adult} Adult(s), {$this->capacity_children} Children, Beds: {$this->bed_number}";
    }
        public function scopePriceBetween($query, $min, $max)
    {
        return $query->whereBetween('base_price', [$min, $max]);
    }

}
