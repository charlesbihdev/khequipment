<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Quote;
use App\Notifications\QuoteRequestReceived;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Throwable;

class QuoteController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'product_id' => ['required', 'integer', 'exists:products,id'],
            'product_name' => ['required', 'string', 'max:100'],
            'first_name' => ['required', 'string', 'max:120'],
            'last_name' => ['required', 'string', 'max:120'],
            'company' => ['nullable', 'string', 'max:140'],
            'address' => ['required', 'string', 'max:200'],
            'country' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:100'],
            'phone' => ['required', 'string', 'max:100'],
            'message' => ['nullable', 'string', 'max:5000'],
            'website' => ['prohibited'],
        ]);

        $product = Product::query()->findOrFail($data['product_id']);

        $quote = Quote::create([
            'product_id' => $product->id,
            'product_name_snapshot' => $data['product_name'],
            'name' => trim($data['first_name'].' '.$data['last_name']),
            'address' => $data['address'],
            'company' => $data['company'] ?? null,
            'country' => $data['country'],
            'message' => $data['message'] ?? null,
            'phone' => $data['phone'],
            'email' => $data['email'],
        ]);

        try {
            Notification::route('mail', config('site.sales_email'))
                ->notify(new QuoteRequestReceived($quote));
        } catch (Throwable $exception) {
            report($exception);
        }

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'We have received your quote request.',
        ]);

        return back();
    }
}
