<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $categoryFilter = $request->input('category', []);
        $categorySlugs = collect(is_array($categoryFilter) ? $categoryFilter : explode(',', (string) $categoryFilter))
            ->map(fn ($slug): string => Str::slug((string) $slug))
            ->filter()
            ->values();
        $brandFilter = $request->input('brand', []);
        $brandSlugs = collect(is_array($brandFilter) ? $brandFilter : explode(',', (string) $brandFilter))
            ->map(fn ($slug): string => Str::slug((string) $slug))
            ->filter()
            ->values();
        $selectedBrands = $this->brands()
            ->whereIn('slug', $brandSlugs)
            ->pluck('name')
            ->values();

        $products = Product::query()
            ->with(['category:id,name,slug', 'images:id,product_id,filename'])
            ->where('is_active', true)
            ->whereHas('category', fn ($query) => $query->where('is_active', true))
            ->when(
                $categorySlugs->isNotEmpty(),
                fn ($query) => $query->whereHas(
                    'category',
                    fn ($categoryQuery) => $categoryQuery->whereIn('slug', $categorySlugs),
                )
            )
            ->when(
                $selectedBrands->isNotEmpty(),
                fn ($query) => $query->whereIn('brand', $selectedBrands)
            )
            ->orderBy('name')
            ->paginate(9)
            ->withQueryString()
            ->through(function (Product $product): array {
                $image = $product->images->first();

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'category' => $product->category?->name,
                    'isNew' => $product->is_new,
                    'poweredBy' => $product->powered_by,
                    'imageUrl' => $image
                        ? Storage::url('products/'.$image->filename)
                        : null,
                ];
            });

        return Inertia::render('products', [
            'categories' => Category::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name', 'slug']),
            'brands' => Inertia::defer(fn () => $this->brands()),
            'products' => $products,
            'filters' => [
                'category' => $categorySlugs->all(),
                'brand' => $brandSlugs->all(),
            ],
        ]);
    }

    public function show(Request $request, Product $product): Response
    {
        abort_unless($product->is_active && $product->category()->where('is_active', true)->exists(), 404);

        $product->load(['category:id,name,slug', 'images:id,product_id,filename']);
        $returnTo = $request->query('returnTo');
        $returnTo = is_string($returnTo) && str_starts_with($returnTo, '/products')
            ? $returnTo
            : route('products', absolute: false);

        return Inertia::render('products/show', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'brand' => $product->brand,
                'category' => $product->category?->name,
                'isNew' => $product->is_new,
                'poweredBy' => $product->powered_by,
                'drumCapacity' => $product->drum_capacity,
                'operatingWeight' => $product->operating_weight,
                'description' => $product->description,
                'images' => $product->images
                    ->map(fn ($image): array => [
                        'id' => $image->id,
                        'url' => Storage::url('products/'.$image->filename),
                    ])
                    ->values(),
            ],
            'contact' => [
                'whatsappUrl' => config('site.whatsapp_url'),
            ],
            'returnTo' => $returnTo,
        ]);
    }

    private function brands()
    {
        return Product::query()
            ->where('is_active', true)
            ->whereHas('category', fn ($query) => $query->where('is_active', true))
            ->whereNotNull('brand')
            ->where('brand', '<>', '')
            ->orderBy('brand')
            ->pluck('brand')
            ->map(fn (string $brand): array => [
                'name' => $brand,
                'slug' => Str::slug($brand),
            ])
            ->unique('slug')
            ->values();
    }
}
