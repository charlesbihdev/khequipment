<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::query()
                ->latest()
                ->paginate(30)
                ->through(fn (Project $project): array => [
                    'id' => $project->id,
                    'title' => $project->title,
                    'slug' => $project->slug,
                    'category' => $project->category,
                    'isFeatured' => $project->is_featured,
                    'isPublished' => $project->is_published,
                    'mediaUrl' => $project->cover_media_path ? Storage::url($project->cover_media_path) : null,
                ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/create');
    }

    public function store(Request $request): RedirectResponse
    {
        Project::create($this->validated($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project created.']);

        return to_route('admin.projects.index');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('admin/projects/edit', [
            'project' => $this->payload($project),
        ]);
    }

    public function update(Request $request, Project $project): RedirectResponse
    {
        $project->update($this->validated($request, $project));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project updated.']);

        return to_route('admin.projects.index');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Project deleted.']);

        return to_route('admin.projects.index');
    }

    private function validated(Request $request, ?Project $project = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:projects,slug,'.($project?->id ?? 'NULL')],
            'category' => ['required', 'string', 'max:40'],
            'deliverable' => ['nullable', 'string', 'max:255'],
            'client_name' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string', 'max:280'],
            'content' => ['nullable', 'string'],
            'status' => ['required', 'string', 'max:40'],
            'started_at' => ['nullable', 'date'],
            'completed_at' => ['nullable', 'date'],
            'cover_media_type' => ['required', 'in:image,video'],
            'cover_media' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,mp4,webm', 'max:20480'],
            'images' => ['array'],
            'images.*' => ['image', 'max:5120'],
            'is_featured' => ['boolean'],
            'is_published' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:65535'],
        ]);

        $data['slug'] = Str::slug($data['slug'] ?: $data['title']);
        $exists = Project::query()
            ->where('slug', $data['slug'])
            ->when($project, fn ($query) => $query->whereKeyNot($project->id))
            ->exists();

        if ($exists) {
            throw ValidationException::withMessages(['slug' => 'The slug has already been taken.']);
        }

        $data['is_featured'] = $request->boolean('is_featured');
        $data['is_published'] = $request->boolean('is_published');
        $data['published_at'] = $data['is_published'] ? ($project?->published_at ?? now()) : null;
        $data['sort_order'] = $data['sort_order'] ?? 0;

        if ($request->hasFile('cover_media')) {
            $data['cover_media_path'] = $request->file('cover_media')->store('projects', 'public');
        }

        if ($request->hasFile('images')) {
            $data['content'] = $this->processTiptapImages($data['content'] ?? '', $request->file('images'));
        }

        $data['content'] = Project::sanitizeTiptapContent($data['content'] ?? null);

        return collect($data)->except(['cover_media', 'images'])->all();
    }

    private function processTiptapImages(string $content, array $images): string
    {
        foreach ($images as $index => $file) {
            $path = $file->store('projects/content', 'public');
            $content = str_replace("__IMAGE_ID_{$index}__", Storage::url($path), $content);
        }

        return $content;
    }

    private function payload(Project $project): array
    {
        return [
            ...$project->only([
                'id',
                'title',
                'slug',
                'category',
                'deliverable',
                'client_name',
                'location',
                'summary',
                'status',
                'cover_media_type',
                'is_featured',
                'is_published',
                'sort_order',
            ]),
            'content' => Project::sanitizeTiptapContent($project->content),
            'started_at' => $project->started_at?->format('Y-m-d'),
            'completed_at' => $project->completed_at?->format('Y-m-d'),
            'mediaUrl' => $project->cover_media_path ? Storage::url($project->cover_media_path) : null,
        ];
    }
}
