<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class UserDetail extends Model
{
    use HasFactory;
    protected $table ='user_details';

    protected $fillable = [
        'user_id',
        'cin_passport',
        'nationality',
        'dob',
        'adresse'
    ];
    protected $casts = [
        'dob' => 'date',
    ];
    public function user(){
        return $this->belongsTo(User::class , 'user_id');
    }

}
