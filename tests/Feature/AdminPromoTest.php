<?php

use App\Models\Promo;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('toggles promo active state from the promo list', function () {
    $user = User::factory()->create();
    $promo = Promo::create([
        'title' => 'Weekend Mixer Deal',
        'eyebrow' => "Today's Deal",
        'media_type' => 'image',
        'media_path' => 'promos/mixer.jpg',
        'cta_label' => 'Request on WhatsApp',
        'is_active' => '1',
    ]);

    $this
        ->actingAs($user)
        ->from(route('admin.promos.index'))
        ->patch(route('admin.promos.visibility', $promo), [
            'is_active' => false,
        ])
        ->assertRedirect(route('admin.promos.index'))
        ->assertInertiaFlash('toast', [
            'type' => 'success',
            'message' => 'Promo visibility updated.',
        ]);

    expect($promo->fresh())->is_active->toBeFalse();
});

it('keeps promo images capped at 20 MB while allowing videos up to 150 MB', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $basePayload = [
        'title' => 'Large media promo',
        'eyebrow' => "Today's Deal",
        'cta_label' => 'Request on WhatsApp',
        'is_active' => '1',
    ];

    $this
        ->actingAs($user)
        ->post(route('admin.promos.store'), [
            ...$basePayload,
            'media_type' => 'image',
            'media' => UploadedFile::fake()->create('oversized.jpg', 20481, 'image/jpeg'),
        ])
        ->assertSessionHasErrors('media');

    $this
        ->actingAs($user)
        ->post(route('admin.promos.store'), [
            ...$basePayload,
            'title' => 'Large video promo',
            'media_type' => 'video',
            'media' => UploadedFile::fake()->create('promo.mp4', 150000, 'video/mp4'),
        ])
        ->assertRedirect(route('admin.promos.index'));

    $this->assertDatabaseHas('promos', [
        'title' => 'Large video promo',
        'media_type' => 'video',
    ]);
});
