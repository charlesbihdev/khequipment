<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Promo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PromoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/promos/index', [
            'promos' => Promo::query()
                ->with('product:id,name')
                ->latest()
                ->paginate(30)
                ->through(fn (Promo $promo): array => [
                    'id' => $promo->id,
                    'title' => $promo->title,
                    'eyebrow' => $promo->eyebrow,
                    'mediaType' => $promo->media_type,
                    'mediaUrl' => Storage::url($promo->media_path),
                    'product' => $promo->product?->name,
                    'isActive' => $promo->is_active,
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/promos/create', [
            'products' => $this->products(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Promo::create($this->validated($request));

        return to_route('admin.promos.index');
    }

    public function edit(Promo $promo): Response
    {
        return Inertia::render('admin/promos/edit', [
            'promo' => [
                ...$promo->only([
                    'id',
                    'title',
                    'eyebrow',
                    'subtitle',
                    'description',
                    'media_type',
                    'media_path',
                    'product_id',
                    'cta_label',
                    'cta_url',
                    'is_active',
                ]),
                'starts_at' => $promo->starts_at?->format('Y-m-d\TH:i'),
                'ends_at' => $promo->ends_at?->format('Y-m-d\TH:i'),
                'mediaUrl' => Storage::url($promo->media_path),
            ],
            'products' => $this->products(),
        ]);
    }

    public function update(Request $request, Promo $promo): RedirectResponse
    {
        $promo->update($this->validated($request, $promo));

        return to_route('admin.promos.index');
    }

    public function destroy(Promo $promo): RedirectResponse
    {
        $promo->delete();

        return to_route('admin.promos.index');
    }

    private function validated(Request $request, ?Promo $promo = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'eyebrow' => ['required', 'string', 'max:80'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'media_type' => ['required', 'in:image,video'],
            'media' => [$promo ? 'nullable' : 'required', 'file', 'mimes:jpg,jpeg,png,webp,mp4,webm', 'max:20480'],
            'product_id' => ['nullable', 'exists:products,id'],
            'cta_label' => ['required', 'string', 'max:80'],
            'cta_url' => ['nullable', 'url', 'max:255'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'is_active' => ['boolean'],
        ]);

        $data['is_active'] = $request->boolean('is_active');
        $data['product_id'] = $data['product_id'] ?? null;

        if ($request->hasFile('media')) {
            $data['media_path'] = $request->file('media')->store('promos', 'public');
        }

        return collect($data)->except('media')->all();
    }

    private function products()
    {
        return Product::query()->orderBy('name')->get(['id', 'name']);
    }
}
