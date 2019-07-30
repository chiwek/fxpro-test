<?php
namespace App\FxPro\User\Models\User;


trait UserTrait
{

    /**
     * @param $data
     * @return User
     */
    public function createUser($data) {
        $user = new User();
        $user->role_id = $data['role'];
        $user->firstname = $data['firstname'];
        $user->lastname = $data['lastname'];
        $user->email = $data['email'];
        $user->username = $data['username'];
        $user->password = bcrypt($data['passwords']['password']);

        $user->phone = $data['phone'];
        $user->cellphone = $data['cellphone'];
        $user->note = $data['note'];

        $user->is_active = $data['is_active'] == "true" ? true : false;



        $user->save();

        $message = "User created successfuly";

        $user->message = $message;

        return $user;
    }

    /**
     * @param $student
     * @param $data
     * @return User
     */
    public function updateUser($user, $data) {

        $user->role_id = $data['role'];
        $user->firstname = $data['firstname'];
        $user->lastname = $data['lastname'];
        $user->email = $data['email'];
        $user->username = $data['username'];
        if (isset($data['passwords']['password'])) {
            $user->password = bcrypt($data['passwords']['password']);
        }
        $user->remember_token = "";
        $user->phone = $data['phone'];
        $user->cellphone = $data['cellphone'];
        $user->note = $data['note'];
        $user->is_active = $data['is_active'] == "true" ? true : false;

        $user->save();

        $message = "User updated successfully";

        $user->message = $message;

        return $user;
    }


}