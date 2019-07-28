<?php

namespace App\FxPro;


use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class ResponseMacroServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Response::macro('success', function ($data) {
            return Response::json([
                'errors'  => false,
                 'data' => $data,
                ]);
        });

        Response::macro('error', function ($message, $errors = [], $status = 200) {

            return Response::json([
                'data' => [
                    'message' => $message,
                    'errors' => $errors
                ],
                'errors'          => 'true',
                'status_code'     => $status,
            ], $status);

        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
