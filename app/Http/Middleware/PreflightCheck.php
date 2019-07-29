<?php
namespace App\Http\Middleware;
use Closure;

class PreflightCheck
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next )
    {
        if ($request->isMethod('options')) {
            return response('', 200)
                ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Headers', 'accept, content-type, x-xsrf-token, x-csrf-token, Authorization'); // Add any required headers here
        }

        return $next($request);
    }
}