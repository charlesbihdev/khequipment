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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category', 40)->default('project');
            $table->string('deliverable')->nullable();
            $table->string('client_name')->nullable();
            $table->string('location')->nullable();
            $table->string('summary', 280)->nullable();
            $table->longText('content')->nullable();
            $table->string('status', 40)->default('delivered');
            $table->date('started_at')->nullable();
            $table->date('completed_at')->nullable();
            $table->string('cover_media_type', 20)->default('image');
            $table->string('cover_media_path')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['category', 'status']);
            $table->index(['is_published', 'is_featured', 'sort_order']);
            $table->index('published_at');
            $table->index(['completed_at', 'started_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
