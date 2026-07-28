<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Quote;
use App\Notifications\QuoteRequestReceived;
use Illuminate\Support\Facades\Notification;

it('allows quote requests without an email address', function () {
    Notification::fake();

    $category = Category::create([
        'name' => 'Mixers',
        'slug' => 'mixers',
        'is_active' => true,
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Titan Mixer',
        'slug' => 'titan-mixer',
        'is_active' => true,
        'powered_by' => 'Diesel',
    ]);

    $this->post(route('quotes.store'), [
        'product_id' => $product->id,
        'product_name' => $product->name,
        'first_name' => 'Ama',
        'last_name' => 'Mensah',
        'company' => '',
        'address' => '12 Market Road',
        'country' => 'Ghana',
        'email' => '',
        'phone' => '+233 24 000 0000',
        'message' => 'Please send pricing.',
        'website' => '',
    ])->assertRedirect();

    $quote = Quote::query()->sole();

    expect($quote->email)->toBeNull()
        ->and($quote->name)->toBe('Ama Mensah');

    $mail = (new QuoteRequestReceived($quote))->toMail(new stdClass);

    expect($mail->introLines)->toContain('Powered by: Diesel');

    Notification::assertSentOnDemand(QuoteRequestReceived::class);
});
