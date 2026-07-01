<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SiteMaintenanceMode
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! config('site.maintenance.enabled')) {
            return $next($request);
        }

        if ($this->shouldSkipMaintenance($request)) {
            return $next($request);
        }

        if ($request->session()->get('site_maintenance_bypass') === true) {
            return $next($request);
        }

        return Inertia::render('maintenance', [
            'siteName' => config('site.name'),
            'message' => config('site.maintenance.message'),
            'phone' => config('site.phone'),
            'whatsappUrl' => config('site.whatsapp_url'),
        ])->toResponse($request)->setStatusCode(503);
    }

    private function shouldSkipMaintenance(Request $request): bool
    {
        return $request->is(
            'maintenance-bypass',
            'kh-private-access',
            'dashboard',
            'admin',
            'admin/*',
            'settings',
            'settings/*',
            'logout',
            'user/*',
            'up',
            'build/*',
            'images/*',
            'favicon.ico',
            'robots.txt',
        );
    }
}
