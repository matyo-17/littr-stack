<?php

namespace App\Http\Controllers\Management;

use App\DTO\PermissionDto;
use App\Http\Controllers\Controller;
use App\Http\Requests\DatatableRequest;
use App\Http\Requests\Management\PermissionRequest;
use App\Models\Permission;
use App\Services\PermissionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    public function __construct(
        public PermissionService $permission_service
    ) {}

    public function index(Request $request): Response {
        Gate::authorize('view-any', Permission::class);

        return Inertia::render('permission/index');
    }

    public function store(PermissionRequest $request): RedirectResponse {
        Gate::authorize('create', Permission::class);
        
        $dto = PermissionDto::fromRequest($request);
        $this->permission_service->create($dto);
        
        return back()->with('toast', [
            'status' => 'success',
            'message' => 'Permission created!',
        ]);
    }

    public function show(Request $request, Permission $permission): JsonResponse {
        Gate::authorize('view', $permission);

        $permission = $this->permission_service->read($permission);

        return response()->json($permission);
    }

    public function update(PermissionRequest $request, Permission $permission): RedirectResponse {
        Gate::authorize('update', $permission);
        
        $dto = PermissionDto::fromRequest($request);
        $this->permission_service->update($permission, $dto);

        return back()->with('toast', [
            'status' => 'success',
            'message' => 'Permission updated!',
        ]);
    }

    public function destroy(Request $request, Permission $permission): RedirectResponse {
        Gate::authorize('delete', $permission);

        $this->permission_service->destroy($permission);
        
        return back()->with('toast', [
            'status' => 'success',
            'message' => 'Permission deleted!',
        ]);
    }

    public function datatable(DatatableRequest $request): JsonResponse {
        Gate::authorize('view-any', Permission::class);

        $datatable = $this->permission_service->datatable($request);

        return response()->json($datatable);
    }
}
