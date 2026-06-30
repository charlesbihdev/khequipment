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
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->nullable()->constrained()->nullOnDelete();
            $table->string('product_name_snapshot', 100);
            $table->string('name', 250);
            $table->string('address', 200);
            $table->string('company', 140)->nullable();
            $table->string('country', 50);
            $table->text('message')->nullable();
            $table->string('phone', 100);
            $table->string('email', 100);
            $table->timestamps();

            $table->index(['product_id', 'created_at']);
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};
