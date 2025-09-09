<?php

namespace App\Services;

use App\DTO\UserDto;
use App\Events\UserRoleUpdated;
use App\Http\Requests\DatatableRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public function create(UserDto $dto): User {
        $user = DB::transaction(function () use ($dto) {
            $user = User::create([
                'name' => $dto->name,
                'email' => $dto->email,
                'password' => $dto->password,
            ]);

            $user_role = Role::where('name', 'user')->firstOrFail();
            $user->roles()->attach($user_role);

            return $user;
        });

        event(new Registered($user));

        return $user;
    }

    public function read(User $user): User {
        $user->loadMissing(['roles']);
        return $user;
    }

    public function updateRole(User $user, UserDto $dto): User {
        $user->roles()->sync($dto->roles);

        event(new UserRoleUpdated($user));

        return $user;
    }

    public function updateProfile(User $user, UserDto $dto): User {
        $user->update([
            'name' => $dto->name,
            'avatar' => $dto->avatar,
        ]);
        return $user;
    }

    public function updatePassword(User $user, UserDto $dto): User {
        $user->update(['password' => $dto->password]);
        return $user;
    }

    public function saveAvatar(User $user, ?UploadedFile $file): ?string {
        $disk = 'public';

        $avatar = ($file) ? $file->store('avatars', $disk) : null;

        $old_avatar = $user->getRawOriginal('avatar');
        if ($old_avatar) {
            Storage::disk($disk)->delete($old_avatar);
        }

        return $avatar;
    }

    public function datatable(DatatableRequest $request): LengthAwarePaginator {
        $dt = new DatatableService($request, User::class);

        $dt->query->with(['roles']);

        $filters = $dt->filters;
        if (isset($filters['email'])) {
            $dt->query->where('email', 'like', '%'.$filters['email'].'%');
        }

        if (isset($filters['name'])) {
            $dt->query->where('name', 'like', '%'.$filters['name'].'%');
        }

        if (isset($filters['roles'])) {
            $roles = Role::whereIn('id', $filters['roles'])->get();
            $dt->query->whereAttachedTo($roles);
        }

        return $dt->sort()->paginate();
    }
}
