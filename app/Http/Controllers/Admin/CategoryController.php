<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/categories/index', [
            'categories' => Category::query()
                ->withCount('products')
                ->orderBy('name')
                ->paginate(30),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/categories/create');
    }

    public function store(Request $request): RedirectResponse
    {
        Category::create($this->validated($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category created.']);

        return to_route('admin.categories.index');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('admin/categories/edit', [
            'category' => $category->only(['id', 'name', 'slug']),
        ]);
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $category->update($this->validated($request, $category));

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category updated.']);

        return to_route('admin.categories.index');
    }

    public function destroy(Category $category): RedirectResponse
    {
        if ($category->products()->exists()) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Move products out of this category before deleting it.']);

            return back()->withErrors(['category' => 'Move products out of this category before deleting it.']);
        }

        $category->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category deleted.']);

        return to_route('admin.categories.index');
    }

    private function validated(Request $request, ?Category $category = null): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:categories,slug,'.($category?->id ?? 'NULL')],
        ]);

        $data['slug'] = Str::slug($data['slug'] ?: $data['name']);
        $exists = Category::query()
            ->where('slug', $data['slug'])
            ->when($category, fn ($query) => $query->whereKeyNot($category->id))
            ->exists();

        if ($exists) {
            throw ValidationException::withMessages(['slug' => 'The slug has already been taken.']);
        }

        return $data;
    }
}
