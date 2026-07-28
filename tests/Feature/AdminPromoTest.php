<?php

use App\Models\Promo;
use App\Models\User;

it('toggles promo active state from the promo list', function () {
    $user = User::factory()->create();
    $promo = Promo::create([
        'title' => 'Weekend Mixer Deal',
        'eyebrow' => "Today's Deal",
        'media_type' => 'image',
        'media_path' => 'promos/mixer.jpg',
        'cta_label' => 'Request on WhatsApp',
        'is_active' => true,
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
