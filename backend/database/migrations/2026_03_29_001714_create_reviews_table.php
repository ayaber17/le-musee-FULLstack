<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();

            // note: decimal(2,1) => 1.0 -> 5.0 (kifach 4.5 stars)
            $table->decimal('note', 2, 1);
            $table->text('commentaire')->nullable();

            $table->timestamps();

            // Unique constraint: wa7ed user ma iqderch y-review nfs room mrateen
            $table->unique(['user_id', 'room_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
