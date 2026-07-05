<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;

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

it('shows a success toast after updating a product', function () {
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
        ->put(route('admin.products.update', $product), [
            'category_id' => $category->id,
            'name' => 'Updated Mixer',
            'slug' => 'updated-mixer',
            'is_new' => false,
        ]);

    $response
        ->assertRedirect(route('admin.products.index'))
        ->assertInertiaFlash('toast', [
            'type' => 'success',
            'message' => 'Product updated.',
        ]);

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'slug' => 'updated-mixer',
        'is_new' => false,
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
