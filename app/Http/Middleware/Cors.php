<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        return $next($request)
           ->header('Access-Control-Allow-Origin','http://localhost:3000')
           ->header('Access-Control-Allow-Methods','GET, POST, DELETE, OPTIONS, PATCH')
           ->header('Access-Control-Allow-Headers','Origin, Accept, Content-Range, Content-Type, X-Auth-Token, X-Requested-With, Authorization, Content-Range, Content-Disposition, Content-Description,')
           ->header('Access-Control-Allow-Credentials','true');
    }
}

// ,
//Content-Range, Content-Disposition, Content-Description,
