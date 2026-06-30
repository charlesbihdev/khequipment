<?php

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'home')->name('home');
Route::inertia('/about', 'about')->name('about');
Route::get('/contact', function () {
    return Inertia::render('contact', [
        'contact' => [
            'salesEmail' => config('site.sales_email'),
            'phone' => config('site.phone'),
            'address' => config('site.address'),
            'whatsappUrl' => config('site.whatsapp_url'),
            'mapEmbedUrl' => config('site.map_embed_url'),
        ],
    ]);
})->name('contact');

Route::post('/contact', function (Request $request) {
    $data = $request->validate([
        'name' => ['required', 'string', 'max:250'],
        'email' => ['nullable', 'email', 'max:120'],
        'message' => ['required', 'string', 'max:5000'],
        'website' => ['prohibited'],
    ]);

    Contact::create($data);

    return back();
})->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
