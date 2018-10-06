<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', 'LoginController@index');

Route::any('login/benq', 'LoginController@redirectToProvider');
Route::any('logout/benq', 'LoginController@Logout');
Route::any('login/benq/callback', 'LoginController@handleProviderCallback');

// Route::any('test', 'Mock\MockController@test_Mock');

// Route::any('sync', 'Sync\SyncController@SyncInit');

//Route::get('startViaApi', 'Sync\SyncViaAPIController@index'); // Here is the route for API SYNC

