<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $category_id
 * @property string $name
 * @property string $slug
 * @property string|null $brand
 * @property bool $is_new
 * @property bool $is_active
 * @property int $sort_order
 * @property string|null $powered_by
 * @property string|null $drum_capacity
 * @property string|null $operating_weight
 * @property string|null $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'category_id',
    'name',
    'slug',
    'brand',
    'is_new',
    'is_active',
    'sort_order',
    'powered_by',
    'drum_capacity',
    'operating_weight',
    'description',
])]
class Product extends Model
{
    protected $attributes = [
        'is_new' => true,
        'is_active' => true,
        'sort_order' => 0,
    ];

    public function scopeOrdered(Builder $query): Builder
    {
        return $query
            ->orderByRaw('CASE WHEN sort_order > 0 THEN 0 ELSE 1 END')
            ->orderBy('sort_order')
            ->latest()
            ->orderByDesc('id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('id');
    }

    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class);
    }

    protected function casts(): array
    {
        return [
            'is_new' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
