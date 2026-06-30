<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int|null $product_id
 * @property string $product_name_snapshot
 * @property string $name
 * @property string $address
 * @property string|null $company
 * @property string $country
 * @property string|null $message
 * @property string $phone
 * @property string $email
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'product_id',
    'product_name_snapshot',
    'name',
    'address',
    'company',
    'country',
    'message',
    'phone',
    'email',
])]
class Quote extends Model
{
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
