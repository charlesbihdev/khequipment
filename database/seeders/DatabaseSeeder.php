<?php

namespace Database\Seeders;

use App\Models\Project;
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
            ['email' => env('ADMIN_EMAIL', 'bihcharlesowusubih@gmial.com')],
            [
                'name' => env('ADMIN_NAME', 'KH Admin'),
                'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
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

        collect([
            [
                'title' => 'Motor Grader Supplied for Road Works',
                'slug' => 'motor-grader-supplied-for-road-works',
                'category' => 'project',
                'deliverable' => 'Motor grader supply',
                'client_name' => 'Road construction contractor',
                'location' => 'Ghana',
                'summary' => 'A site-ready motor grader supplied to support road preparation and grading operations.',
                'content' => '<p>KH Equipment Hub supplied a motor grader for road preparation work, supporting the client with equipment guidance and delivery coordination.</p>',
                'status' => 'delivered',
                'cover_media_path' => 'products/4180D_motor_grader.jpg',
                'sort_order' => 1,
            ],
            [
                'title' => 'Compaction Equipment for Site Preparation',
                'slug' => 'compaction-equipment-for-site-preparation',
                'category' => 'service-delivered',
                'deliverable' => 'Compaction equipment support',
                'client_name' => 'Building contractor',
                'location' => 'Accra and beyond',
                'summary' => 'Single drum roller support delivered for soil compaction and site preparation work.',
                'content' => '<p>The team supported a contractor with compaction equipment for site preparation and active construction work.</p>',
                'status' => 'delivered',
                'cover_media_path' => 'products/6114E_single_drum_roller.jpg',
                'sort_order' => 2,
            ],
            [
                'title' => 'Excavator Procurement for Earthworks',
                'slug' => 'excavator-procurement-for-earthworks',
                'category' => 'contract',
                'deliverable' => 'Excavator procurement',
                'client_name' => 'Corporate procurement client',
                'location' => 'Ghana',
                'summary' => 'Excavator sourcing and delivery support handled for earthmoving and site development work.',
                'content' => '<p>KH Equipment Hub handled sourcing support for an excavator procurement request tied to earthmoving operations.</p>',
                'status' => 'delivered',
                'cover_media_path' => 'products/920E_excavator_112kw_1m3_600mm.jpg',
                'sort_order' => 3,
            ],
        ])->each(fn (array $project): Project => Project::updateOrCreate(
            ['slug' => $project['slug']],
            [
                ...$project,
                'cover_media_type' => 'image',
                'is_featured' => true,
                'is_published' => true,
                'published_at' => now(),
            ],
        ));
    }
}
