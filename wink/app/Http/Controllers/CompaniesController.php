<?php

namespace Wink\Http\Controllers;

use Artisan;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Wink\Company;
use Wink\Http\Controllers\Controller;
use Wink\Location;
use Wink\Team;
use Wink\User;

class CompaniesController extends Controller
{

    /**
     * Show listing of companies
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        if (Auth::user()->email != 'phil@kiwidc.com' && Auth::user()->email != 'mike.metelerkamp@gmail.com') {

            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $companies = Company::where('subdomain', '<>', 'app')->get();

        if ($request->isJson()) {
            return response()->json(['data' => $companies], 200);
        }

        $user = json_encode(Auth::user()->email);

        return view('companies.index', compact('companies', 'user'));
    }


    /**
     * Show single company
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */

    public function single(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        if ($request->isJson()) {
            return response()->json(['data' => $company], 200);
        }

        return view('companies.index', compact('company'));
    }

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

            $hash = hash('md5', $request->get('name') . $request->get('subdomain'));

            $company = Company::create([
                'name'         => $request->get('name'),
                'subdomain'    => $request->get('subdomain'),
                'balance'      => $request->get('balance'),
                'rewards'      => $request->get('rewards'),
                'company_hash' => $hash,
            ]);

            // Add default location for survey tasks
            $location = Location::create([
                'company_id' => $company->id,
                'name'       => 'Unknown',
                'address'    => 'NULL',
                'latitude'   => '0',
                'longitude'  => '0',
            ]);

            // Add default team
            $team = Team::create([
                'company_id'  => $company->id,
                'name'        => 'All Agents',
                'description' => '',
            ]);

            DB::commit();

            if ($request->isJson()) {
                return response()->json(['message' => 'Company created successfully'], 200);
            }

            flash()->error("Error", "Company created successfully");

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error creating the company'], 400);
            }

            flash()->error("Error", "There was an error creating the company");

        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $company = Company::whereId($id)->first();

        $this->checkCompanyStructure($company->id);

        if ($request->isJson()) {
            $data = json_decode($request->getContent(), true);
        } else {
            $data = $request->all();
        }

        if ($company !== null && !empty($data)) {

            DB::beginTransaction();

            try {

                $company->update($data);

                DB::commit();

                if ($request->isJson()) {
                    return response()->json(['message' => 'Company updated successfully'], 200);
                }

            } catch (\Exception $e) {

                DB::rollback();

                if ($request->isJson()) {
                    return response()->json(['message' => 'There was an error updating the comapny'], 400);
                }

                flash()->error("Error", "There was an error updating the comapnyy");

                return redirect()->back();

            }

        } else {

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error updating the company'], 500);
            }

        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {

        if (Auth::user()->email == 'phil@kiwidc.com' && Auth::user()->email == 'mike.metelerkamp@gmail.com') {

            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        DB::beginTransaction();

        try {

            Company::destroy($id);

            DB::commit();

            if ($request->isJson()) {
                return response()->json(['message' => 'Company deleted successfully'], 200);
            }

        } catch (\Exception $e) {

            DB::rollback();

            if ($request->isJson()) {
                return response()->json(['message' => 'There was an error deleting the company'], 400);
            }

            flash()->error("Error", "There was an error deleting the company");

        }

    }

    /**
     * Change reward and balance information for the selected company
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function balance(Request $request)
    {

        // Ensure either Phil or Mike are logged in. 
        if (Auth::user()->email != 'phil@kiwidc.com' && Auth::user()->email != 'mike.metelerkamp@gmail.com') {

            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $companies = Company::all();

        return view('companies.balance', compact('companies'));
    }

    /**
     * Check and ensure company has company_hash and default team with all user assigned
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function checkCompanyStructure($id)
    {

        // Get company details and ensure it has correct structure and format
        $company = Company::whereId($id)->first();
        $team    = Team::where('company_id', $company->id)->where('name', 'All Agents')->first();
        $users   = User::where('initial_company_id', $company->id)->get();

        // Check if compny hash exists
        if ($company->company_hash == '' || $company->company_hash == null) {

            $hash = hash('md5', $company->name . $company->subdomain);

            $company->update(['company_hash' => $hash]);
            DB::statement("update companies set company_hash = '" . $hash . "' where id = '" . $company->id . "'");

        }

        // Check if default Team Exists
        if (!$team) {
            // Add default team
            $team = Team::create([
                'company_id'  => $company->id,
                'name'        => 'All Agents',
                'description' => '',
            ]);
        }

    }


    /**
     * Do reward payouts for eligable users
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function doRewardPayouts(Request $request)
    {

        if (Auth::user()->email != 'mike.metelerkamp@gmail.com') {

            return response()->json(['error' => 'invalid_credentials', 'status' => 401], 401);
        }

        Artisan::call('wink:reward_bulk_payout');
        return response()->json(['message' => 'ok', 'status' => 200], 200);

    }
}
