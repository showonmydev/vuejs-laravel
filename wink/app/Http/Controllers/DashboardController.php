<?php

namespace Wink\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Wink\Board;
use Wink\Campaign;
use Wink\Company;
use Wink\Http\Controllers\Controller;
use Wink\Location;
use Wink\Tag;
use Wink\Team;
use Wink\User;

class DashboardController extends Controller
{

    /**
     * Show the default Board
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function dashboardNew(Request $request)
    {

        if (Auth::user()->hasRole("Administrator") || Auth::user()->hasRole("Root")) {
            $boards_list = Board::withCount("campaigns")->where("company_id", session('using_company'))->get();
            $boards      = Board::where('name', "General")->where("company_id", session('using_company'))->get();
        } else {

            $boards = DB::table('boards')
                ->leftJoin('board_users', 'boards.id', '=', 'board_users.board_id')
                ->where('board_users.user_id', Auth::user()->id)
                ->where('boards.company_id', session('using_company'))
                ->get();

            $get_ids = [];
            foreach ($boards as $b) {
                $get_ids[] = $b->id;
            }

            $boards_list = Board::withCount("campaigns")->where("company_id", session('using_company'))->whereIn('id', $get_ids)->get();
            if (!empty($get_ids)) {
                $boards = Board::where('id', $get_ids[0])->where("company_id", session('using_company'))->get();
            } else {

                return response()->json(['message' => 'Unauthorized access'], 401);

            }
        }

        // var_dump($get_ids);

        if ($request->get('archived')) {
            $archived = $request->get('archived');
        } else {
            $archived = 0;
        }

        $company = Company::findOrFail(session('using_company'));

        /// var_dump($company);

        // Get current board and neccessary campaign, location and team information

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
            return response()->json(['boards' => $boards], 200);
        }

        // Setup initial variables
        //TODO : Cleaned up unused variables
        $tasks      = [];
        $tagsArr    = [];
        $users_list = json_encode([]);
        $users      = json_encode([]);
        $teams      = Team::whereCompanyId(session('using_company'))->get();
        $locations  = [];

        // Loop through locations to get relevant tags, tag ids needed in seperate array
        $locations_list = Location::currentCompany()->orderBy('id', 'asc')->get();
        foreach ($locations_list as $l) { 

            $tags = [];

            $rawTags = DB::table('taggables')
                        ->where('taggable_id', $l->id)
                        ->where('taggable_type', 'Wink\Location')
                        ->get();

            foreach ($rawTags as $t) {
                $tags[]    = $t->tag_id;
                $tagsArr[] = $t->tag_id;
            }
            $l['tags']   = $tags;
            $locations[] = $l;
        }

        $locations = json_encode($locations);
        $tags      = Tag::whereIn('id', $tagsArr)->get();


        return view('boards.index', compact('tasks', 'locations', 'tags', 'teams', 'users', 'boards', 'boards_list', 'company'));
    }

    /**
     * Show archived projects
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function archived(Request $request)
    {

        // Get all company boards with campaign counts
        $boards_list = Board::withCount("campaigns")->where("company_id", session('using_company'))->get();

        $company = Company::whereId(session('using_company'))->first();
        // Get current board and neccessary campaign, location and team information
        $boards = Board::where('name', "General")->where("company_id", session('using_company'))->get();
        $boards->each(function ($board) {

            // Get all neccessary campaign data for board
            $campaigns = Campaign::currentCompany()->where("board_id", $board->id)->where("archived", 1)->with('questions.options', 'teams', 'users', 'company')->orderBy('id', 'desc')->get();
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

        return view('boards.index', compact('tasks', 'locations', 'tags', 'teams', 'users', 'boards', 'boards_list', 'company'));
    }
}
