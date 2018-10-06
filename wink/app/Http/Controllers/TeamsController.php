<?php

namespace Wink\Http\Controllers;

use Auth;
use Crypt;
use DB;
use Event;
use Illuminate\Contracts\Validation\ValidationException;
use Illuminate\Http\Request;
use Validator;
use Wink\CompanyRoleUser;
use Wink\Events\NewInvitation;
use Wink\Http\Controllers\Controller;
use Wink\Http\Requests\TeamPostRequest;
use Wink\Invited;
use Wink\Role;
use Wink\Team;
use Wink\User;

class TeamsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        // Confirm current user has correct access levels
        $currentUserRole = CompanyRoleUser::where('user_id', Auth::user()->id)->where('company_id', session('using_company'))->where('role_id', '<', 3)->get()->toArray();
        if (empty($currentUserRole)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        // Get all teams with users and invited users
        $teams = Team::currentCompany()->with(array('members' => function ($query) {$query->orderBy('first_name', 'ASC');}, 'invitedMembers'))->orderBy('name', 'asc')->get();
        $user_roles = CompanyRoleUser::where('company_id', session('using_company'))->get();
        $roles      = Role::get();

        return view('teams.index', compact('teams', 'user_roles', 'roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('teams.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TeamPostRequest $request)
    {

        DB::beginTransaction();

        try {

            $team = Team::create([
                'name'        => $request->input('name'),
                'description' => $request->input('description'),
                'company_id'  => $request->session()->get('using_company'),
            ]);

            DB::commit();

        } catch (\Exception $e) {

            DB::rollback();
            flash()->error("Error", "There was an error saving your team");

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $team = Team::findOrFail($id);

        // All users who are assigned to the team
        $team_members = $team->members;

        // All users who have been invited to the team
        $invited_members = $team->invitedMembers;

        return view('teams.edit', compact('team', 'team_members', 'invited_members'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TeamPostRequest $request, $id)
    {

        $team = Team::whereId($id)->currentCompany()->firstOrFail();

        DB::beginTransaction();

        try {

            $team->update($request->all());

            DB::commit();

        } catch (\Exception $e) {

            DB::rollback();
            flash()->error("Error", "There was an error saving your team");

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $team = Team::whereId($id)->currentCompany()->firstOrFail();
        // remove all users
        $team->members()->detach();
        $team->delete();

        return redirect('/teams');

    }

    /**
     * Add existing users to the team by their ID
     * @param Request $request
     * @param $team_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function addExistingUsers(Request $request, $team_id)
    {

        // Give the array of ID's make sure these are the only users on the team.
        DB::beginTransaction();

        try {

            // Remove all the current users from the DB
            DB::table('team_user')->where('team_id', $team_id)->delete();

            // Get the users from the request
            $teamUsers = $request->get('teamUsers');

            // For each of the incoming ID's add them to the team.
            foreach ($teamUsers as $user) {
                DB::table('team_user')->insert(
                    ['team_id' => $team_id, 'user_id' => $user]
                );
            }

            DB::commit();
            return response()->json(200);

        } catch (\Exception $e) {

            DB::rollback();
            return response()->json(['error' => 'There was an error saving your team users'], 500);

        }

    }

    /**
     * Add the specified user to the team.
     *
     * @param  int  $team_id
     * @return \Illuminate\Http\Response
     */
    public function addUsers($team_id, Request $request)
    {

        // TODO - This function should also check if the user being invited to join
        // is already invited. The invited method on the registation controller should
        // also check this and add the user to all companies and teams.

        // Create an array from the emails given, split as commer or space
        $new_user_array = preg_split('/[\s\,]+/', $request->newUsers);

        DB::beginTransaction();

        // Try to add all the users in the list given to the DB

        try {

            // Loop through them and sort out which ones are in the system currently and which are not
            for ($i = 0; $i < count($new_user_array); $i++) {

                $current_email = $new_user_array[$i];

                // Email validation of each email
                $validator = Validator::make(['email' => $current_email], ['email' => 'required|email']);

                if ($validator->fails()) {
                    throw new ValidationException($validator->messages());
                }

                // If the user is no currently in the system
                $user = User::where('email', '=', $current_email)->first();

                if ($user === null) {

                    // User not in system so we set them up in the temp invitation table
                    $invited_user = Invited::create([
                        'company_id'      => $request->session()->get('using_company'),
                        'email'           => $current_email,
                        'invitation_link' => Crypt::encrypt($current_email . '/' . Auth::user()->first_name),
                        'team_invited'    => $team_id,
                    ]);

                    // Trigger event to send email to user
                    Event::fire(new NewInvitation($invited_user, Auth::user()));

                } else {

                    // User in system but might not be a user of this company yet!
                    $user_in_company = DB::table('company_role_user')->where('company_id', '=', $request->session()->get('using_company'))->where('user_id', '=', $user->id)->first();
                    if (is_null($user_in_company)) {
                        // User is in the system but is not part of this company yet
                        // We must add them as the lowest level user
                        DB::table('company_role_user')->insert(
                            ['company_id' => $request->session()->get('using_company'), 'user_id' => $user->id, 'role_id' => 5]
                        );
                    }

                    // Is there user already in the team?
                    $in_team_already = DB::table('team_user')->where('team_id', '=', $team_id)->where('user_id', '=', $user->id)->first();
                    if (is_null($in_team_already)) {
                        // They are not in the team so we add them
                        DB::table('team_user')->insert(
                            ['team_id' => $team_id, 'user_id' => $user->id]
                        );
                    }
                }
            }

            DB::commit();

            if ($request->ajax()) {
                return response()->json(200);
            }

            return redirect('teams/' . $team_id . '/edit');

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->ajax()) {
                return response()->json([
                    'error' => $e,
                ], 500);
            }

            flash()->error("Error", "There was an error saving the users");
            return redirect()->back();

        }

    }

    /**
     * Remove the specified user from the team.
     *
     * @param  int  $team_id
     * @param  int  $user_id
     * @return \Illuminate\Http\Response
     */
    public function removeUser($team_id, $user_id)
    {

        DB::beginTransaction();

        try {

            // Remove the selected user from the team
            DB::table('team_user')->where('team_id', '=', $team_id)->where('user_id', '=', $user_id)->delete();
            DB::commit();

            return response()->json([], 200);

        } catch (\Exception $e) {

            DB::rollback();
            return response()->json(['error' => 'could not remove user'], 405);
        }

    }
}
