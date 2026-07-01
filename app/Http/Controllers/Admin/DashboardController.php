<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Project;
use App\Models\Promo;
use App\Models\Quote;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'products' => Product::count(),
                'categories' => Category::count(),
                'projects' => Project::count(),
                'activePromos' => Promo::query()->active()->count(),
                'quotes' => Quote::count(),
            ],
            'recentQuotes' => Quote::query()
                ->latest()
                ->limit(5)
                ->get(['id', 'name', 'product_name_snapshot', 'email', 'phone', 'created_at'])
                ->map(fn (Quote $quote): array => [
                    'id' => $quote->id,
                    'name' => $quote->name,
                    'product' => $quote->product_name_snapshot,
                    'email' => $quote->email,
                    'phone' => $quote->phone,
                    'createdAt' => $quote->created_at?->diffForHumans(),
                ]),
            'recentContent' => [
                'products' => Product::query()->latest()->limit(4)->get(['id', 'name', 'slug', 'created_at']),
                'projects' => Project::query()->latest()->limit(4)->get(['id', 'title', 'slug', 'is_published']),
                'promos' => Promo::query()->latest()->limit(4)->get(['id', 'title', 'is_active']),
            ],
        ]);
    }
}
