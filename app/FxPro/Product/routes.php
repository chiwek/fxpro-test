<?php

Route::group([
    'middlewareGroups' => ['web', 'auth'],
    'namespace' => 'App\FxPro\Product\Controllers',
], function($router) {


    $router->get('api/products/list', [
        'middleware' => ['cors', 'auth'],
        'uses' => 'ProductController@getItems',
    ])->name('product_list');

    $router->get('api/products/get', [
        'middleware' => ['cors'],
        'uses' => 'ProductController@getProduct',
    ])->name('product_get');


    $router->post('api/products/process-form', [
        'middleware' => ['cors'],
        'uses' => 'ProductController@processForm',
    ])->name('product_process');

});
