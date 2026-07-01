<?php

namespace Database\Seeders;

use App\Models\Promo;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
            ],
        );

        collect([
            [
                'title' => 'Today Only: Excavator Ready for Site Work',
                'eyebrow' => "Today's Deal",
                'subtitle' => 'Limited availability on heavy-duty earthmoving equipment.',
                'description' => 'Ask for current pricing, availability, and delivery options on this site-ready excavator.',
                'media_type' => 'image',
                'media_path' => 'products/922E_excavator_113kw_1.3m3_600mm.jpg',
            ],
            [
                'title' => 'Promo Video: Equipment Ready for Delivery',
                'eyebrow' => 'Video Promo',
                'subtitle' => 'See the kind of machines and support available from KH Equipment Hub.',
                'description' => 'Message the team on WhatsApp for current stock, pricing, and delivery details.',
                'media_type' => 'video',
                'media_path' => 'promos/hero-vid.mp4',
            ],
        ])->each(fn (array $promo): Promo => Promo::updateOrCreate(
            ['title' => $promo['title']],
            [
                ...$promo,
                'cta_label' => 'Request on WhatsApp',
                'cta_url' => null,
                'starts_at' => now()->startOfDay(),
                'ends_at' => null,
                'is_active' => true,
            ],
        ));
    }
}
