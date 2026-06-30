<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $category_id
 * @property string $name
 * @property string|null $brand
 * @property bool $is_new
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
    'brand',
    'is_new',
    'powered_by',
    'drum_capacity',
    'operating_weight',
    'description',
])]
class Product extends Model
{
    protected $attributes = [
        'is_new' => true,
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class);
    }

    protected function casts(): array
    {
        return [
            'is_new' => 'boolean',
        ];
    }
}
