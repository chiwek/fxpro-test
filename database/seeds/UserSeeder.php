<?php

use Illuminate\Database\Seeder;
use \App\Promens\User\Models\User\User;
use \App\Promens\User\Models\UserSetting\UserSetting;


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
            'role_id' => 2,
            'franchise_id' => 1,
            'date_registered' => date('Y-m-d H:i:s'),
            'is_active' => true
        ]);


    }
}
