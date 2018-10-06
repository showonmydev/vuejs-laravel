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

//Route::group(['middleware' => 'subdomain'], function () {

    // Authentication routes...
    Route::get('/login', ['as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);
    Route::get('/login/validate', ['as' => 'loginValidate', 'uses' => 'UsersController@loginValidate']);
    Route::post('/login', ['middleware' => 'setInitialCompany', 'uses' => 'Auth\LoginController@login']);
    Route::get('/logout', 'Auth\LoginController@logout');
    Route::post('/password/email', ['as' => 'password.email', 'uses' => 'Auth\ForgotPasswordController@sendResetLinkEmail']);
    Route::get('/password/reset', ['as' => 'password.request', 'uses' => 'Auth\ForgotPasswordController@showLinkRequestForm']);
    Route::get('/password/reset/complete', ['as' => 'password.compelte', 'uses' => 'UsersController@resetComplete']);
    Route::post('/password/reset', 'Auth\ResetPasswordController@reset');
    Route::get('/password/reset/{token}', ['as' => 'password.reset', 'uses' => 'Auth\ResetPasswordController@showResetForm']);
    Route::get('images/{filename}', ['as' => 'images.serve', 'uses' => 'ImagesController@serve']);

    // Registration routes...
    Route::get('/register', ['as' => 'register', 'uses' => 'RegistrationController@getRegister']);
    Route::post('/register', ['as' => 'register.submit', 'uses' => 'RegistrationController@postRegister']);
    Route::get('/complete_registration/{key}', ['as' => 'register.complete', 'uses' => 'RegistrationController@registerComplete']);
    Route::get('/complete_invitation/{key}', ['as' => 'register.invite', 'uses' => 'RegistrationController@invitationComplete']);
    Route::post('/complete_invitation', ['as' => 'register.submitinvite', 'uses' => 'RegistrationController@invitationSubmitted']);
    Route::get('/payments/{filename}', ['as' => 'payments_log', 'uses' => 'UsersController@showPaymentDoc']);

    Route::get('reports/location/{location_hash}/{campaign_hash}', ['as' => 'reports.view_single_location', 'uses' => 'ReportsController@showSingleLocation']);
    Route::get('reports/client/{campaign_hash}', ['as' => 'reports.view_single_location', 'uses' => 'ReportsController@showCampaign']);

    Route::get('reports/data/{id}', ['as' => 'reports.data', 'uses' => 'ReportsController@returnDataAsCsv']);
    Route::get('reports/single/{task_hash}', ['as' => 'reports.data', 'uses' => 'ReportsController@returnSingleDataAsCsv']);
    Route::get('reports/submission/{submission_hash?}', ['as' => 'reports.edit_submissions', 'uses' => 'ReportsController@showSubmissions']);

    Route::group(['middleware' => ['auth', 'canManage']], function () {

        Route::get('/locations/bulk', ['as' => 'locations.bulk', 'uses' => 'LocationsController@bulkUpload']);
        Route::post('/locations/bulk', ['as' => 'locations.bulkupload', 'uses' => 'LocationsController@saveBulkUpload']);
        Route::post('/locations/create', ['as' => 'locations.create', 'uses' => 'LocationsController@store']);
        Route::post('/locations/update/{location_id}', ['as' => 'locations.update', 'uses' => 'LocationsController@update']);
        Route::post('locations/campaign/{campaign_id}', ['as' => 'locations.campaignLocations', 'uses' => 'LocationsController@addCampaignLocations']);
        Route::resource('locations', 'LocationsController');

        Route::post('/users/addusers/{user_id}', ['as' => 'users.addusers', 'uses' => 'UsersController@addUsers']);
        Route::post('/users/removeuser/{user_id}', ['as' => 'users.removeuser', 'uses' => 'UsersController@removeUser']);
        Route::resource('users', 'UsersController');

        Route::post('/teams/addusers/{team_id}', ['as' => 'teams.addusers', 'uses' => 'TeamsController@addUsers']);
        Route::post('/teams/addexistingusers/{team_id}', ['as' => 'teams.addexistingusers', 'uses' => 'TeamsController@addExistingUsers']);
        Route::post('/teams/removeuser/{team_id}/{user_id}', ['as' => 'teams.removeuser', 'uses' => 'TeamsController@removeUser']);
         Route::post('/teams/removeinvited/{team_id}/{user_id}', ['as' => 'teams.removeuser', 'uses' => 'TeamsController@removeUser']);
       
        Route::resource('teams', 'TeamsController');

        Route::post('/board/{id}/manager/add', ['as' => 'boards.add_manager', 'uses' => 'BoardsController@add_manager']);
        Route::post('/board/{id}/manager/remove/{user_id}', ['as' => 'boards.remove_manager', 'uses' => 'BoardsController@remove_manager']);
        Route::resource('boards', 'BoardsController');

        Route::resource('companies', 'CompaniesController');
        Route::post('/companies/create', ['as' => 'locations.create', 'uses' => 'CompaniesController@store']);
        Route::post('/companies/update/{company_id}', ['as' => 'companies.update', 'uses' => 'CompaniesController@update']);
        Route::get('/companies/reward/payout', ['as' => 'companies.payout', 'uses' => 'CompaniesController@doRewardPayouts']);
        Route::get('companies/balance', ['as' => 'company.balance', 'uses' => 'CompaniesController@balance']);
        Route::post('companies/balance/update', ['as' => 'company.update', 'uses' => 'CompaniesController@update']);

        Route::get('campaigns/{id}/details', ['as' => 'campaigns.details', 'uses' => 'CampaignsController@details']);
        Route::get('campaigns/{id}/questionnaire', ['as' => 'campaigns.questionnaire', 'uses' => 'CampaignsController@questionnaire']);
        Route::get('campaigns/{id}/locations', ['as' => 'campaigns.locations', 'uses' => 'CampaignsController@locations']);
        Route::get('campaigns/{id}/distribute', ['as' => 'campaigns.distribute', 'uses' => 'CampaignsController@distribute']);
        Route::put('campaigns/launch/{id}', ['as' => 'campaigns.launch', 'uses' => 'CampaignsController@launch']);
        Route::post('campaigns/launch/update/{id}', ['as' => 'campaigns.launch', 'uses' => 'CampaignsController@launchUpdate']);
        Route::put('campaigns/update/{id}', ['as' => 'campaigns.update', 'uses' => 'CampaignsController@updateCampaignData']);
        Route::get('campaigns/{id}/archive', ['as' => 'campaigns.archive', 'uses' => 'CampaignsController@archive']);
        Route::get('campaigns/{id}/report', ['as' => 'campaigns.report', 'uses' => 'CampaignsController@taskReport']);
        Route::get('campaigns/{id}/location-data/{location_id}', ['as' => 'campaigns.report-data', 'uses' => 'CampaignsController@allLocationData']);
        Route::get('campaigns/{id}/report-data', ['as' => 'campaigns.report-data', 'uses' => 'CampaignsController@allReportData']);

        Route::get('campaign/questions/{id}', 'CampaignsController@campaignQuestions');
        Route::post('campaign/duplicate/{id}', 'CampaignsController@duplicate');
        Route::get('campaign/blank', 'CampaignsController@blankCampaign');
        Route::resource('campaigns', 'CampaignsController', ['except' => ['show', 'edit']]);

        Route::post('/questions/store/{campaign_id}', ['as' => 'questions.store', 'uses' => 'QuestionsController@store']);
        Route::post('/questions/update/{question_id}', ['as' => 'questions.update', 'uses' => 'QuestionsController@update']);
        Route::resource('questions', 'QuestionsController', ['except' => ['store', 'update']]);

        Route::post('/question_options/store/{question_id}', ['as' => 'question_options.store', 'uses' => 'QuestionOptionsController@store']);
        Route::post('/question_options/update/{question_id}', ['as' => 'question_options.update', 'uses' => 'QuestionOptionsController@update']);
        Route::resource('question_options', 'QuestionOptionsController', ['except' => ['store', 'update']]);

        Route::get('reports/campaign/{id}', ['as' => 'reports.show_campaign', 'uses' => 'ReportsController@showCampaign']);
        Route::get('reports/campaign/{id}/submissions/{sub_id?}', ['as' => 'reports.edit_submissions', 'uses' => 'ReportsController@editSubmissions']);
        Route::get('reports/response/{id}', ['as' => 'reports.view_single_response', 'uses' => 'ReportsController@showSingleResponse']);

        Route::resource('settings', 'SettingsController');

        //Route::post('campaigns', );

        Route::post('alerts', ['as' => 'campaigns.alert', 'uses' => 'CampaignsController@alertCreate']);
        Route::post('alerts/{id}', ['as' => 'campaigns.alert_edit', 'uses' => 'CampaignsController@alertEdit']);
        Route::post('tasks/delete', ['as' => 'tasks.task_delete', 'uses' => 'TasksController@tasksDelete']);
        Route::post('tasks/edit-approve/{id}', ['as' => 'tasks.task_edit', 'uses' => 'TasksController@tasksEditApprove']);
        Route::post('tasks/approve', ['as' => 'tasks.task_approve', 'uses' => 'TasksController@tasksApprove']);

    });

    Route::group(['middleware' => ['auth']], function () {

        Route::get('/', ['as' => 'dashboard', 'uses' => 'DashboardController@dashboardNew']);
        Route::get('/home', ['uses' => 'DashboardController@dashboardNew']);
        Route::get('/archived', ['uses' => 'DashboardController@archived']);

        Route::get('/campaigns/{id}', ['as' => 'campaigns.show', 'uses' => 'CampaignsController@show']);

        Route::get('/tasks/{id}', ['as' => 'tasks.show', 'uses' => 'TasksController@show']);
        Route::post('/task/flag/{id}', 'TasksController@toggleReviewFlag');
        Route::get('/tasks/data/{id}', ['as' => 'tasks.show', 'uses' => 'TasksController@showSubmissionData']);
        Route::post('/tasks/saveAnswers/{id}', ['as' => 'tasks.saveAnswers', 'uses' => 'TasksController@saveAnswers']);

    });

    Route::group(['prefix' => 'api/v1'], function () {
        // DESKTOP API APP ROUTES
        Route::group(['middleware' => ['auth']], function () {

            Route::post('/locations/bulk', 'LocationsController@saveBulkUpload');

        });

    });

//});
