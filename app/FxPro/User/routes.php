<?php

Route::group([
    'middlewareGroups' => ['web', 'auth'],
    'namespace' => 'App\FxPro\User\Controllers',
], function($router) {


    $router->get('api/users/list', [
        'middleware' => ['cors', 'auth'],
        'uses' => 'UserController@getItems',
    ])->name('user_list');

    $router->get('api/users/get', [
        'middleware' => ['cors'],
        'uses' => 'UserController@getUser',
    ])->name('user_get');

    $router->get('api/get-globals', [
        'middleware' => ['cors'],
        'uses' => 'UserController@getGlobals'
    ])->name('api_user_globals');

    $router->post('api/users/process-form', [
        'middleware' => ['cors'],
        'uses' => 'UserController@processForm',
    ])->name('user_process');



    $router->post('api/users/filter/delete', [
        'middleware' => ['cors'],
        'uses' => 'FilterController@deleteFilter',
    ])->name('user_filter_delete');

    $router->post('api/users/filter/save', [
        'middleware' => ['cors'],
        'uses' => 'FilterController@saveFilter',
    ])->name('user_filter_delete');

});
