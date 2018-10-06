<?php

namespace Wink\Http\Middleware;

use Auth;
use Closure;
use Wink\Company;

class SetInitialCompany
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        if (Auth::user()) {

            $request->session()->put('using_company', Auth::user()->initial_company_id);

            $company = Company::find(Auth::user()->initial_company_id);

            $request->session()->put('using_company_name', $company->name);
            $request->session()->put('company_balance', $company->balance);
            $request->session()->put('company_rewards', $company->rewards);

        }

        return $response;
    }
}
