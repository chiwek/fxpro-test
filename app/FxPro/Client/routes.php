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
        'uses' => 'ClientController@getUser',
    ])->name('client_get');


    $router->post('api/clients/process-form', [
        'middleware' => ['cors'],
        'uses' => 'ClientController@processForm',
    ])->name('client_process');

});
