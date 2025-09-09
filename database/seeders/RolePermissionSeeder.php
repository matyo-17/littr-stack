<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    private array $roles = [
        'super',
        'admin',
        'user',
    ];

    private array $permissions = [
        ['name' => 'view-role', 'group' => 'role'],
        ['name' => 'create-role', 'group' => 'role'],
        ['name' => 'update-role', 'group' => 'role'],
        ['name' => 'delete-role', 'group' => 'role'],
        
        ['name' => 'view-permission', 'group' => 'permission'],
        ['name' => 'create-permission', 'group' => 'permission'],
        ['name' => 'update-permission', 'group' => 'permission'],
        ['name' => 'delete-permission', 'group' => 'permission'],

        ['name' => 'view-user', 'group' => 'user'],
        ['name' => 'update-user', 'group' => 'user'],
    ];
    
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedRoles();
        $this->seedPermissions();
        $this->bindSuperPermissions();
    }

    private function seedRoles(): void {
        $roles = $this->roles;
        $db_roles = Role::all()->pluck('id', 'name');

        foreach ($roles as $role) {
            if (isset($db_roles[$role])) continue;
            Role::factory()->create(['name' => $role]);
        }
    }

    private function seedPermissions(): void {
        $permissions = $this->permissions;
        $db_permissions = Permission::all()->pluck('id', 'name');

        foreach ($permissions as $permission) {
            if (isset($db_permissions[$permission['name']])) continue;
            Permission::factory()->create($permission);
        }
    }

    private function bindSuperPermissions(): void {
        $super = Role::where('name', 'super')->first();
        $permissions = Permission::all();
        $super->permissions()->sync($permissions);
    }
}
