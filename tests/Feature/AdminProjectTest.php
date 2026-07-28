<?php

use App\Models\Project;
use App\Models\User;

it('requires an approved project status', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from(route('admin.projects.create'))
        ->post(route('admin.projects.store'), [
            'title' => 'Warehouse Fit Out',
            'category' => 'project',
            'status' => 'nearly_done',
            'cover_media_type' => 'image',
            'is_published' => '1',
        ]);

    $response->assertRedirect(route('admin.projects.create'));
    $response->assertSessionHasErrors('status');
});

it('clears featured when a project is unpublished', function () {
    $user = User::factory()->create();
    $project = Project::create([
        'title' => 'Warehouse Fit Out',
        'slug' => 'warehouse-fit-out',
        'category' => 'project',
        'status' => 'delivered',
        'cover_media_type' => 'image',
        'is_featured' => true,
        'is_published' => true,
    ]);

    $this
        ->actingAs($user)
        ->put(route('admin.projects.update', $project), [
            'title' => 'Warehouse Fit Out',
            'slug' => 'warehouse-fit-out',
            'category' => 'project',
            'status' => 'on_hold',
            'cover_media_type' => 'image',
            'is_featured' => '1',
            'is_published' => '0',
        ])
        ->assertRedirect(route('admin.projects.index'));

    expect($project->fresh())
        ->is_published->toBeFalse()
        ->is_featured->toBeFalse()
        ->status->toBe('on_hold');
});
