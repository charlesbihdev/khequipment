<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $category
 * @property string|null $deliverable
 * @property string|null $client_name
 * @property string|null $location
 * @property string|null $summary
 * @property string|null $content
 * @property string $status
 * @property Carbon|null $started_at
 * @property Carbon|null $completed_at
 * @property string $cover_media_type
 * @property string|null $cover_media_path
 * @property bool $is_featured
 * @property bool $is_published
 * @property Carbon|null $published_at
 * @property int $sort_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'title',
    'slug',
    'category',
    'deliverable',
    'client_name',
    'location',
    'summary',
    'content',
    'status',
    'started_at',
    'completed_at',
    'cover_media_type',
    'cover_media_path',
    'is_featured',
    'is_published',
    'published_at',
    'sort_order',
])]
class Project extends Model
{
    public static function sanitizeTiptapContent(?string $content): ?string
    {
        if ($content === null || $content === '') {
            return $content;
        }

        $content = preg_replace('/<img\b[^>]*\bsrc=["\']blob:[^"\']+["\'][^>]*>/i', '', $content) ?? $content;
        $content = preg_replace('/\s(?:src|href)=["\']blob:[^"\']+["\']/i', '', $content) ?? $content;

        return str_replace(['src="blob:', "src='blob:"], ['src="', "src='"], $content);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class);
    }

    protected function casts(): array
    {
        return [
            'started_at' => 'date',
            'completed_at' => 'date',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
            'sort_order' => 'integer',
        ];
    }
}
