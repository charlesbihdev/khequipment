<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('name');
        });

        $seen = [];

        DB::table('products')
            ->orderBy('id')
            ->get(['id', 'name'])
            ->each(function (object $product) use (&$seen): void {
                $baseSlug = Str::slug($product->name) ?: 'product';
                $slug = $baseSlug;

                if (isset($seen[$slug])) {
                    $slug = "{$baseSlug}-{$product->id}";
                }

                $seen[$slug] = true;

                DB::table('products')
                    ->where('id', $product->id)
                    ->update(['slug' => $slug]);
            });

        Schema::table('products', function (Blueprint $table) {
            $table->unique('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn('slug');
        });
    }
};
