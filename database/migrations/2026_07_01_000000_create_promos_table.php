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
        Schema::create('promos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('eyebrow', 80)->default("Today's Deal");
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->string('media_type', 20)->default('image');
            $table->string('media_path');
            $table->foreignId('product_id')->nullable()->constrained()->nullOnDelete();
            $table->string('cta_label', 80)->default('View deal');
            $table->string('cta_url')->nullable();
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'starts_at', 'ends_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promos');
    }
};
