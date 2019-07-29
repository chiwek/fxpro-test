<?php

Route::group([
    'middlewareGroups' => 'web',
    'namespace' => 'App\FxPro\Core\Controllers',
], function($router) {


    $router->post('api/authenticate', [
        'middleware' => ['cors'],
        'uses' => 'AuthController@authenticateUser',
    ])->name('core_post_auth');

    $router->post('api/authenticate/logout', [
        'middleware' => ['cors'],
        'uses' => 'AuthController@logout',
    ])->name('core_post_logout');

    $router->get('api/user-keep-alive', [
        'middleware' => ['cors'],
        'uses' => 'AuthController@keepAlive',
    ])->name('core_keep_alive');

    $router->post('api/auth-token', [
        'middleware' => ['cors'],
        'uses' => 'AuthController@authToken',
    ])->name('core_post_auth_token');

});
