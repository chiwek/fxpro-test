<?php

namespace App\FxPro\Client\Controllers;


use App\FxPro\Client\Models\Client\Client;
use App\FxPro\Client\Models\Client\ClientInterface;
use App\FxPro\Client\Models\Client\ClientTrait;
use App\FxPro\User\Models\ActionLog\ActionLog;
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
        $order = $request->has('order') ? $request->get('order') : 'clients.firstname';
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
        $requiredData['id'] = 'required|exists:clients,id';
        $this->validate($request, $requiredData);

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
            $requiredData['id'] = 'required|exists:clients,id';
        }

        $this->validate($request, $requiredData);
        $data = $request->all();

        if ($id == 0) {
            $client = $this->createClient($data);
        } else {
            $client = Client::find($id);
            $client = $this->updateClient($client, $data);
        }
        return response()->success(compact('client'));
    }

    public function deleteClient(Request $request) {
        $requiredData['id'] = 'required|exists:clients,id';
        $this->validate($request, $requiredData);

        $authUser = Auth::user();
        if (!$authUser->canDelete()) {
            return response()->error('NO ACCESS');
        }

        $client = Client::find($request->input('id'));
        $client->is_active = false;
        $client->save();

        ActionLog::create([
            'user_id' => Auth::user()->id,
            'resource_name' => 'Client',
            'resource_id' => $client->id,
            'action' => 'Delete'
        ]);

        return response()->success('OK');
    }


}
