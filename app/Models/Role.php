<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
    ];

    public function permissions(): BelongsToMany {
        return $this->belongsToMany(Permission::class)
                    ->using(PermissionRole::class);
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class)
                    ->using(RoleUser::class);
    }
}
