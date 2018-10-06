<?php

namespace Wink\Http\Controllers;

use Bugsnag;
use Illuminate\Http\Request;
use JWTAuth;
use Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Wink\Company;
use Wink\User;

class AuthenticateController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return "Auth index";
    }

    public function authenticate(Request $request)
    {

        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {

                // Check if the email is in the users table
                if (User::where('email', '=', $request->get('email'))->exists()) {
                    return response()->json(['error' => 'invalid_credentials'], 401);
                } else {
                    return response()->json(['error' => 'invalid_details'], 404);
                }

            } else {

                // User is authentic. Check if comapny hash sent, and add session for company in user.
                if ($request->get('company_hash') != '') {
                    $company = Company::where('company_hash', $request->get('company_hash'))->first();
                    if ($company) {
                        session(['using_company' => $company->id]);
                    }
                } else {

                    // If no company hash, make sure session value is null
                    session(['using_company' => null]);
                }
            }
        } catch (JWTException $e) {
            // something went wrong
            Bugsnag::notifyException($e);
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return Response::json([
            'token' => $token,
        ], 200);

    }

    public function getAuthenticatedUser()
    {
        try {

            if (!$user = JWTAuth::parseToken()->authenticate()) {
                Bugsnag::notifyException($e);
                return response()->json(['user_not_found' . $e], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            Bugsnag::notifyException($e);
            return response()->json(['token_expired' . $e], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            Bugsnag::notifyException($e);
            return response()->json(['token_invalid' . $e], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            Bugsnag::notifyException($e);
            return response()->json(['token_absent'], $e->getStatusCode());

        }

        $userProfile = $user->profile();

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('userProfile'));
    }

}
