<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permission extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'group',
    ];

    public function roles(): BelongsToMany {
        return $this->belongsToMany(Role::class)
                    ->using(PermissionRole::class);
    }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class)
                    ->using(PermissionUser::class);
    }
}
