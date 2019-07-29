<?php

use Illuminate\Database\Seeder;
use \App\FxPro\User\Models\Permission\Permission;
use \App\FxPro\User\Models\RolePermission\RolePermission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::create([
            'name' => 'Main Menu Users',
            'url' => 'staff',
            'action' => 'staffUrl'
        ]);


        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 1,
        ]);

    }
}