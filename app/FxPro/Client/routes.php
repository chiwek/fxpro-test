<?php

Route::group([
    'middlewareGroups' => ['web', 'auth'],
    'namespace' => 'App\Promens\User\Controllers',
], function($router) {


    $router->get('api/users/list', [
        'middleware' => ['cors', 'auth'],
        'uses' => 'UserController@getItems',
    ])->name('user_list');

    $router->get('api/user/get', [
        'middleware' => ['cors'],
        'uses' => 'UserController@getUser',
    ])->name('user_get');

    $router->get('api/get-globals', [
        'middleware' => ['cors'],
        'uses' => 'UserController@getGlobals'
    ])->name('api_user_globals');

    $router->post('api/user/process-form', [
        'middleware' => ['cors'],
        'uses' => 'UserController@processForm',
    ])->name('user_process');

    $router->post('api/users/upload', [
        'middleware' => ['cors'],
        'uses' => 'UploadController@upload',
    ])->name('user_upload');

    $router->post('api/users/uploadFile', [
        'middleware' => ['cors'],
        'uses' => 'UploadController@fileUpload',
    ])->name('user_upload_file');

    $router->get('api/users/file/delete/{id}', [
        'middleware' => ['cors'],
        'uses' => 'UploadController@fileDelete',
    ])->name('user_file_delete');

    $router->get('api/users/image/delete/{user_id}', [
        'middleware' => ['cors'],
        'uses' => 'UploadController@delete',
    ])->name('user_image_delete');

    $router->post('api/users/filter/delete', [
        'middleware' => ['cors'],
        'uses' => 'FilterController@deleteFilter',
    ])->name('user_filter_delete');

    $router->post('api/users/filter/save', [
        'middleware' => ['cors'],
        'uses' => 'FilterController@saveFilter',
    ])->name('user_filter_delete');

    $router->post('api/users/approve', [
        'middleware' => ['cors'],
        'uses' => 'UserController@userApprovementRequest',
    ])->name('user_approve');

    $router->get('api/user/contacts', [
        'middleware' => ['cors'],
        'uses' => 'UserController@getUserContacts',
    ])->name('user_contents');

    $router->get('api/user/notifications', [
        'middleware' => ['cors'],
        'uses' => 'UserController@getNotifications',
    ])->name('user_notifications');

    $router->get('api/user/notifications/read', [
        'middleware' => ['cors'],
        'uses' => 'UserController@readNotifications',
    ])->name('user_notifications_read');


});
