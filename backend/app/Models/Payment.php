<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $table = 'payments';

    protected $fillable = [
        'booking_id',
        'montant',
        'methode',
        'status',
        'transaction_id',
        'date_payments'
    ];

    public function booking(){
        return $this->belongsTo(Booking::class , 'booking_id');
    }

}
