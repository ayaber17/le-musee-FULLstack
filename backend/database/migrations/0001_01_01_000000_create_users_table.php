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
    Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('nom');
    $table->string('prenom');
    $table->string('email')->unique();
    $table->string('password');
    $table->string('telephone');

    $table->enum('role',['admin','staff','client'])->default('client');
    $table->enum('status',['active','inactive','banned'])->default('active');

    $table->boolean('is_foreign')->default(false);
    $table->string('cin_passport')->nullable();

    $table->timestamp('email_verified_at')->nullable();
    $table->timestamp('last_login')->nullable();

    $table->string('avatar')->nullable();

    $table->rememberToken();
    $table->timestamps();
});
    }

};

