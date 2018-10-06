<?php

namespace Wink\Http\Controllers;

use Illuminate\Http\Request;

use Storage;
use Wink\Company;
use Wink\Http\Requests;
use Wink\Http\Controllers\Controller;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $company = Company::findOrFail(session('using_company'));

        return view('settings.index', compact('company'));
    }

}
