<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['domain' => 'app.'. env('APP_DOMAIN_NAME')], function()
{

    Route::group(['prefix' => 'v1'], function(){

        // USER AND AUTHENTICATION ROUTES
        Route::resource('/authenticate', 'AuthenticateController', ['only' => ['index']]);
        Route::post('/authenticate', 'AuthenticateController@authenticate');
        Route::get('/authenticate/user', 'AuthenticateController@getAuthenticatedUser');
        Route::post('/register', ['as' => 'register.submit', 'uses' => 'Auth\RegisterController@mobileRegister']);

        // 
        Route::get('/account/history/{user_id}', ['as' => 'api.account.history', 'uses' =>  'UsersController@accountHistory']);
        Route::get('/task/history/{user_id}', ['as' => 'api.task.history', 'uses' =>  'TasksController@taskHistory']);
        Route::post('/user/create', 'UsersController@store');
        Route::post('/user/edit', ['as' => 'api.user.update', 'uses' =>  'UsersController@userDetailsUpdate']);
        Route::post('/user/payout/{user_id}', 'UsersController@paymentRequest');
        Route::get('/users/details/{user_id?}', ['as' => 'users.showDetails', 'uses' => 'UsersController@showDetails']);
        Route::post('/account', ['as' => 'api.account.update', 'uses' =>  'UsersController@accountDetails']);
        

        // Company management routes
        Route::get('/companies', ['as' => 'company.showAll', 'uses' => 'CompaniesController@index']);
        Route::get('/companies/{company_id}', ['as' => 'company.single', 'uses' => 'CompaniesController@single']);
        Route::post('/companies/create', ['as' => 'company.create', 'uses' => 'CompaniesController@store']);
        Route::post('/companies/delete/{company_id}', ['as' => 'company.delete', 'uses' => 'CompaniesController@destroy']);
        Route::post('/companies/update/{company_id}', ['as' => 'companies.update', 'uses' => 'CompaniesController@update']);
        Route::get('/companies/balance', ['as' => 'company.balance', 'uses' => 'CompaniesController@balance']);
        Route::post('/companies/balance/update', ['as' => 'company.update', 'uses' => 'CompaniesController@update']);

        // Task management routes
        Route::post('/tasks/delete', ['as' => 'tasks.task_delete', 'uses' => 'TasksController@tasksDelete']);
        Route::post('/tasks/edit-approve/{id}', ['as' => 'tasks.task_edit', 'uses' => 'TasksController@tasksEditApprove']);
        Route::post('/tasks/approve', ['as' => 'tasks.task_approve', 'uses' => 'TasksController@tasksApprove']);
        Route::get('/tasks/data/{id}', ['as' => 'tasks.show', 'uses' => 'TasksController@showSubmissionData']);

        // App submission and checkout
        Route::post('/device', 'DevicesController@store');
        Route::get('/tasks/{lat?}/{long?}', ['as' => 'api.tasks.all', 'uses' => 'TasksController@all']);
        Route::get('/task/{id}', 'TasksController@single');
        Route::get('/campaign/questions/{id}', 'CampaignsController@campaignQuestions');
        Route::post('/checkout/{id}', 'TasksController@checkout');
        Route::post('/answers/{id}', 'TasksController@saveMobileAnswers');
        Route::post('/image/save', ['as' => 'images.save', 'uses' => 'ImagesController@save']);

    });

});