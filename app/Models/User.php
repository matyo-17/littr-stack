<?php

namespace App\Models;

use App\Traits\HandlesPermissionCache;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes, HandlesPermissionCache;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles(): BelongsToMany {
        return $this->belongsToMany(Role::class)
                    ->using(RoleUser::class);
    }

    public function permissions(): BelongsToMany {
        return $this->belongsToMany(Permission::class)
                    ->using(PermissionUser::class);
    }

    public function avatar(): Attribute {
        return Attribute::make(
            get: fn($value) => ($value) ? Storage::url($value) : null,
        );
    }

    public function allPermissions(): Collection {
        $key = "permissions:user_{$this->id}:{$this->permissionCacheVersion()}";
        $ttl = now()->addMinutes(10);

        return Cache::remember($key, $ttl, function() {
            $this->load(['permissions', 'roles.permissions']);

            $user_permissions = $this->permissions->pluck('name');
            $roles_permissions = $this->roles
                                    ->flatMap(fn($role) => $role->permissions)
                                    ->pluck('name');
            return $user_permissions->merge($roles_permissions)->unique();
        });
    }

    public function hasPermission(string $permission): bool {
        return $this->allPermissions()->contains($permission);
    }

    public function hasAnyPermission(array $permissions): bool {
        return $this->allPermissions()->intersect($permissions)->isNotEmpty();
    }
}
