<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/quotes/index', [
            'quotes' => Quote::query()
                ->latest()
                ->paginate(30)
                ->through(fn (Quote $quote): array => [
                    'id' => $quote->id,
                    'name' => $quote->name,
                    'product' => $quote->product_name_snapshot,
                    'company' => $quote->company,
                    'email' => $quote->email,
                    'phone' => $quote->phone,
                    'createdAt' => $quote->created_at?->toDayDateTimeString(),
                ]),
        ]);
    }

    public function show(Quote $quote): Response
    {
        return Inertia::render('admin/quotes/show', [
            'quote' => [
                ...$quote->only([
                    'id',
                    'product_name_snapshot',
                    'name',
                    'address',
                    'company',
                    'country',
                    'message',
                    'phone',
                    'email',
                ]),
                'createdAt' => $quote->created_at?->toDayDateTimeString(),
            ],
        ]);
    }

    public function destroy(Quote $quote): RedirectResponse
    {
        $quote->delete();

        return to_route('admin.quotes.index');
    }
}
