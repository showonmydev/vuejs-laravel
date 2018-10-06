<?php

namespace Wink\Http\Controllers\Auth;

use DB;
use Auth;
use Hash;
use Crypt;
use JWTAuth;
use Response;
use Event;
use Bugsnag;
use Wink\User;
use Wink\Team;
use Wink\Company;
use Illuminate\Http\Request;
use Wink\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Wink\Http\Requests\RegistrationMobileRequest;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/login';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'getLogout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'company_name' => 'required|unique:companies,name',
            'first_name'   => 'required|max:255',
            'last_name'    => 'required|max:255',
            'email'        => 'required|email|max:255|unique:users',
            'password'     => 'required|min:6',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {

        $registeredUser = Registered::create([
            'company_name'      => $data['company_name'],
            'first_name'        => $data['first_name'],
            'last_name'         => $data['last_name'],
            'email'             => $data['email'],
            'password'          => bcrypt($data['password']),
            'registration_link' => bcrypt($data['email'].'/'.$data['company_name'])
        ]);

        //Event::fire(new NewRegistration($registeredUser));

        return view('auth.view-email');
    }

    /*
     * MOBILE REGISTRATION ROUTES
     */

    public function mobileRegister(Request $request)
    {

        if($request->isJson()){
            $details = json_decode($request->getContent(), true);
        }else{
            $details = $request->all();
        }



        // This will register a user straight into the DB without a confirmation email.
        if (User::where('email', '=', $details['email'])->exists()) {
            return response()->json(['error' => 'This email address is already taken'], 500);
        }

        if(isset($details['company_hash'])){
            $company = Company::where('company_hash', $details['company_hash'])->first();
        }else{
            $company = Company::where('id', 1)->first();
        }

        DB::beginTransaction();

        try {
            // Add the new person to the DB     
            $user = User::create([
                'first_name' => $details['first_name'],
                'last_name' => $details['last_name'],
                'email' => $details['email'],
                'password' => Hash::make($details['password']),
                'company_id' => $company->id,
                'initial_company_id' => $company->id
            ]);

            $credentials = ["email" => $details['email'], "password" => $details['password']];

            // verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                throw new Exception();
            }

            DB::table('company_role_user')->insert(
                ['company_id' => $company->id, 'user_id' => $user->id, 'role_id' => 5]
            );

            $team = Team::where('company_id', $company->id)->where('name','All Agents')->first();

            if(!$team){

                // Add default team
                $team =  Team::create([
                    'company_id'        => $company->id,
                    'name'              => 'All Agents',
                    'description'       => ''
                ]);

            }

            DB::statement('insert into team_user (team_id, user_id) values ('.$team->id.', '.$user->id.')');

            DB::commit();

            return Response::json([
                'token' => $token
            ], 200);

        } catch (\Exception $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token', 'message' => $e] , 500);
        }

    }
}
