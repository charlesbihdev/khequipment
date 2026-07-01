<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function show(Project $project): Response
    {
        abort_unless($project->is_published, 404);

        return Inertia::render('projects/show', [
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'category' => $project->category,
                'deliverable' => $project->deliverable,
                'clientName' => $project->client_name,
                'location' => $project->location,
                'summary' => $project->summary,
                'content' => Project::sanitizeTiptapContent($project->content),
                'status' => $project->status,
                'startedAt' => $project->started_at?->toFormattedDateString(),
                'completedAt' => $project->completed_at?->toFormattedDateString(),
                'mediaType' => $project->cover_media_type,
                'mediaUrl' => $project->cover_media_path
                    ? Storage::url($project->cover_media_path)
                    : null,
                'href' => route('projects.show', $project->slug, absolute: false),
            ],
        ]);
    }
}
