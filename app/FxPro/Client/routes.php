<?php

Route::group([
    'middlewareGroups' => ['web', 'auth'],
    'namespace' => 'App\FxPro\Client\Controllers',
], function($router) {


    $router->get('api/clients/list', [
        'middleware' => ['cors', 'auth'],
        'uses' => 'ClientController@getItems',
    ])->name('client_list');

    $router->get('api/clients/get', [
        'middleware' => ['cors'],
        'uses' => 'ClientController@getClient',
    ])->name('client_get');


    $router->post('api/clients/process-form', [
        'middleware' => ['cors'],
        'uses' => 'ClientController@processForm',
    ])->name('client_process');

    $router->post('api/clients/delete', [
        'middleware' => ['cors'],
        'uses' => 'ClientController@deleteClient',
    ])->name('client_delete');
});
