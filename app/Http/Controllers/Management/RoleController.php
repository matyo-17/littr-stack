<?php

namespace App\Http\Controllers\Management;

use App\DTO\RoleDto;
use App\Http\Controllers\Controller;
use App\Http\Requests\DatatableRequest;
use App\Http\Requests\Management\RoleRequest;
use App\Models\Role;
use App\Services\PermissionService;
use App\Services\RoleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function __construct(
        private RoleService $role_service
    ) {}

    public function index(Request $request, PermissionService $permission_service): Response {
        Gate::authorize('view-any', Role::class);

        return Inertia::render('role/index', [
            'permissions' => $permission_service->selections(),
        ]);
    }

    public function store(RoleRequest $request): RedirectResponse {
        Gate::authorize('create', Role::class);

        $dto = RoleDto::fromRequest($request);
        $this->role_service->create($dto);

        return back()->with('toast', [
            'status' => 'success',
            'message' => 'Role created!',
        ]);
    }

    public function show(Request $request, Role $role): JsonResponse {
        Gate::authorize('view', $role);

        $role = $this->role_service->read($role);

        return response()->json($role);
    }

    public function update(RoleRequest $request, Role $role): RedirectResponse {
        Gate::authorize('update', $role);
        
        $dto = RoleDto::fromRequest($request);
        $this->role_service->update($role, $dto);

        return back()->with('toast', [
            'status' => 'success',
            'message' => 'Role updated!',
        ]);
    }

    public function destroy(Request $request, Role $role): RedirectResponse {
        Gate::authorize('delete', $role);

        $this->role_service->destroy($role);
        
        return back()->with('toast', [
            'status' => 'success',
            'message' => 'Role deleted!',
        ]);
    }

    public function datatable(DatatableRequest $request): JsonResponse {
        Gate::authorize('view-any', Role::class);

        $datatable = $this->role_service->datatable($request);

        return response()->json($datatable);
    }
}
