<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            $table->foreignId('coupon_id')->nullable()->constrained()->nullOnDelete();
            $table->date('date_debut');
            $table->date('date_fin');
            $table->decimal('prix_total', 10, 2);
            // FIX: added 'checked_in' — was missing, caused check-in to fail silently
            $table->enum('status_payment', [
                'pending',
                'confirmed',
                'checked_in',   // ← was missing!
                'completed',
                'cancelled',
            ])->default('pending');
            // FIX: added 'note' — receptionist can save internal notes per booking
            $table->text('note')->nullable();
            $table->timestamps();

            $table->index(['room_id', 'date_debut', 'date_fin']);
            $table->index(['user_id', 'status_payment']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};

// use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\Schema;

// return new class extends Migration
// {
//     /**
//      * Run the migrations.
//      */
//     public function up(): void
//     {
//         Schema::create('bookings', function (Blueprint $table) {
//             $table->id();

//             $table->foreignId('user_id')->constrained()->cascadeOnDelete();
//             $table->foreignId('room_id')->constrained()->cascadeOnDelete();
//             $table->foreignId('coupon_id')->nullable()->constrained()->nullOnDelete();

//             $table->date('date_debut');
//             $table->date('date_fin');
//             $table->decimal('prix_total',10,2);
//             $table->enum('status_payment',['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
//             $table->timestamps();
//             // $table->check('date_fin > date_debut');
//         });
//     }

// };
