<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Policies\UserPolicy;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->user()->can(UserPolicy::ADMIN, User::class)) {
            return $next($request);
        }
      throw new HttpException(403, 'Forbidden');
    }
}
