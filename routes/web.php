<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\QuoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/maintenance-bypass', function (Request $request) {
    abort_unless(
        filled(config('site.maintenance.secret')) &&
            hash_equals((string) config('site.maintenance.secret'), (string) $request->query('key')),
        404,
    );

    $request->session()->put('site_maintenance_bypass', true);

    return redirect()->route('home');
})->name('maintenance.bypass');

Route::get('/', HomeController::class)->name('home');
Route::inertia('/about', 'about')->name('about');
Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/projects/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');
Route::post('/quotes', [QuoteController::class, 'store'])
    ->middleware('throttle:2,10')
    ->name('quotes.store');
Route::get('/contact', [ContactController::class, 'create'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])
    // ->middleware('throttle:2,10')
    ->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
