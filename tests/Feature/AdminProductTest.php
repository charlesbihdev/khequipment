<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('shows a success toast after creating a product', function () {
    $user = User::factory()->create();
    $category = Category::create([
        'name' => 'Mixers',
        'slug' => 'mixers',
    ]);

    $response = $this
        ->actingAs($user)
        ->post(route('admin.products.store'), [
            'category_id' => $category->id,
            'name' => 'Concrete Mixer',
            'slug' => 'concrete-mixer',
            'is_new' => true,
        ]);

    $response
        ->assertRedirect(route('admin.products.index'))
        ->assertInertiaFlash('toast', [
            'type' => 'success',
            'message' => 'Product created.',
        ]);

    $this->assertDatabaseHas('products', ['slug' => 'concrete-mixer']);
});

it('shows a success toast after updating a product from the edit form payload', function () {
    $user = User::factory()->create();
    $category = Category::create([
        'name' => 'Mixers',
        'slug' => 'mixers',
    ]);
    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Concrete Mixer',
        'slug' => 'concrete-mixer',
        'is_new' => false,
        'is_active' => false,
    ]);
    $returnTo = route('admin.products.index', [
        'category_id' => $category->id,
        'status' => 'hidden',
    ], false);

    $response = $this
        ->actingAs($user)
        ->post(route('admin.products.update', [
            'product' => $product,
            'returnTo' => $returnTo,
        ]), [
            '_method' => 'put',
            'category_id' => $category->id,
            'name' => 'Updated Mixer',
            'slug' => 'updated-mixer',
            'is_new' => '1',
            'is_active' => '1',
        ]);

    $response
        ->assertRedirect(route('admin.products.index', [
            'category_id' => $category->id,
            'status' => 'hidden',
        ]))
        ->assertInertiaFlash('toast', [
            'type' => 'success',
            'message' => 'Product updated.',
        ]);

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'slug' => 'updated-mixer',
        'is_new' => true,
        'is_active' => true,
    ]);
});

it('preserves product index filters and shows a success toast after deleting a product', function () {
    $user = User::factory()->create();
    $category = Category::create([
        'name' => 'Mixers',
        'slug' => 'mixers',
    ]);
    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Concrete Mixer',
        'slug' => 'concrete-mixer',
        'is_new' => true,
    ]);

    $response = $this
        ->actingAs($user)
        ->from(route('admin.products.index', ['category_id' => $category->id]))
        ->delete(route('admin.products.destroy', $product));

    $response
        ->assertRedirect(route('admin.products.index', [
            'category_id' => $category->id,
        ]))
        ->assertInertiaFlash('toast', [
            'type' => 'success',
            'message' => 'Product deleted.',
        ]);

    $this->assertDatabaseMissing('products', ['id' => $product->id]);
});
it('updates product order and shows a success toast', function () {
    $user = User::factory()->create();
    $category = Category::create([
        'name' => 'Mixers',
        'slug' => 'mixers',
    ]);
    $first = Product::create([
        'category_id' => $category->id,
        'name' => 'First Mixer',
        'slug' => 'first-mixer',
    ]);
    $second = Product::create([
        'category_id' => $category->id,
        'name' => 'Second Mixer',
        'slug' => 'second-mixer',
    ]);

    $response = $this
        ->actingAs($user)
        ->from(route('admin.products.index'))
        ->patch(route('admin.products.order'), [
            'products' => [
                ['id' => $second->id, 'sort_order' => 1],
                ['id' => $first->id, 'sort_order' => 2],
            ],
        ]);

    $response
        ->assertRedirect(route('admin.products.index'))
        ->assertInertiaFlash('toast', [
            'type' => 'success',
            'message' => 'Product order updated.',
        ]);

    $this->assertDatabaseHas('products', ['id' => $second->id, 'sort_order' => 1]);
    $this->assertDatabaseHas('products', ['id' => $first->id, 'sort_order' => 2]);
});

it('deletes product image files when deleting a product', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $category = Category::create([
        'name' => 'Mixers',
        'slug' => 'mixers',
    ]);
    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Concrete Mixer',
        'slug' => 'concrete-mixer',
    ]);
    $product->images()->create(['filename' => 'mixer.jpg']);
    Storage::disk('public')->put('products/mixer.jpg', 'image-content');

    $this
        ->actingAs($user)
        ->delete(route('admin.products.destroy', $product))
        ->assertRedirect();

    Storage::disk('public')->assertMissing('products/mixer.jpg');
    $this->assertDatabaseMissing('product_images', ['filename' => 'mixer.jpg']);
});
it('keeps existing product images when uploading more images during edit', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $category = Category::create([
        'name' => 'Mixers',
        'slug' => 'mixers',
    ]);
    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Concrete Mixer',
        'slug' => 'concrete-mixer',
        'is_new' => true,
        'is_active' => true,
    ]);
    $product->images()->create(['filename' => 'existing.jpg']);
    Storage::disk('public')->put('products/existing.jpg', 'existing-image');

    $this
        ->actingAs($user)
        ->post(route('admin.products.update', $product), [
            '_method' => 'put',
            'category_id' => $category->id,
            'name' => 'Concrete Mixer',
            'slug' => 'concrete-mixer',
            'is_new' => '1',
            'is_active' => '1',
            'images' => [UploadedFile::fake()->image('new-image.jpg')],
        ])
        ->assertRedirect();

    Storage::disk('public')->assertExists('products/existing.jpg');
    expect($product->fresh()->images)->toHaveCount(2);
    $this->assertDatabaseHas('product_images', [
        'product_id' => $product->id,
        'filename' => 'existing.jpg',
    ]);
});
