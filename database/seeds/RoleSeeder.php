<?php

use Illuminate\Database\Seeder;
use \App\FxPro\User\Models\Role\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'name' => 'Administrator'
        ]);

        Role::create([
            'name' => 'Regular'
        ]);
    }
}
