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

        $products = Product::query()
            ->with(['category:id,name,slug', 'images:id,product_id,filename'])
            ->when(
                $categorySlugs->isNotEmpty(),
                fn ($query) => $query->whereHas(
                    'category',
                    fn ($categoryQuery) => $categoryQuery->whereIn('slug', $categorySlugs),
                )
            )
            ->orderBy('name')
            ->paginate(9)
            ->withQueryString()
            ->through(function (Product $product): array {
                $image = $product->images->first();

                return [
                    'id' => $product->id,
                    'name' => $product->name,
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
                ->orderBy('name')
                ->get(['id', 'name', 'slug']),
            'products' => $products,
            'filters' => [
                'category' => $categorySlugs->all(),
            ],
        ]);
    }
}
