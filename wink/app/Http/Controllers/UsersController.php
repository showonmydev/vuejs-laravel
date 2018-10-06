<?php

namespace Wink\Http\Controllers;

use Auth;
use Crypt;
use DB;
use Event;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Response;
use Wink\AccountingLog;
use Wink\CompanyRoleUser;
use Wink\Events\NewInvitation;
use Wink\Http\Controllers\Controller;
use Wink\Http\Requests\UserEditRequest;
use Wink\Http\Requests\UserPostRequest;
use Wink\Invited;
use Wink\User;

class UsersController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth', ['only' => ['accountDetails', 'paymentRequest', 'userDetailsUpdate']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $currentUserRole = CompanyRoleUser::where('user_id', Auth::user()->id)->where('company_id', session('using_company'))->where('role_id', '<', 3)->get()->toArray();
        if (empty($currentUserRole)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $users_list = CompanyRoleUser::where('company_id', '=', session('using_company'))->get();
        $users      = User::whereIn('id', $users_list->pluck('user_id'))->with('teams')->get();
        $invited    = Invited::whereCompanyId(session('using_company'))->whereComplete(0)->get();

        // If this request is an ajax request send JSON data back
        if ($request->ajax()) {
            return response()->json([
                'users'   => $users,
                'invited' => $invited,
            ], 200);
        }

        return view('users.index', compact('users', 'invited'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserPostRequest $request)
    {

        if ($request->isJson()) {
            $data = json_decode($request->getContent(), true);
        } else {
            $data = $request->all();
        }

        DB::beginTransaction();

        try {
            // Add the user to the DB
            $user = User::create([
                'first_name'         => $data['first_name'],
                'last_name'          => $data['last_name'],
                'email'              => $data['email'],
                'password'           => Hash::make(str_random(20)),
                'initial_company_id' => ($data['company_id'] ? $data['company_id'] : session('using_company')),
            ]);

            // Check to see if the user has been invited before and
            // if not then invite them.
            $invited_user = Invited::where('email', '=', $data['email'])->first();

            if ($invited_user === null) {
                // Invite them to the app, allowing them to setup their password
                $invited_user = Invited::create([
                    'company_id'      => ($data['company_id'] ? $data['company_id'] : session('using_company')),
                    'first_name'      => $data['first_name'],
                    'last_name'       => $data['last_name'],
                    'email'           => $data['email'],
                    'invitation_link' => Crypt::encrypt($data['email'] . '/' . Auth::user()->first_name),
                    'team_invited'    => 0,
                ]);

                // Trigger event to send email to user
                Event::fire(new NewInvitation($invited_user, Auth::user()));

            }

            DB::commit();

            if ($request->isJson()) {
                return response()->json(['message' => 'User created successfully', 'status' => 200], 200);
            }

            return redirect('/users/' . $user->id . '/edit');

        } catch (\Exception $e) {

            \Log::info($e);

            DB::rollback();

            return response()->json(['message' => 'Error creating user', 'error' => $e, 'status' => 422], 422);
            if ($request->isJson()) {
                return response()->json(['message' => 'Error creating user', 'error' => $e, 'status' => 422], 422);
            }

            return redirect('/users/' . $user->id . '/edit');

        }

    }

    /**
     * Display the specified resource in json.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function showDetails($id)
    {
        $user = User::findOrFail($id);
        if ($user) {
            return response()->json(['data' => $user], 200);

        } else {

            return response()->json(['message' => 'User not found'], 404);

        }
    }

    /**
     * Update user account details
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function userDetailsUpdate(Request $request)
    {
        if ($request->isJson()) {
            $details = json_decode($request->getContent(), true);
        } else {
            $details = $request->all();
        }

        $valid = true;

        if (!$valid) {
            return Response::json([
                'error'   => 'user_details_save_error',
                'message' => 'Invalid submission.',
            ], 422);
        }

        DB::beginTransaction();

        try {

            $user = User::whereId(Auth::user()->id)->update([
                'dob'       => date("Y-m-d"),
                'gender'    => $details['gender'],
                'ethnicity' => $details['ethnicity'],
                'mobile'    => $details['mobile'],
                'city'      => $details['city'],
            ]);

            DB::commit();

            return response()->json(['message' => "ok"], 200);

        } catch (\Exception $e) {

            \Log::info($e);

            DB::rollback();

            return Response::json([
                'error'   => 'user_details_update_error',
                'message' => json_encode($e),
            ], 422);

        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (Auth::user()->email != 'phil@kiwidc.com' && Auth::user()->email != 'mike.metelerkamp@gmail.com') {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $user = User::findOrFail($id);

        return view('users.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request|UserEditRequest $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserEditRequest $request, $id)
    {

        $user = User::whereId($id)->firstOrFail();

        $user->update($request->all());

        return redirect('/users/' . $user->id . '/edit');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Remove the user from the company
        // We can not remove them from the DB as they might be attached to many other companies.

        CompanyRoleUser::whereCompanyId(session('using_company'))
            ->whereUserId($id)
            ->delete();

        return redirect()->back();

    }

    /**
     * Helper function to check login is valid
     */
    public function loginValidate()
    {
        if (Auth::check()) {
            return response()->json([
            ], 200);
        } else {

            return response()->json([
            ], 404);

        }
    }

    public function accountHistory($id)
    {

        // $user = User::findOrFail(Auth::user());
        $user    = User::whereId($id)->first();
        $history = AccountingLog::where('user_id', $user->id)->get();
        if ($user) {
            return response()->json(['user' => $user, 'log' => $history], 200);

        } else {

            return response()->json(['message' => 'User not found'], 404);

        }

    }

    /**
     * Allow a logged in Authed user to update their bank
     * account details on their record
     */
    /**
     * @SWG\Put(
     *   path="/account",
     *   summary="Update the authed users bank account details",
     *   tags={"user"},
     *   description="Update a users bank account details",
     *   operationId="updateAccount",
     *   produces={"application/json"},
     *   @SWG\Parameter(
     *       name="account_name",
     *       in="body",
     *       required=true,
     *       type="string",
     *   ),
     *    @SWG\Parameter(
     *       name="account_number",
     *       in="body",
     *       required=true,
     *       type="integer",
     *   ),
     *    @SWG\Parameter(
     *       name="account_bank",
     *       in="body",
     *       required=true,
     *       type="integer",
     *   ),
     *    @SWG\Parameter(
     *       name="account_type",
     *       in="body",
     *       required=true,
     *       type="string",
     *   ),
     *   @SWG\Response(
     *       response=200,
     *       description="successful operation",
     *   ),
     *   @SWG\Response(
     *       response="404",
     *       description="User not found",
     *   ),
     *   deprecated=false
     * )
     */
    public function accountDetails(Request $request)
    {

        if ($request->isJson()) {
            $details = json_decode($request->getContent(), true);
        } else {
            $details = $request->all();
        }

        // TODO : SagePay bank account details validation

        $valid = true;

        if (!$valid) {
            return Response::json([
                'error'   => 'account_details_save_error',
                'message' => 'Invalid banking details.',
            ], 422);
        }

        DB::beginTransaction();

        try {

            $bank = $details['account_bank'];
            if ($bank == 'Absa Bank') {
                $bank = '632005';
            }
            if ($bank == 'Capitec Bank') {
                $bank = '470010';
            }
            if ($bank == 'First National Bank (South Africa)') {
                $bank = '250655';
            }
            if ($bank == 'Nedbank (South Africa)') {
                $bank = '198765';
            }
            if ($bank == 'Standard Bank (South Africa)') {
                $bank = '051001';
            }
            if ($bank == 'Bidvest Bank') {
                $bank = '462005';
            }

            $user = User::whereId(Auth::user()->id)->update([
                'account_name'   => $details['account_name'],
                'account_number' => $details['account_number'],
                'account_bank'   => $bank,
                'account_type'   => $details['account_type'],
            ]);

            DB::commit();

            return response()->json(['message' => "ok"], 200);

        } catch (\Exception $e) {

            \Log::info($e);

            DB::rollback();

            return Response::json([
                'error'   => 'account_details_save_error',
                'message' => json_encode($e),
            ], 422);

        }

    }

    /**
     * Update user account to request payment
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function paymentRequest(Request $request, $id)
    {

        if ($request->isJson()) {
            $details = json_decode($request->getContent(), true);
        } else {
            $details = $request->all();
        }

        DB::beginTransaction();

        try {

            $user = User::whereId(Auth::user()->id)->first();

            if ($user->account_name == null || $user->account_name == '' || $user->account_bank == null || $user->account_bank == '' || $user->account_type == null || $user->account_type == '' || $user->account_number == null || $user->account_number == '') {

                return Response::json([
                    'error'   => 'account_details_payout_request_error',
                    'message' => 'Unable to find user account details. User must add account details before payout request.',
                ], 422);
            }

            if ($user->payout_requested == 1) {
                return Response::json([
                    'error'   => 'account_details_payout_request_error',
                    'message' => 'Payout request already pending. Please wait for current payout request to complete before request another payout.',
                ], 422);
            }

            if ($user->balance < 50) {
                return Response::json([
                    'error'   => 'account_details_payout_request_error',
                    'message' => 'Insufficient funds for payout. User balance must be at least R50 to qualify for payout.',
                ], 422);
            }

            // Log reward payout
            AccountingLog::create([
                'user_id' => $user->id,
                'action'  => 'Reward Payout Request',
                'notes'   => 'User has requested reward payout',
                'amount'  => $user->balance,
            ]);

            $user = User::whereId(Auth::user()->id)->update([
                'payout_requested' => 1,
                'pending_payout'   => ($user->pending_payout + $user->balance),
                'balance'          => 0,
            ]);

            DB::commit();

            return response()->json(['message' => "ok"], 200);

        } catch (\Exception $e) {

            \Log::info($e);

            DB::rollback();

            return Response::json([
                'error'   => 'account_details_save_error',
                'message' => $e,
            ], 422);

        }

    }

    /**
     * View specificied SagePay payments doc
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function showPaymentDoc($filename)
    {

        $path = storage_path() . '/app/payments/' . $filename;

        if (file_exists($path)) {

            $file = File::get($path);
            $type = File::mimeType($path);

            $response = Response::make($file, 200);
            $response->header("Content-Type", $type);

            return $response;
        } else {

            return Response::json([
                'message' => 'File not found',
            ], 404);

        }

    }

    public function resetComplete(Request $request)
    {

        return view('auth.passwords.complete');
    }

}
