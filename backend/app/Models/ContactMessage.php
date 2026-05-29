<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $table = 'contact_messages';

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        // FIX #2: is_read removed from $fillable — it's an internal admin field,
        // never submitted by users. Set it explicitly: $message->is_read = true.
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];
}



















