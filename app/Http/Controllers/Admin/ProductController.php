<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'condition' => ['nullable', 'in:new,used'],
        ]);

        return Inertia::render('admin/products/index', [
            'products' => Product::query()
                ->with(['category:id,name', 'images:id,product_id,filename'])
                ->when($filters['search'] ?? null, function ($query, string $search): void {
                    $query->where(function ($query) use ($search): void {
                        $query
                            ->where('name', 'like', "%{$search}%")
                            ->orWhere('brand', 'like', "%{$search}%")
                            ->orWhere('slug', 'like', "%{$search}%")
                            ->orWhere('description', 'like', "%{$search}%")
                            ->orWhereHas('category', fn ($query) => $query->where('name', 'like', "%{$search}%"));
                    });
                })
                ->when($filters['category_id'] ?? null, fn ($query, int $categoryId) => $query->where('category_id', $categoryId))
                ->when($filters['condition'] ?? null, fn ($query, string $condition) => $query->where('is_new', $condition === 'new'))
                ->latest()
                ->orderByDesc('id')
                ->paginate(30)
                ->withQueryString()
                ->through(fn (Product $product): array => $this->summary($product)),
            'categories' => $this->categories(),
            'filters' => [
                'search' => $filters['search'] ?? '',
                'category_id' => $filters['category_id'] ?? '',
                'condition' => $filters['condition'] ?? '',
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/products/create', [
            'categories' => $this->categories(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $product = Product::create($this->validated($request));
        $this->storeImages($request, $product);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product created.']);

        return to_route('admin.products.index');
    }

    public function edit(Product $product): Response
    {
        $product->load(['images:id,product_id,filename']);

        return Inertia::render('admin/products/edit', [
            'product' => [
                ...$product->only([
                    'id',
                    'category_id',
                    'name',
                    'slug',
                    'brand',
                    'is_new',
                    'powered_by',
                    'drum_capacity',
                    'operating_weight',
                    'description',
                ]),
                'images' => $product->images->map(fn ($image): array => [
                    'id' => $image->id,
                    'filename' => $image->filename,
                    'url' => Storage::url('products/'.$image->filename),
                ]),
            ],
            'categories' => $this->categories(),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $product->update($this->validated($request, $product));
        $product->images()->whereIn('id', $request->input('remove_image_ids', []))->delete();
        $this->storeImages($request, $product);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product updated.']);

        return to_route('admin.products.index');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product deleted.']);

        return back();
    }

    private function validated(Request $request, ?Product $product = null): array
    {
        $data = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:products,slug,'.($product?->id ?? 'NULL')],
            'brand' => ['nullable', 'string', 'max:120'],
            'is_new' => ['boolean'],
            'powered_by' => ['nullable', 'string', 'max:200'],
            'drum_capacity' => ['nullable', 'string', 'max:50'],
            'operating_weight' => ['nullable', 'string', 'max:50'],
            'description' => ['nullable', 'string'],
            'images.*' => ['nullable', 'image', 'max:5120'],
            'remove_image_ids' => ['array'],
            'remove_image_ids.*' => ['integer'],
        ]);

        $data['slug'] = Str::slug($data['slug'] ?: $data['name']);
        $data['is_new'] = $request->boolean('is_new');
        $exists = Product::query()
            ->where('slug', $data['slug'])
            ->when($product, fn ($query) => $query->whereKeyNot($product->id))
            ->exists();

        if ($exists) {
            throw ValidationException::withMessages(['slug' => 'The slug has already been taken.']);
        }

        return collect($data)->except(['images', 'remove_image_ids'])->all();
    }

    private function storeImages(Request $request, Product $product): void
    {
        foreach ($request->file('images', []) as $image) {
            $path = $image->storeAs(
                'products',
                Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)).'-'.Str::random(8).'.'.$image->extension(),
                'public',
            );

            $product->images()->create(['filename' => basename($path)]);
        }
    }

    private function categories()
    {
        return Category::query()->orderBy('name')->get(['id', 'name']);
    }

    private function summary(Product $product): array
    {
        $image = $product->images->first();

        return [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'category' => $product->category?->name,
            'brand' => $product->brand,
            'isNew' => $product->is_new,
            'poweredBy' => $product->powered_by,
            'drumCapacity' => $product->drum_capacity,
            'operatingWeight' => $product->operating_weight,
            'description' => $product->description,
            'imageUrl' => $image ? Storage::url('products/'.$image->filename) : null,
        ];
    }
}
