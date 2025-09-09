<?php

namespace App\Services;

use App\DTO\RoleDto;
use App\Events\RoleDeleted;
use App\Events\RoleUpdated;
use App\Http\Requests\DatatableRequest;
use App\Models\Role;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class RoleService {
    public function create(RoleDto $dto): ?Role {
        return DB::transaction(function() use ($dto) {
            $role = Role::create([
                'name' => $dto->name,
            ]);
            
            $role->permissions()->sync($dto->permissions);
            return $role;
        });
    }

    public function read(Role $role): Role {
        $role->loadMissing(['permissions']);
        return $role;
    }

    public function update(Role $role, RoleDto $dto): ?Role {
        $role = DB::transaction(function() use ($role, $dto) {
            $role->update([
                'name' => $dto->name,
            ]);
            
            $role->permissions()->sync($dto->permissions);
            return $role;
        });

        event(new RoleUpdated($role));

        return $role;
    }

    public function destroy(Role $role): void {
        $role->delete();
        event(new RoleDeleted($role));
    }

    public function datatable(DatatableRequest $request): LengthAwarePaginator {
        $dt = new DatatableService($request, Role::class);
        
        $dt->query->withCount('permissions');

        $filters = $dt->filters;
        if (isset($filters['name'])) {
            $dt->query->where('name', 'like', '%'.$filters['name'].'%');
        }

        return $dt->sort()->paginate();
    }

    public function selections(): Collection {
        return Role::select('id', 'name')
                    ->orderBy('name', 'asc')
                    ->get();
    }
}
