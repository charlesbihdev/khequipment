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
        Schema::table('categories', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('name');
        });

        $seen = [];

        DB::table('categories')
            ->orderBy('id')
            ->get(['id', 'name'])
            ->each(function (object $category) use (&$seen): void {
                $baseSlug = Str::slug($category->name) ?: 'category';
                $slug = $baseSlug;

                if (isset($seen[$slug])) {
                    $slug = "{$baseSlug}-{$category->id}";
                }

                $seen[$slug] = true;

                DB::table('categories')
                    ->where('id', $category->id)
                    ->update(['slug' => $slug]);
            });

        Schema::table('categories', function (Blueprint $table) {
            $table->unique('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn('slug');
        });
    }
};
