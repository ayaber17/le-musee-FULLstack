<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\UserDetail;
use App\Models\Booking;
use App\Models\Review;
use Laravel\Sanctum\HasApiTokens;
/**
 * @property string $role
 * @property string $status
 * @property string $email
 * @property string $nom
 * @property string $prenom
 */
class User extends Authenticatable
{
    use HasApiTokens,HasFactory , Notifiable;

    protected $table = 'users';

protected $fillable = [
    'nom',
    'prenom',
    'email',
    'password',
    'telephone',
    'role',
    'status',
    'is_foreign',
    'cin_passport',
    'avatar',
];
protected $casts = [
    'password' => 'hashed',
    'is_foreign' => 'boolean',
    'email_verified_at' => 'datetime',
    'last_login' => 'datetime',
];
    protected $hidden = [
        'password',
        'remember_token'
    ];
public function isAdmin(): bool
{
    return $this->role === 'admin';
}
public function isStaff()
{
    return $this->role === 'staff';
}
public function isClient()
{
    return $this->role === 'client';
}
public function isActive()
{
    return $this->status === 'active';
}
public function getFullNameAttribute()
{
    return $this->nom . ' ' . $this->prenom;
}
    public function details(){
        return $this->hasOne(UserDetail::class,'user_id');
    }
    public function bookings(){
        return $this->hasMany(Booking::class ,'user_id');
    }
    public function reviews(){
        return $this->hasMany(Review::class,'user_id');
    }
}
