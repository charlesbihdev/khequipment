<?php

use App\Models\Category;
use App\Models\Product;
use Inertia\Testing\AssertableInertia as Assert;

it('only shows active products and categories on the public products page', function () {
    $activeCategory = Category::create([
        'name' => 'Active Mixers',
        'slug' => 'active-mixers',
        'is_active' => true,
    ]);
    $hiddenCategory = Category::create([
        'name' => 'Hidden Mixers',
        'slug' => 'hidden-mixers',
        'is_active' => false,
    ]);

    Product::create([
        'category_id' => $activeCategory->id,
        'name' => 'Active Mixer',
        'slug' => 'active-mixer',
        'is_active' => true,
    ]);
    Product::create([
        'category_id' => $activeCategory->id,
        'name' => 'Hidden Product',
        'slug' => 'hidden-product',
        'is_active' => false,
    ]);
    Product::create([
        'category_id' => $hiddenCategory->id,
        'name' => 'Product In Hidden Category',
        'slug' => 'product-in-hidden-category',
        'is_active' => true,
    ]);

    $this->get(route('products'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('products')
            ->has('products.data', 1)
            ->where('products.data.0.slug', 'active-mixer')
            ->has('categories', 1)
            ->where('categories.0.slug', 'active-mixers'),
        );
});

it('returns not found for inactive public products', function () {
    $category = Category::create([
        'name' => 'Mixers',
        'slug' => 'mixers',
        'is_active' => true,
    ]);
    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Hidden Mixer',
        'slug' => 'hidden-mixer',
        'is_active' => false,
    ]);

    $this->get(route('products.show', $product->slug))->assertNotFound();
});
