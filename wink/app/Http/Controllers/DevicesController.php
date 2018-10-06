<?php

namespace Wink\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use Wink\Device;
use Wink\Http\Requests;
use Wink\Http\Controllers\Controller;

class DevicesController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt.auth', ['only' => ['store']]);
        $this->middleware('cors', ['only' => ['store']]);
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validate($request, [
            'device_token' => 'required|unique:devices'
        ]);

        Device::create([
            'device_token' => $request->get('device_token'),
            'device_token_type' => $request->get('device_token_type'),
            'user_id' => Auth::user()->id
        ]);

        return 200;
        
    }
    
}
