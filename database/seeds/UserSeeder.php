<?php

use Illuminate\Database\Seeder;
use \App\FxPro\User\Models\User\User;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'firstname' => 'Ivan',
            'lastname' => 'Stanisavljevic',
            'email' => 'chiwek@gmail.com',
            'username' => 'chiwek',
            'password' => bcrypt('chiwek'),
            'remember_token' => '',
            'role_id' => 1,
            'date_registered' => date('Y-m-d H:i:s'),
            'is_active' => true
        ]);

        User::create([
            'firstname' => 'Nenad',
            'lastname' => 'Stanojevic',
            'email' => 'nenads978@gmail.com',
            'username' => 'nenad',
            'password' => bcrypt('nenad'),
            'remember_token' => '',
            'role_id' => 2,
            'franchise_id' => 1,
            'date_registered' => date('Y-m-d H:i:s'),
            'is_active' => true
        ]);
    }
}
