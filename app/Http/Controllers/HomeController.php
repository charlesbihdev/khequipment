<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Promo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(Request $request): Response
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
            'projects' => Inertia::defer(fn () => $this->projects($request)),
        ]);
    }

    private function projects(Request $request): array
    {
        $projects = Project::query()
            ->where('is_published', true)
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->latest()
            ->paginate(
                perPage: 3,
                pageName: 'project_page',
                page: $request->integer('project_page', 1),
            );

        return [
            'data' => $projects
                ->through(fn (Project $project): array => [
                    'id' => $project->id,
                    'title' => $project->title,
                    'slug' => $project->slug,
                    'category' => $project->category,
                    'deliverable' => $project->deliverable,
                    'clientName' => $project->client_name,
                    'location' => $project->location,
                    'summary' => $project->summary,
                    'mediaType' => $project->cover_media_type,
                    'mediaUrl' => $project->cover_media_path
                        ? Storage::url($project->cover_media_path)
                        : null,
                ])
                ->items(),
            'currentPage' => $projects->currentPage(),
            'nextPage' => $projects->hasMorePages()
                ? $projects->currentPage() + 1
                : null,
            'hasMorePages' => $projects->hasMorePages(),
        ];
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
