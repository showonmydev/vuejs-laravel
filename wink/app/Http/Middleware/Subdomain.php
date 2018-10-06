<?php

namespace Wink\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Support\Facades\URL;
use Wink\Company;
use Wink\CompanyRoleUser;

class Subdomain
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

        $pieces = explode('.', $request->getHost());

        //\Log::info($pieces);

        // Remove the subdomain param from being passed any further
        $request->route()->forgetParameter('subdomain');

        // If the subdomain is not part of the current
        // companies array then kick the user to app.winkhq.com

        $subdomains = Company::pluck('subdomain')->all();

        if(!in_array($pieces[0], $subdomains)){
            return redirect()->to("http://app.". $pieces[1] .".". $pieces[2]);
        }

        // The subdomain is currently setup
        $request->session()->put('subdomain', $pieces[0]);

        if(Auth::check()) {

            // If the user is logged in then we want to make
            // sure they have access to the subdomain they
            // are trying to access.

            $user = Auth::user();

            // Find all the company connections this user has
            $companies = CompanyRoleUser::whereUserId($user->id)->get();

            $companiesArray = $companies->pluck('company_id');

            // Find all the companies where ID is in the array
            $companiesCollection = Company::whereIn('id', $companiesArray)->get();

            // Pluck an array of subdomains
            $subdomainArray = $companiesCollection->pluck('subdomain')->toArray();

            // User is not allowed to access this account subdomain
            if(!in_array ( $pieces[0] , $subdomainArray)){
                Auth::logout();
                abort(403, 'Unauthorized action.');
            }

            // This subdomain is in the list of subdomains a user has access too
            // We should set the 'using_company' session var to the subdomain company ID

            $currentCompany = $companiesCollection->first(function($value, $key) use ($pieces){

                return $value->subdomain == $pieces[0];
            });

            // Add these values to the session
            $request->session()->put('using_company', $currentCompany->id);
            $request->session()->put('using_company_name', $currentCompany->name);
            $request->session()->put('company_balance', $currentCompany->balance);

        }

        return $next($request);
    }
}
