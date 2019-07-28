<?php
namespace App\FxPro\Client\Models\Client;


trait ClientTrait
{

    /**
     * @param $data
     * @return Client
     */
    public function createClient($data) {
        $client = new Client();
        $client->product_id = $data['product'];
        $client->firstname = $data['firstname'];
        $client->lastname = $data['lastname'];
        $client->email = $data['email'];
        
        $client->phone = $data['phone'];
        $client->cellphone = $data['cellphone'];
        $client->note = $data['note'];
        
        $client->is_active = $data['is_active'] == "true" ? true : false;

        $client->save();

        $message = "Client created successfuly";

        $client->message = $message;

        return $client;
    }

    /**
     * @param Client $client entity
     * @param $data
     * @return Client
     */
    public function updateClient(Client $client, $data) {

        $client->product_id = $data['product'];
        $client->firstname = $data['firstname'];
        $client->lastname = $data['lastname'];
        $client->email = $data['email'];


        $client->phone = $data['phone'];
        $client->cellphone = $data['cellphone'];
        $client->note = $data['note'];
        $client->is_active = $data['is_active'] == "true" ? true : false;

        $client->save();

        $message = "Client updated successfully";

        $client->message = $message;

        return $client;
    }


}