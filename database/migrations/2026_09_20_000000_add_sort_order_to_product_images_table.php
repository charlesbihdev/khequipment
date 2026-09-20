<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('product_images', function (Blueprint $table) {
            $table->unsignedInteger('sort_order')->default(0)->after('filename');
        });

        // Preserve the current order (previously ordered by id) so the
        // existing "first image" stays the main image.
        DB::statement('UPDATE product_images SET sort_order = id');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_images', function (Blueprint $table) {
            $table->dropColumn('sort_order');
        });
    }
};
