<?php

namespace App\Listeners;

use App\Events\PermissionDeleted;
use App\Events\PermissionUpdated;
use App\Events\RoleDeleted;
use App\Events\RoleUpdated;
use App\Events\UserRoleUpdated;
use App\Traits\HandlesPermissionCache;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class InvalidatePermissionCache
{
    use HandlesPermissionCache;

    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(
        PermissionUpdated|PermissionDeleted|RoleUpdated|RoleDeleted|UserRoleUpdated $event
    ): void
    {
        $this->invalidatePermissionCache();
    }
}
