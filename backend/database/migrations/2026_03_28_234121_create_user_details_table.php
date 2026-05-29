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
        Schema::create('user_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->string('cin_passport')->unique()->nullable();
            $table->string('nationality')->nullable();
            $table->date('dob')->nullable();
            $table->string('adresse')->nullable();

            $table->timestamps();
        });
    }

};
