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

        Permission::create([
            'name' => 'Users list',
            'url' => 'staff/list',
            'action' => 'staffListUrl'
        ]);

        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 2,
        ]);

        Permission::create([
            'name' => 'Users view',
            'url' => 'staff/view',
            'action' => 'staffViewUrl'
        ]);

        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 3,
        ]);

        Permission::create([
            'name' => 'Users form',
            'url' => 'staff/form',
            'action' => 'staffFormUrl'
        ]);

        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 4,
        ]);



        Permission::create([
        'name' => 'Main Menu Clients',
        'url' => 'clients',
        'action' => 'clientsUrl'
    ]);


        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 5,
        ]);
        RolePermission::create([
            'role_id' => 2,
            'permission_id' => 5,
        ]);

        Permission::create([
            'name' => 'Clients list',
            'url' => 'clients/list',
            'action' => 'clientsListUrl'
        ]);

        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 6,
        ]);

        RolePermission::create([
            'role_id' => 2,
            'permission_id' => 6,
        ]);

        Permission::create([
            'name' => 'Clients view',
            'url' => 'clients/view',
            'action' => 'clientsViewUrl'
        ]);

        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 7,
        ]);

        RolePermission::create([
            'role_id' => 2,
            'permission_id' => 7,
        ]);

        Permission::create([
            'name' => 'Clients form',
            'url' => 'clients/form',
            'action' => 'clientsFormUrl'
        ]);

        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 8,
        ]);
        RolePermission::create([
            'role_id' => 2,
            'permission_id' => 8,
        ]);

        Permission::create([
            'name' => 'Main Menu Products',
            'url' => 'products',
            'action' => 'productsUrl'
        ]);


        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 9,
        ]);
        RolePermission::create([
            'role_id' => 2,
            'permission_id' => 9,
        ]);

        Permission::create([
            'name' => 'Products list',
            'url' => 'products/list',
            'action' => 'productsListUrl'
        ]);

        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 10,
        ]);

        RolePermission::create([
            'role_id' => 2,
            'permission_id' => 10,
        ]);

        Permission::create([
            'name' => 'Products view',
            'url' => 'products/view',
            'action' => 'productsViewUrl'
        ]);

        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 11,
        ]);

        RolePermission::create([
            'role_id' => 2,
            'permission_id' => 11,
        ]);

        Permission::create([
            'name' => 'Products form',
            'url' => 'products/form',
            'action' => 'productsFormUrl'
        ]);

        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 12,
        ]);
        RolePermission::create([
            'role_id' => 2,
            'permission_id' => 12,
        ]);

        Permission::create([
            'name' => 'Delete',
            'action' => 'delete'
        ]);
        RolePermission::create([
            'role_id' => 1,
            'permission_id' => 13,
        ]);
    }
}