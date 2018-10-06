<?php

namespace App\Http\Middleware;

use Closure;
use ResponseJson;
use JWTAuth;
use Illuminate\Http\Request;
class CheckRandomKey
{
    private $JSONSend = null;
    public function __construct() {
        $this->JSONSend = new ResponseJson();
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
        $request->headers->has('Content-Type');
        $request->headers->has('Accept');
        $request->headers->has('Key');
        //Checking Header
        if($request->header('Content-Type') != "application/json"){
            return response()->json(["result_code"=>"500","error"=>"Something went wrong. Please try again later."], 500);
        }
        if($request->header('Accept') != "application/json"){
            return response()->json(["result_code"=>"500","error"=>"Something went wrong. Please try again later."], 500);
        }
        if($request->header('Key') != env('KEY')){
            return response()->json(["result_code"=>"500","error"=>"Something went wrong. Please try again later."], 500);
        }

        if($request->header('Authorization')) {
            $token = explode(' ',$request->header('Authorization'));
            if (count($token) == 2) {
                $request['token'] = $token[1];
            }
        }

        if($request->header('auth_token')) {
            $token = $request->header('auth_token');
            $request['token'] = $token;
        }
        
        if($request->header('access_token')) {
            $token = $request->header('access_token');
            $request['token'] = $token;
        }
        return $next($request);
    }
}
