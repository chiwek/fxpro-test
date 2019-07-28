<?php

namespace App\FxPro\Client\Controllers;


use App\FxPro\Client\Models\Client\ClientInterface;
use App\FxPro\Client\Models\Client\ClientTrait;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    use ClientTrait;

    /**
     * @var ClientInterface
     */
    private $clientRepo;

    public function __construct(ClientInterface $userRepo)
    {
        $this->clientRepo = $userRepo;
    }

    public function getItems(Request $request)
    {

        $perPage = $request->has('perPage') ? $request->input('perPage') : 10;
        $order = $request->has('order') ? $request->get('order') : 'users.firstname';
        $sort = $request->has('sort') ? $request->get('sort') : 'asc';

        $filterParams = [
            'name' => $request->has('name') ? $request->input('name') : "",
            'email' => $request->has('email') ? $request->input('email') : "",
            'isActive' => $request->has('isActive') ? $request->input('isActive') : "",
        ];

        $sort = explode(",", $sort);
        $order = explode(",", $order);

        $clients = $this->clientRepo->filter(
            $filterParams['name'],
            $filterParams['email'],
            $order,
            $sort,
            $perPage,
            $filterParams['isActive']
        );

        return response()->success(compact('clients'));
    }



    public function getClient(Request $request)
    {

        $client = Client::find($request->input('id'));

        return response()->success(compact('client'));
    }

    public function processForm(Request $request)
    {

        $id = $request->input('id', 0);
        $requiredData = [
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required'
        ];

        if ($id > 0) {
            $requiredData['id'] = 'required|exists:client,id';
        }

        $this->validate($request, $requiredData);
        $data = $request->all();

        if ($id == 0) {
            $client = $this->createCClient($data);
        } else {
            $client = Client::find($id);
            $client = $this->updateClient($client, $data);
        }
        return response()->success(compact('client'));
    }


}
