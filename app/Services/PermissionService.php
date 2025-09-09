<?php

namespace App\Services;

use App\DTO\PermissionDto;
use App\Events\PermissionDeleted;
use App\Events\PermissionUpdated;
use App\Http\Requests\DatatableRequest;
use App\Models\Permission;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class PermissionService {
    public function create(PermissionDto $dto): Permission {
        return Permission::create([
            'name' => $dto->name,
            'group' => $dto->group,
        ]);
    }

    public function read(Permission $permission): Permission {
        return $permission;
    }

    public function update(Permission $permission, PermissionDto $dto): Permission {
        $permission->update([
            'name' => $dto->name,
            'group' => $dto->group,
        ]);

        event(new PermissionUpdated($permission));

        return $permission;
    }

    public function destroy(Permission $permission): void {
        $permission->delete();

        event(new PermissionDeleted($permission));
    }

    public function datatable(DatatableRequest $request): LengthAwarePaginator {
        $dt = new DatatableService($request, Permission::class);

        $filters = $dt->filters;
        if (isset($filters['name'])) {
            $dt->query->where('name', 'like', '%'.$filters['name'].'%');
        }
        
        if (isset($filters['group'])) {
            $dt->query->where('group', 'like', '%'.$filters['group'].'%');
        }

        return $dt->sort()->paginate();
    }

    public function selections(): array {
        $permissions = Permission::select('id', 'name', 'group')
                            ->orderBy('group', 'asc')
                            ->get();
        
        $result = [];
        foreach ($permissions as $p) {
            $group = $p->group ?? 'others';
            $result[$group][$p->id] = $p->name;
        }

        return $result;
    }
}
