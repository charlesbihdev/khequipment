<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('contact', [
            'contact' => [
                'salesEmail' => config('site.sales_email'),
                'phone' => config('site.phone'),
                'address' => config('site.address'),
                'whatsappUrl' => config('site.whatsapp_url'),
                'mapEmbedUrl' => config('site.map_embed_url'),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['nullable', 'email', 'max:100'],
            'message' => ['required', 'string', 'max:5000'],
            'website' => ['prohibited'],
        ]);

        Contact::create($data);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'We have received your message.',
        ]);

        return back();
    }
}
