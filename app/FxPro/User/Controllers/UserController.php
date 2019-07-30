<?php

namespace App\FxPro\User\Controllers;

use App\FxPro\Product\Models\Product\Product;
use App\FxPro\User\Models\Role\Role;
use App\FxPro\User\Models\User\User;
use App\FxPro\User\Models\User\UserInterface;
use App\FxPro\User\Models\User\UserTrait;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use UserTrait;

    /**
     * @var UserInterface
     */
    private $userRepo;

    public function __construct(UserInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function getItems(Request $request)
    {

        $perPage = $request->has('perPage') ? $request->input('perPage') : 10;
        $order = $request->has('order') ? $request->get('order') : 'users.firstname';
        $sort = $request->has('sort') ? $request->get('sort') : 'asc';

        $filterParams = [
            'name' => $request->has('name') ? $request->input('name') : "",
            'username' => $request->has('username') ? $request->input('username') : '',
            'email' => $request->has('email') ? $request->input('email') : "",
            'type' => $request->has('type') ? $request->input('type') : '',
            'isActive' => $request->has('isActive') ? $request->input('isActive') : "",
        ];

        $sort = explode(",", $sort);
        $order = explode(",", $order);

        $users = $this->userRepo->filter(
            $filterParams['name'],
            $filterParams['username'],
            $filterParams['type'],
            $order,
            $sort,
            $perPage,
            $filterParams['isActive']
        );

        return response()->success(compact('users'));
    }

    public function getGlobals(Request $request)
    {
        $user = Auth::user();

        $lists = [];
        $lists['roles'] = Role::all();
        $filters = $user->filters;
        $products = Product::all();
        $roles = Role::all();


        return response()->success(compact(
            'lists', 'filters', 'products', 'roles')
        );
    }

    public function getUser(Request $request)
    {
        $requiredData['id'] = 'required|exists:users,id';
        $this->validate($request, $requiredData);


        $user = User::find($request->input('id'));

        return response()->success(compact('user'));
    }

    public function processForm(Request $request)
    {

        $userId = $request->input('id', 0);
        $requiredData = [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required'
        ];

        if ($userId > 0) {
            $requiredData['id'] = 'required|exists:users,id';
        }

        $this->validate($request, $requiredData);
        $data = $request->all();


        if ($userId == 0) {
            $user = $this->createUser($data);

        } else {
            $user = User::find($userId);
            $user = $this->updateUser($user, $data);
        }
        return response()->success(compact('user'));
    }

    public function deleteUser(Request $request) {
        $requiredData['id'] = 'required|exists:users,id';
        $this->validate($request, $requiredData);

        $authUser = Auth::user();
        if (!$authUser->canDelete()) {
            return response()->error('NO ACCESS');
        }

        $user = User::find($request->input('id'));
        $user->is_active = false;
        $user->save();

        return response()->success('OK');
    }
}
