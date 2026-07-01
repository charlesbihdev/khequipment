<?php

namespace App\Http\Controllers;

use App\Models\Promo;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('home', [
            'promos' => Inertia::defer(fn () => Promo::query()
                ->active()
                ->with('product:id,name,slug')
                ->latest('starts_at')
                ->latest()
                ->limit(6)
                ->get()
                ->map(fn (Promo $promo): array => [
                    'id' => $promo->id,
                    'title' => $promo->title,
                    'eyebrow' => $promo->eyebrow,
                    'subtitle' => $promo->subtitle,
                    'description' => $promo->description,
                    'mediaType' => $promo->media_type,
                    'mediaUrl' => Storage::url($promo->media_path),
                    'ctaUrl' => $this->whatsappUrl($promo),
                    'product' => $promo->product ? [
                        'name' => $promo->product->name,
                        'slug' => $promo->product->slug,
                    ] : null,
                ])
                ->values()),
        ]);
    }

    private function whatsappUrl(Promo $promo): string
    {
        $phone = preg_replace('/\D+/', '', config('site.phone', '233543670506')) ?: '233543670506';
        $productName = $promo->product?->name ?: $promo->title;
        $message = "Hello Sam, I am interested in the {$productName} deal on your website.";

        return 'https://api.whatsapp.com/send?'.http_build_query([
            'phone' => $phone,
            'text' => $message,
        ]);
    }
}
