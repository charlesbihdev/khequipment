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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->restrictOnDelete();
            $table->string('name');
            $table->string('brand', 120)->nullable();
            $table->boolean('is_new')->default(true);
            $table->string('powered_by', 200)->nullable();
            $table->string('drum_capacity', 50)->nullable();
            $table->string('operating_weight', 50)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index(['category_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
