<?php

namespace Wink\Http\Controllers;

use Auth;
use Input;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Wink\Board;
use Wink\Campaign;
use Wink\Company;
use Wink\CompanyRoleUser;
use Wink\Http\Controllers\Controller;
use Wink\Http\Requests\BoardPostRequest;
use Wink\Location;
use Wink\Tag;
use Wink\Team;
use Wink\User;

class BoardsController extends Controller
{
   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        DB::beginTransaction();

        try {
            // Create a new board for current company
            $board = Board::create([
                'name'       => $request->get('name'),
                'company_id' => $request->session()->get('using_company'),
            ]);

            DB::commit();

            $boards_list = Board::withCount("campaigns")->where("company_id", session('using_company'))->get();

            // Get current board and neccessary campaign, location and team information
            $boards = Board::where('id', $board->id)->where("company_id", session('using_company'))->get();
            $boards->each(function ($board) {

                // Get all neccessary campaign data for board
                $campaigns = Campaign::currentCompany()->where("board_id", $board->id)->with('questions.options', 'teams', 'users', 'company')->orderBy('id', 'desc')->get();
                $campaigns->each(function ($campaign) {
                    $campaign['submittedTasks'] = $campaign->submittedTasks()->count();
                    $campaign['createdTasks']   = $campaign->createdTasks()->count();
                    $campaign['teams']          = $campaign->createdTasks()->count();
                    $campaign['location_ids']   = DB::table('campaign_locations')->where('campaign_id', $campaign->id)->pluck('location_id');
                });

                $board->campaigns = $campaigns;

                // Get board managers
                $board_users = DB::table('board_users')->where('board_id', $board->id)->get();
                $board_users->each(function ($user) {
                    $user->user = User::where('id', $user->user_id)->first();
                });
                $board->managers = $board_users;

            });

            // If it's an ajax request, stop here and just send through the board
            if ($request->ajax()) {
                return response()->json(['boards' => $boards, 'boards_list' => $boards_list], 200);
            }         

            // Redirect to new board
            return redirect('/board/' . $board->id);

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error creating the Board', 'error' => $e], 400);
            }

        }

    }

    /**
     * Display the a single Board and it's campaigns.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        if (Auth::user()->hasRole("Administrator") || Auth::user()->hasRole("Root")) {
            $boards_list = Board::withCount("campaigns")->where("company_id", session('using_company'))->get();
        } else {
            $boards = DB::table('boards')
                ->leftJoin('board_users', 'boards.id', '=', 'board_users.board_id')
                ->where('board_users.user_id', Auth::user()->id)
                ->get();

            $get_ids = [];
            foreach ($boards as $b) {
                $get_ids[] = $b->id;
            }

            $boards_list = Board::withCount("campaigns")->where("company_id", session('using_company'))->whereIn('id', $get_ids)->get();
            if(!empty($get_ids) && in_array($id, $get_ids)){
                $boards = Board::where('id', $get_ids[0])->where("company_id", session('using_company'))->get();
            }else{
                
                return response()->json(['message' => 'Unauthorized access'], 401);
                
            }
        }

        if($request->get('archived')){
            $archived = $request->get('archived');
        }else{
            $archived = 0;
        }        



        // Get current board and neccessary campaign, location and team information
        $boards = Board::where('id', $id)->where("company_id", session('using_company'))->get();
        $boards->each(function ($board) use ($archived) {

            // Get all neccessary campaign data for board
            $campaigns = Campaign::currentCompany()->where("board_id", $board->id)->where("archived", $archived)->with('questions.options', 'teams', 'users', 'company')->orderBy('id', 'desc')->get();
            $campaigns->each(function ($campaign) {
                $campaign['submittedTasks'] = $campaign->submittedTasks()->count();
                $campaign['createdTasks']   = $campaign->createdTasks()->count();
                $campaign['teams']          = $campaign->createdTasks()->count();
                $campaign['location_ids']   = DB::table('campaign_locations')->where('campaign_id', $campaign->id)->pluck('location_id');
            });

            $board->campaigns = $campaigns;

            // Get board managers
            $board_users = DB::table('board_users')->where('board_id', $board->id)->get();
            $board_users->each(function ($user) {
                $user->user = User::where('id', $user->user_id)->first();
            });
            $board->managers = $board_users;

        });

        // If it's an ajax request, stop here and just send through the board
        if ($request->ajax()) {
            return response()->json(['boards' => $boards], 200);
        }

        // Setup initial variables
        //TODO : Cleaned up unused variables
        $tasks      = [];
        $tagsArr    = [];
        $users_list = json_encode([]);
        $users      = json_encode([]);
        $teams      = Team::whereCompanyId(session('using_company'))->get();

        // Loop through locations to get relevant tags, tag ids needed in seperate array
        $locations_list = Location::with('tags')->currentCompany()->orderBy('id', 'asc')->get();
        foreach ($locations_list as $l) {
            $tag  = $l->tags;
            $tags = array();
            foreach ($tag as $t) {
                $tags[]    = $t->tag_id;
                $tagsArr[] = $t->tag_id;

            }
            $l['tags']   = $tags;
            $locations[] = $l;
        }
        $locations = json_encode($locations);
        $tags      = Tag::whereIn('id', $tagsArr)->get();
        $company = Company::findOrFail(session('using_company'));

        return view('boards.index', compact('tasks', 'locations', 'tags', 'teams', 'users', 'boards', 'boards_list', 'company'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        DB::beginTransaction();

        try {

            $board = Board::findOrFail($id);

            // Get all the users assigned to this company
            $users_list = CompanyRoleUser::where('company_id', '=', session('using_company'))->get();
            $users      = User::whereIn('id', $users_list->pluck('user_id'))->get();

            DB::commit();

            return view('boards.edit', compact('board', 'users'));

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error updating the Board'], 400);
            }

        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(BoardPostRequest $request, $id)
    {

        DB::beginTransaction();

        try {
            $board = Board::whereId($id)->whereCompanyId(session('using_company'))->first();

            $board->update($request->all());

            DB::commit();

            return redirect('/boards');

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error updating the Board'], 400);
            }

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
        DB::beginTransaction();

        try {

            Board::destroy($id);

            DB::commit();

            return redirect('/boards');

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error deleting the Board'], 400);
            }

        }

    }

    /**
     * Add manager
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function add_manager(Request $request, $id)
    {

        DB::beginTransaction();

        try {

            // Get the relevenat board data and add board manager role for the selected user
            $board = Board::whereId($id)->first();
            $input = $request->all();

            foreach ($input['newManagers'] as $u) {
                DB::table('company_role_user')->where('user_id', $u)->where('company_id', session('using_company'))->delete();
                $user = DB::table('board_users')->insert(['board_id' => $id, 'user_id' => $u]);
                DB::table('company_role_user')->insert(['company_id' => session('using_company'), 'role_id' => 3, 'user_id' => $u]);

            }

            $board_users = DB::table('board_users')->where('board_id', $id)->get();

            $board_users->each(function ($user) {
                $user->user = User::where('id', $user->user_id)->first();
            });

            DB::commit();

            return response()->json(['data' => $board_users, 'message' => ""], 200);

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error adding the Board Manager'], 400);
            }

        }
    }

    /**
     * Remove manager
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function remove_manager($id, $user_id)
    {

        DB::beginTransaction();

        try {
            // Get board data and remove the selected manager's access
            $board = Board::whereId($id)->first();
            $board->users()->detach($user_id);

            DB::commit();

            return response()->json(['data' => $board, 'message' => ""], 200);

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error removing the Board Manager'], 400);
            }

        }
    }
}
