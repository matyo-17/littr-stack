<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        if ($user) {
            $user->load(['permissions', 'roles.permissions']);
        }
        
        $toast = $request->session()->get('toast');
        if ($toast) {
            $toast['id'] = Str::uuid();
        }

        return [
            ...parent::share($request),
            "appName" => config('app.name'),
            "appIcon" => asset('favicon.ico'),
            "auth" => [
                "user" => $user?->only(['id', 'name', 'email', 'avatar']),
                "role" => $user?->roles->pluck('name'),
                "permissions" => $user?->allPermissions() ?? [],
            ],
            "toast" => $toast,
        ];
    }
}
