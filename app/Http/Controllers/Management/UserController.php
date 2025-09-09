<?php

namespace App\Http\Controllers\Management;

use App\DTO\UserDto;
use App\Http\Controllers\Controller;
use App\Http\Requests\DatatableRequest;
use App\Http\Requests\Management\UserRequest;
use App\Models\User;
use App\Services\RoleService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(
        private UserService $user_service,
        private RoleService $role_service
    ) {}

    public function index(Request $request): Response {
        Gate::authorize('view-any', User::class);

        return Inertia::render('user/index', [
            'roles' => $this->role_service->selections(),
        ]);
    }

    public function show(Request $request, User $user): JsonResponse {
        Gate::authorize('view', $user);

        $user = $this->user_service->read($user);
        
        return response()->json($user);
    }

    public function update(UserRequest $request, User $user) {
        Gate::authorize('update', $user);

        $dto = UserDto::fromRequest($request);
        $this->user_service->updateRole($user, $dto);

        return back()->with('toast', [
            'status' => 'success',
            'message' => 'User updated!',
        ]);
    }

    public function datatable(DatatableRequest $request): JsonResponse {
        Gate::authorize('view-any', User::class);

        $datatable = $this->user_service->datatable($request);

        return response()->json($datatable);
    }
}
