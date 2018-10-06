<?php

namespace Wink\Http\Controllers;

use Auth;
use DB;
use Excel;
use Illuminate\Http\Request;
use Validator;
use Wink\Board;
use Wink\Campaign;
use Wink\CampaignLocation;
use Wink\CompanyRoleUser;
use Wink\Http\Requests\LocationPostRequest;
use Wink\Location;
use Wink\Tag;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $currentUserRole = CompanyRoleUser::where('user_id', Auth::user()->id)->where('company_id', session('using_company'))->where('role_id', '<', 3)->get()->toArray();
        if (empty($currentUserRole)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        $locations = DB::table('locations')->where('company_id', session('using_company'))->get();
        $locations->each(function ($location) {
            $tags = Location::currentCompany()->with('tags')->where("id", $location->id)->orderBy('id', 'asc')->first();
            if (isset($tags->tags)) {
                $location->tags = $tags->tags;
            }
        });
        $tags = Tag::currentCompany()->whereType('location')->get();

        $boards = Board::currentCompany()->get();

        return view('locations.index', compact('locations', 'boards', 'tags'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        $tags     = Tag::currentCompany()->whereType('location')->get();
        $boards   = Board::currentCompany()->get();
        $location = false; // No current location to allow for form tags setup on edit

        return view('locations.create', compact('tags', 'boards', 'location'));

    }

    public function bulkUpload()
    {
        return view('locations.bulk');
    }

    /**
     * Handle bulk upload via an excel file
     *
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\JsonResponse|\Illuminate\View\View
     */
    public function saveBulkUpload(Request $request)
    {

        // The errors array
        $errors   = [];
        $complete = 0;

        $file = $request->file('excel');

        $reader = Excel::load($file);

        // reader methods
        $results = $reader->get();

        // for each of the results

        foreach ($results as $index => $location) {

            $location = json_decode(json_encode($location), true);

            // Validate the input
            $validator = $this->validator($location);

            if ($validator->fails()) {
                // Push to error array the reason
                foreach ((array) $validator->errors() as $key => $value) {
                    if (is_array($value)) {
                        foreach ($value as $a => $b) {
                            array_push($errors, [$index + 1, $b[0]]);
                        }
                    }
                }
                continue;
            }

            $location['company_id'] = session('using_company');

            // If not then add the row to the DB
            $savedLocation = Location::create($location);

            // update the added rows count
            $complete++;

        }

        return response()->json(['errors' => $errors, 'complete' => $complete]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LocationPostRequest $request)
    {

        $location = Location::create([
            'name'          => $request->get('name'),
            'address'       => $request->get('address'),
            'street_number' => $request->get('street_number'),
            'street'        => $request->get('street'),
            'suburb'        => $request->get('suburb'),
            'city'          => $request->get('city'),
            'postal_code'   => $request->get('postal_code'),
            'province'      => $request->get('province'),
            'country'       => $request->get('country'),
            'longitude'     => $request->get('longitude'),
            'latitude'      => $request->get('latitude'),
            'company_id'    => $request->session()->get('using_company'),
            'hash'          => hash('ripemd160', $request->get('name') . date('his'))
        ]);

        // Add tags with new location ID
        if ($request->tags) {

            foreach ($request->tags as $key => $value) {

                if ((string) (int) $value != $value) {
                    $value = Tag::create(['company_id' => session('using_company'), 'name' => $value, 'type' => 'location']);
                }

                $location->tags()->attach($value);
            }
        }

        return 200;

    }

    /**
     * Store all the locations for the given campaign.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addCampaignLocations(Request $request, $campaign_id)
    {
        // remove all current location links
        CampaignLocation::where('campaign_id', $campaign_id)->delete();

        // If the locations_unknown is true
        // Check if this location exists for this company and create if needed
        // It should have no GPS
        $unknown = $request->get('locations_unknown');

        if ($unknown) {

            $location = Location::firstOrCreate([
                'name'       => 'Unknown',
                'longitude'  => 0,
                'latitude'   => 0,
                'company_id' => $request->session()->get('using_company'),
            ]);

            // Update the campaign to show its a survey
            Campaign::find($campaign_id)
                ->update(['survey' => 1]);

            $location_ids = [$location->id];

        } else {

            // Update the campaign to show its not a survey
            Campaign::find($campaign_id)
                ->update(['survey' => 0]);

            $location_ids = $request->get('locations_array');
        }

        foreach ($location_ids as $key => $value) {
            try {
                CampaignLocation::firstOrCreate(['campaign_id' => $campaign_id, 'location_id' => $value]);
            } catch (\Illuminate\Database\QueryException $e) {
                return 500;
            }
        }

        return 200;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $location = Location::findOrFail($id);

        $tags = Tag::currentCompany()->whereType('location')->get();

        $boards = Board::currentCompany()->get();

        return view('locations.edit', compact('location', 'tags', 'boards'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(LocationPostRequest $request, $id)
    {

        $location = Location::whereId($id)->whereCompanyId($request->session()->get('using_company'))->first();

        if ($location !== null) {

            DB::beginTransaction();

            try {

                $location->update($request->all());

                $location->tags()->detach();

                if ($request->tags) {

                    foreach ($request->tags as $key => $value) {

                        if ((string) (int) $value != $value) {
                            $value = Tag::create(['company_id' => session('using_company'), 'name' => $value, 'type' => 'location']);
                        }

                        $location->tags()->attach($value);
                    }
                }

                DB::commit();

                return redirect('/locations');

            } catch (\Exception $e) {

                DB::rollback();

                flash()->error("Error", "There was an error saving the users");

                return redirect()->back();

            }

        } else {

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
        Location::destroy($id);

        return redirect('/locations');

    }

    /**
     * Get a validator for an incoming store request.
     *
     * @param  array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name'      => 'required',
            'address'   => 'required',
            'latitude'  => 'required',
            'longitude' => 'required',
        ]);
    }

}
