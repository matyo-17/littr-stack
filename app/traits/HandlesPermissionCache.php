<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

trait HandlesPermissionCache
{
    public function permissionCacheVersion(): string {
        return Cache::rememberForever('permissions:version', fn() => Str::uuid());
    }

    public function invalidatePermissionCache(): void {
        Cache::forget('permissions:version');
        $this->permissionCacheVersion();
    }
}
