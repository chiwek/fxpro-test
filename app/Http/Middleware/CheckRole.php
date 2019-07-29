<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

class CheckRole
{
    protected $auth;

    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {


        $roles = $this->getRequiredRoleForRoute($request->route());

        // Check if a role is required for the route, and
        // if so, ensure that the user has that role.

        //let the call through without check if ANY role is supplied
        if (in_array("ANY", $roles)) {
            return $next($request);
        }

        $user = $this->auth->user();
        // Get the required roles from the route

        if(is_object($user) && $user->hasRole($roles) || !$roles)
        {
            return $next($request);
        }

        return response([
            'error' => [
                'code' => 'INSUFFICIENT_ROLE',
                'description' => 'You are not authorized to access this resource.',
                'user' => $user,
                'roles' => $roles
            ]
        ], 401);
    }
    private function getRequiredRoleForRoute(Route $route)
    {
        $actions = $route->getAction();

        return isset($actions['roles']) ? $actions['roles'] : null;
    }

}