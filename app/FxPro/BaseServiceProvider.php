<?php
namespace App\FxPro;


use App\FxPro\Client\Models\Client\Client;
use App\FxPro\Product\Models\Product\Product;
use App\FxPro\User\Models\ActionLog\ActionLog;
use App\FxPro\User\Models\User\User;
use Illuminate\Queue\Events\JobProcessing;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\ServiceProvider;

class BaseServiceProvider extends ServiceProvider
{

    public function boot()
    {
    
      //logging errors handler

        if (env('APP_ENV') == 'production') {
            //$monolog = Log::getMonolog();
            //$logs = new LogHandler();
            //$monolog->pushHandler($logs);
        }

        // For each of the registered modules, include their routes and Views
        $modules = config("fxpro.modules");
        foreach ($modules as $key => $module) {
            $moduleName = is_array($module) ? $key : $module;

            // Load the routes for each of the modules
            if(file_exists(__DIR__.'/'.$moduleName.'/routes.php')) {
                include __DIR__.'/'.$moduleName.'/routes.php';
            }

            //Load migrations
            if(is_dir(__DIR__.'/'.$moduleName.'/Migrations')) {
                $this->loadMigrationsFrom(__DIR__.'/'.$moduleName.'/Migrations');
            }
            if(is_dir(__DIR__.'/'.$moduleName.'/Translations')) {
                $this->loadTranslationsFrom(__DIR__.'/'.$moduleName.'/Translations', "promens");

            }


            // Load the views
            if(is_dir(__DIR__.'/'.$moduleName.'/Views')) {
                $this->loadViewsFrom(__DIR__.'/'.$moduleName.'/Views', strtolower("fxpro-" .$moduleName));
            }
            // Load all the commands from commands folder
            if(is_dir(__DIR__.'/'.$moduleName.'/Commands')) {
                $dir = new \DirectoryIterator(__DIR__.'/'.$moduleName.'/Commands');
                foreach ($dir as $fileinfo) {
                    if (!$fileinfo->isDot()) {
                        $this->commands('App\\FxPro\\'.$moduleName.'\Commands\\' . $fileinfo->getBasename('.php'));
                    }
                }
            }

            if(file_exists(__DIR__.'/'.$moduleName.'/EventSubscriber.php')) {
                $namespace = "App\\FxPro\\{$moduleName}\\EventSubscriber";
                Event::subscribe(new $namespace());
            }


        }

        view()->composer('*', function ($view) {
            if (is_object(Auth::user())) {
                $view->with('globalUser', Auth::user());
            }
        });

        view()->composer('*', function($view){
            $viewName = str_replace("fxpro-", "", $view->getName());
            $viewName = str_replace(['.', '::'], ' ', $viewName);
            $viewName = ucwords($viewName);
            $viewName = str_replace(' ', '', $viewName);


            view()->share('theViewName', $viewName);
        });

        User::created(function($user) {
            $this->makeActionLog('User', $user->id,'Create');
        });

        User::updated(function($user) {
            $this->makeActionLog('User', $user->id,'Update');
        });

        User::deleted(function($user) {
            $this->makeActionLog('User', $user->id,'Delete');
        });

        Client::created(function($client) {
            $this->makeActionLog('Client', $client->id,'Create');
        });

        Client::updated(function($client) {
            $this->makeActionLog('Client', $client->id,'Update');
        });



        Product::created(function($product) {
            $this->makeActionLog('Product', $product->id,'Create');
        });

        Product::updated(function($product) {
            $this->makeActionLog('Product', $product->id,'Update');
        });



    }

    public function register() {
    
        //events
        
        $modules = config("fxpro.modules");

        foreach ($modules as $key => $module) {
            $moduleName = is_array($module) ? $key : $module;
            $models = isset($module['Models']) ? $module['Models'] : [] ;


            foreach ($models as $model) {

                if(is_dir(__DIR__."/{$moduleName}/Models/{$model}")) {
                    $this->app->bind(
                        "App\\FxPro\\{$moduleName}\\Models\\{$model}\\{$model}Interface",
                        "App\\FxPro\\{$moduleName}\\Models\\{$model}\\{$model}Repository"
                    );
                }
            }
        }
    }


    private function makeActionLog($resourceName, $resourceId, $action) {
        ActionLog::create([
            'user_id' => Auth::user()->id,
            'resource_name' => $resourceName,
            'resource_id' => $resourceId,
            'action' => $action

        ]);
    }

}