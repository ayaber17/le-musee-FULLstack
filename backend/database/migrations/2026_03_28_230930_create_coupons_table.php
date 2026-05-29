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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->enum('discount_type',['percent','fixed']);
            $table->decimal('discount_value',10,2);
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('usage_limit')->default(1);
            $table->timestamps();
        });
    }
};
