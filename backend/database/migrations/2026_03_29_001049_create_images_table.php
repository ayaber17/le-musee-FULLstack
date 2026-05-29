<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            $table->string('url_image');
            $table->boolean('is_primary')->default(false);
            $table->timestamps();

            // FIX: was unique(['room_id', 'is_primary']) — caused error when
            // multiple rooms have is_primary=false (all share same "false" value).
            // Index only — uniqueness enforced at app level.
            $table->index(['room_id', 'is_primary']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('images');
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
//         Schema::create('images', function (Blueprint $table) {
//             $table->id();

//             $table->foreignId('room_id')->constrained()->cascadeOnDelete();
//             $table->string('url_image');
//             $table->boolean('is_primary')->default(false);


//             $table->timestamps();
//             $table->unique(['room_id', 'is_primary']);
//         });
//     }

// };
