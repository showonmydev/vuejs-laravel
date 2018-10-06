<?php

namespace Wink\Http\Middleware;

use DB;
use Closure;
use Illuminate\Contracts\Auth\Guard;

class CanManage
{
    /**
     * The Guard implementation.
     *
     * @var Guard
     */
    protected $auth;

    /**
     * Create a new filter instance.
     *
     * @param  Guard  $auth
     * @return void
     */
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
    public function handle($request, Closure $next)
    {
        $role = DB::table('company_role_user')
                    ->whereCompanyId(session('using_company'))
                    ->whereUserId($this->auth->user()->id)
                    ->value('role_id'); ;

        if ($role === 5) {
            if ($request->ajax()) {
                return response('Unauthorized.', 401);
            } else {
                return redirect()->guest('login');
            }
        }

        return $next($request);
    }
}
