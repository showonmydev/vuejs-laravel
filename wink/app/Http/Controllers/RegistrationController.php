<?php

namespace Wink\Http\Controllers;

use Crypt;
use DB;
use Event;
use Hash;
use Illuminate\Http\Request;
use JWTAuth;
use Response;
use Wink\Company;
use Wink\Events\NewRegistration;
use Wink\Http\Controllers\Controller;
use Wink\Http\Requests\InvitationPostRequest;
use Wink\Http\Requests\RegistrationMobileRequest;
use Wink\Http\Requests\RegistrationPostRequest;
use Wink\Invited;
use Wink\Registered;
use Wink\Team;
use Wink\User;

class RegistrationController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function getRegister()
    {
        return view('auth.register');
    }

    public function postRegister(RegistrationPostRequest $request)
    {

        // Add the new person to the DB and fire them an email
        // with a link to complete registration

        $registered_user = Registered::create([
            'company_name'      => $request->company_name,
            'company_subdomain' => $request->company_subdomain,
            'first_name'        => $request->first_name,
            'last_name'         => $request->last_name,
            'email'             => $request->email,
            'password'          => Hash::make($request->password),
            'registration_link' => Crypt::encrypt($request->email . '/' . $request->company_name),
        ]);

        // Trigger event to send email to user
        event(new NewRegistration($registered_user));

        return view('auth.view-email');

    }

    public function registerComplete(Request $request, $key)
    {

        echo "1";

    }

    public function invitationComplete($key)
    {

        // get the encrypted data string
        try {
            $decrypted = Crypt::decrypt($key);
        } catch (DecryptException $e) {
            return view('registration.invitation-key-used');
        }

        // split the string
        $decrypted_data = explode('/', $decrypted);

        $signup_details = Invited::whereEmail($decrypted_data[0])->firstOrFail();

        return view('registration.invitation', compact('signup_details'));

    }

    public function invitationSubmitted(InvitationPostRequest $request)
    {

        $invited = Invited::whereInvitationLink($request->invite_token)->firstOrFail();

        DB::beginTransaction();

        try {

            $user_array = ['email' => $invited->email, 'first_name' => $request->first_name, 'last_name' => $request->last_name, 'password' => Hash::make($request->password), 'initial_company_id' => $invited->company_id];
            // Create a user
            $user = User::firstOrCreate($user_array);

            // Links the user to the company and their initial role
            DB::table('company_role_user')->insert(
                ['company_id' => $invited->company_id, 'user_id' => $user->id, 'role_id' => 5]
            );

            $team = Team::where('company_id', $invited->company_id)->where('name', 'All Agents')->first();

            if (!$team) {

                // Add default team
                $team = Team::create([
                    'company_id'  => $company->id,
                    'name'        => 'All Agents',
                    'description' => '',
                ]);

            }

            DB::statement('insert into team_user (team_id, user_id) values (' . $team->id . ', ' . $user->id . ')');

            if ($invited->team_invited > 0) {
                // Add the user to the team they were requested to be part of
                DB::table('team_user')->insert(
                    ['team_id' => $invited->team_invited, 'user_id' => $user->id]
                );
            }

            $invited->update(['complete' => 1]);

            DB::commit();

            return redirect('/');

        } catch (\Exception $e) {

            DB::rollback();

            flash()->error("Error", json_encode($e));

            return redirect()->back();

        }

    }

    /*
     * MOBILE REGISTRATION ROUTES
     */

    public function mobileRegister(RegistrationMobileRequest $request)
    {

        // This will register a user straight into the DB without a confirmation email.
        if (User::where('email', '=', $request->email)->exists()) {
            return response()->json(['error' => 'This email address is already taken'], 500);
        }

        if (isset($details['company_hash'])) {
            $company = Company::where('company_hash', $details['company_hash'])->first();
        } else {
            $company = Company::where('id', 1)->first();
        }

        DB::beginTransaction();

        try {
            // Add the new person to the DB

            $user = User::create([
                'first_name'         => $request->first_name,
                'last_name'          => $request->last_name,
                'email'              => $request->email,
                'password'           => Hash::make($request->password),
                'company_id'         => $company->id,
                'initial_company_id' => $company->id,
            ]);

            $credentials = $request->only('email', 'password');

            // verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'could_not_create_token'], 401);
            }

            DB::table('company_role_user')->insert(
                ['company_id' => $company->id, 'user_id' => $user->id, 'role_id' => 5]
            );

            $team = Team::where('company_id', $company->id)->where('name', 'All Agents')->first();

            if (!$team) {

                // Add default team
                $team = Team::create([
                    'company_id'  => $company->id,
                    'name'        => 'All Agents',
                    'description' => '',
                ]);

            }

            DB::statement('insert into team_user (team_id, user_id) values (' . $team->id . ', ' . $user->id . ')');

            DB::commit();

            return Response::json([
                'token' => $token,
            ], 200);

        } catch (\Exception $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

    }

}
