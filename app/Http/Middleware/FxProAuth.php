<?php

namespace App\Http\Middleware;

use App\FxPro\User\Models\User\UserInterface;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FxProAuth
{

    /** @var UserInterface */
    private $userRepo;
    public function __construct(UserInterface $userRepo)
    {
        $this->userRepo = $userRepo;
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
        $token = $request->bearerToken();
        if ($token) {
            $user = $this->userRepo->getByToken($token);
            if ($user) {
                Auth::login($user);
            }
        }

        return $next($request);
    }
}
