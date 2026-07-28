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
it('shows newest products first until a manual order is set', function () {
    $category = Category::create([
        'name' => 'Mixers',
        'slug' => 'mixers',
        'is_active' => true,
    ]);
    $older = Product::create([
        'category_id' => $category->id,
        'name' => 'Older Mixer',
        'slug' => 'older-mixer',
        'is_active' => true,
    ]);
    $newer = Product::create([
        'category_id' => $category->id,
        'name' => 'Newer Mixer',
        'slug' => 'newer-mixer',
        'is_active' => true,
    ]);

    $this->get(route('products'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('products.data.0.slug', 'newer-mixer')
            ->where('products.data.1.slug', 'older-mixer'),
        );

    $older->update(['sort_order' => 1]);
    $newer->update(['sort_order' => 2]);

    $this->get(route('products'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('products.data.0.slug', 'older-mixer')
            ->where('products.data.1.slug', 'newer-mixer'),
        );
});

it('ignores selected brands that are unavailable in selected categories', function () {
    $mixers = Category::create([
        'name' => 'Mixers',
        'slug' => 'mixers',
        'is_active' => true,
    ]);
    $generators = Category::create([
        'name' => 'Generators',
        'slug' => 'generators',
        'is_active' => true,
    ]);

    Product::create([
        'category_id' => $mixers->id,
        'name' => 'Titan Mixer',
        'slug' => 'titan-mixer',
        'brand' => 'Titan',
        'is_active' => true,
    ]);
    Product::create([
        'category_id' => $mixers->id,
        'name' => 'Megfin Mixer',
        'slug' => 'megfin-mixer',
        'brand' => 'Megfin',
        'is_active' => true,
    ]);
    Product::create([
        'category_id' => $generators->id,
        'name' => 'Bosch Generator',
        'slug' => 'bosch-generator',
        'brand' => 'Bosch',
        'is_active' => true,
    ]);

    $this->get(route('products', [
        'category' => 'mixers',
        'brand' => 'bosch',
    ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('products.data', 2)
            ->where('filters.category', ['mixers'])
            ->where('filters.brand', []),
        );
});

it('filters products by brands available in selected categories', function () {
    $mixers = Category::create([
        'name' => 'Mixers',
        'slug' => 'mixers',
        'is_active' => true,
    ]);

    Product::create([
        'category_id' => $mixers->id,
        'name' => 'Titan Mixer',
        'slug' => 'titan-mixer',
        'brand' => 'Titan',
        'is_active' => true,
    ]);
    Product::create([
        'category_id' => $mixers->id,
        'name' => 'Megfin Mixer',
        'slug' => 'megfin-mixer',
        'brand' => 'Megfin',
        'is_active' => true,
    ]);

    $this->get(route('products', [
        'category' => 'mixers',
        'brand' => 'titan',
    ]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('products.data', 1)
            ->where('products.data.0.slug', 'titan-mixer')
            ->where('filters.category', ['mixers'])
            ->where('filters.brand', ['titan']),
        );
});
