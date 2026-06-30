<?php

use App\Models\Category;
use App\Models\Contact;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Quote;
use Illuminate\Support\Facades\File;

test('it imports legacy products images and quotes while skipping contacts by default', function () {
    $dumpPath = tempnam(sys_get_temp_dir(), 'kh-import-');

    File::put($dumpPath, <<<'SQL'
INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(7, 'Concrete Mixers', '2024-01-02 03:04:05', '2024-01-03 03:04:05');
INSERT INTO `products` (`id`, `category`, `productName`, `brand`, `isNew`, `poweredBy`, `drumCapacity`, `operatingWeight`, `description`) VALUES
(42, 7, 'Mini Mixer', '', 1, 'Petrol', '120L', NULL, 'Compact mixer');
INSERT INTO `productimages` (`id`, `productId`, `src`, `created_at`, `updated_at`) VALUES
(99, 42, 'mini-mixer.jpg', '', '');
INSERT INTO `tbl_quotes` (`id`, `productId`, `productName`, `fullname`, `address`, `company`, `country`, `message`, `phone`, `email`) VALUES
(5, 42, 'Mini Mixer', 'Jane Buyer', '1 Test Road', '', 'Ghana', NULL, '+233000000', 'jane@example.com');
INSERT INTO `tbl_contacts` (`id`, `fullname`, `email`, `message`) VALUES
(1, 'Spam Bot', 'spam@example.com', 'Skip me');
SQL);

    $this->artisan('kh:import-legacy', ['dump' => $dumpPath])
        ->assertSuccessful();

    expect(Category::query()->count())->toBe(1)
        ->and(Product::query()->count())->toBe(1)
        ->and(ProductImage::query()->count())->toBe(1)
        ->and(Quote::query()->count())->toBe(1)
        ->and(Contact::query()->count())->toBe(0);

    $this->assertDatabaseHas('products', [
        'id' => 42,
        'category_id' => 7,
        'name' => 'Mini Mixer',
        'brand' => null,
        'is_new' => true,
        'powered_by' => 'Petrol',
        'drum_capacity' => '120L',
        'operating_weight' => null,
        'description' => 'Compact mixer',
    ]);

    $this->assertDatabaseHas('product_images', [
        'id' => 99,
        'product_id' => 42,
        'filename' => 'mini-mixer.jpg',
    ]);

    $this->assertDatabaseHas('quotes', [
        'id' => 5,
        'product_id' => 42,
        'product_name_snapshot' => 'Mini Mixer',
        'name' => 'Jane Buyer',
        'company' => null,
        'message' => null,
        'email' => 'jane@example.com',
    ]);

    File::delete($dumpPath);
});
