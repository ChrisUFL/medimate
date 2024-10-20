<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EmployeeMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (! $request->user()->employee) {
            redirect(route('web.home'));
        }

        return $next($request);
    }
}
