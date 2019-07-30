<?php

namespace App\FxPro\Core\Controllers;


use App\FxPro\User\Models\User\UserInterface;
use App\FxPro\User\Models\Role\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    /** @var UserInterface */
    private $userRepo;
    public function __construct(UserInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function keepAlive() {

        return response()->success('OK');
    }

    public function authenticateUser(Request $request) {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
            'is_active' => '1'
        ];


        if (Auth::attempt($credentials, true)) {
            $user = Auth::user();

            $token = $user->getRememberToken();
            return response()->success(compact('user', 'token'));

        }

        return response()->error('invalid_credentials', [], 401);
    }

    public function authToken(Request $request) {
        $token = $request->input('token');
        if ($token) {
            $user = $this->userRepo->getByToken($token);
            if ($user) {
                Auth::login($user);
                $user->role = Role::find(1);
                return response()->success(compact('user'));
            }
        }

        return response()->error('Token Expired, please login again', [], 401);
    }


}
