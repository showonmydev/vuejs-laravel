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
  /* ***************************** HERE START MOBILE API ***************************** */
  //Route::post('device/check/bdid', 'API\DeviceController@CheckDeviceFORAPI');
  
  Route::group(['prefix' => 'v1/device', 'middleware' => ['APICheck.Phone','jwt.auth', 'api', 'cors']], function () {
    Route::post('/check/bdid', 'API\DeviceController@CheckDeviceFORAPI');
    Route::post('/set/name', 'API\DeviceController@SetDeviceName');
    Route::post('/set/description', 'API\DeviceController@EditDescription');
    Route::post('/list/recent', 'API\DeviceController@GetDeviceListRecent');
    Route::post('/list/me', 'API\DeviceController@GetDeviceListByMe');
    Route::post('/am/list/{id}', 'API\DeviceController@GetDeviceAmList');
    Route::post('/am/list', 'API\DeviceController@GetDeviceAmListDeviceId');
    Route::post('/status', 'API\DeviceController@GetDeviceStatusAll');
    Route::post('/devicestatus', 'API\DeviceController@GetDeviceStatus');
    Route::post('/get/status', 'API\DeviceController@CheckStatus');
    Route::post('/set/netcfgmode','API\DeviceController@netcfgmode');
    Route::post('/set/ipaddrconfig','API\DeviceController@Setipaddrconfig');
    Route::post('/set/avmute','API\DeviceController@Setavmute');
    Route::post('/set/powermode','API\DeviceController@Setpowermode');
    Route::post('/set/inputsrc','API\DeviceController@Setinputsrc');
    Route::post('/set/audiomute','API\DeviceController@Setaudiomute');
    Route::post('/set/vollvl','API\DeviceController@Setvollvl');
    Route::post('/set/aspectratio','API\DeviceController@Setsetaspectratio');
    Route::post('/set/screenblank','API\DeviceController@Setscreenblank');
    Route::post('/set/pictmode','API\DeviceController@Setpictmode');
    Route::post('/set/reset','API\DeviceController@Setreset');
    
    Route::post('set/name','API\DeviceController@SetDeviceName');
    Route::post('/deviceinfo', 'API\DeviceController@GetdeviceinfoForRestAPI');
    Route::post('/add/new', 'API\DeviceController@AddNewDeviceViaAPI');
  });
  
  Route::group(['prefix' => 'v1/device', 'middleware' => ['APICheck.Phone', 'api', 'cors']], function () {
    Route::post('/register', 'API\DeviceController@registerDeviceDataTable');
    Route::any('/get/company/{id}', 'API\DeviceController@GetCompanyByDeviceID');
    Route::any('/get/companyid/{id}', 'API\DeviceController@GetCompanyDevID');
    Route::any('/get/user/{id}', 'API\DeviceController@WhoAddedDeviceByID');
    Route::post('/get/devicename/{id}', 'API\DeviceController@GetDeviceNameByDeviceID');
  });
  
  Route::group(['prefix' => 'v1/auth', 'middleware' => ['APICheck.Phone','api', 'cors']], function() {
    Route::post('account/login', 'LoginController@LoginViaAPI');
    Route::post('account/token/check', 'LoginController@TokenCheckViaAPI');
    Route::post('account/password/forget', 'LoginController@PasswordForget');
    Route::post('account/password/change', 'LoginController@PasswordChange');
    Route::post('account/verificationMail/resend', 'LoginController@ResendVerificationMail');
    Route::post('account/password/reset', 'LoginController@ResetPassword');
  });

  Route::group(['prefix' => 'v1/auth', 'middleware' => ['APICheck.Phone','jwt.auth','api', 'cors']], function() {
    Route::post('account/logout', 'LoginController@LogoutViaAPI');
  });

  Route::group(['prefix' => 'v1/','middleware' => ['APICheck.Phone','api', 'cors']], function() {
      Route::any('member/info', 'API\DeviceController@MemberFullInfo');
  });
  /* ***************************** END OF MOBILE API ***************************** */



  /* ***************************** DMS API START ***************************** */
  Route::group(['prefix' => 'device', 'middleware' => ['jwt.auth', 'cors']], function () {
      Route::post('/checkToken', function () {
          return 'Valid';
      });
  });
  Route::group(['prefix' => 'device', 'middleware' => ['jwt.auth','cors']], function () {
    Route::any('/sync', 'API\DeviceController@index');
  });

  Route::post('v1/device/registerNew', 'API\DeviceController@registerDeviceDataTable');

  // 'random.check' remove key
  Route::group(['prefix' => 'device', 'middleware' => ['jwt.auth', 'api', 'cors']], function () {
    Route::post('/get/status', 'API\DeviceController@CheckStatus');
    Route::post('/assign/app', 'API\DeviceController@AssignApp');
    Route::post('/check/deviceMQTT', 'API\DeviceController@deviceMQTTCheck');
    Route::get('/add/new', 'API\DeviceController@AddNew');
    Route::post('/check/bdid/DMS', 'API\DeviceController@CheckDevice');
    Route::post('/status/{settingsname}', 'API\DeviceController@GetDeviceSettingStatus');
    Route::post('/adding/metavalue', 'API\DeviceController@add_device_meta');
    Route::post('/adding/devicedata', 'API\DeviceController@add_device_data');
    Route::post('/add/new', 'API\DeviceController@AddNew');
    Route::post('/edit', 'API\DeviceController@EditDevice');
    Route::post('/delete', 'API\DeviceController@DeleteDevice');
    Route::post('/rename', 'API\DeviceController@RenameDevice');
    Route::post('/changeDevice', 'API\DeviceController@ChangeDevice');
    Route::post('/BulkChangeDevice', 'API\DeviceController@BulkChangeDevice');
    Route::post('/uploadcsv', 'API\DeviceController@csvImport');
    Route::post('/reset','API\DeviceController@ResetDeviceData');
    Route::post('/deviceinfo', 'API\DeviceController@Getdeviceinfo');
  });

  Route::group(['prefix' => 'group', 'middleware' => ['jwt.auth', 'api', 'cors']], function () {
    Route::post('/add/new', 'API\DeviceGroupController@AddNew');
    Route::post('/edit', 'API\DeviceGroupController@EditGroup');
    Route::post('/delete', 'API\DeviceGroupController@DeleteGroup');
    Route::post('/rename', 'API\DeviceGroupController@RenameGroup');
    Route::post('/sync', 'API\DeviceGroupController@index');
  });

  /* ------ Software Routes----------- */
  Route::post('device/app/list', 'API\ApplicationManagementController@getList');
  Route::post('device/app/add', 'API\ApplicationManagementController@addApplication');
  Route::post('device/Newupdate/list', 'API\ApplicationManagementController@ReqUpdateApplicationList');
  Route::post('device/Update/version', 'API\ApplicationManagementController@UpdateVersion');
  
  Route::group(['prefix' => 'app'], function () {
    Route::get('/list/{old?}', 'API\ApplicationManagementController@index');
    Route::get('/listviaSearch', 'API\ApplicationManagementController@listviaSearch');
    Route::post('/add/viaSearch', 'API\ApplicationManagementController@AddAppViaSearch');
    Route::get('/edit/{id}', 'API\ApplicationManagementController@editApp');
    Route::get('/list/{id?}', 'API\ApplicationManagementController@index');
    Route::get('/listAll', 'API\ApplicationManagementController@listAllApp');
    Route::post('/uninstall', 'API\ApplicationManagementController@uninstall');
  });

  Route::group(['prefix' => 'app', 'api', 'cors'], function () {
    Route::post('/add', 'API\ApplicationManagementController@addApplicationSep');
    Route::post('/update/{id}', 'API\ApplicationManagementController@updateApp');
    Route::delete('/delete/{id}', 'API\ApplicationManagementController@deleteApp');
  });
  // Route::group(['middleware' => ['CheckToken', 'cors']], function() {
    Route::get('login/test', 'LoginController@redirectToProvider');
  // });

  //   Route::group(['prefix' => 'sync'], function () {
  //     Route::get('startViaApi', 'Sync\SyncViaAPIController@index'); // Here is the route for API SYNC
  //     Route::get('startViaRabbit', 'Sync\SyncController@SyncInit'); // Here is the route for API SYNC
  //     Route::get('company/list', 'Sync\SyncViaAPIController@CompanyList');
  //     Route::get('company/getChangeId', 'Sync\SyncViaAPIController@getChangeId');
  //     Route::get('company/getMany', 'Sync\SyncViaAPIController@getMany');
  //     Route::get('company/getOne', 'Sync\SyncViaAPIController@getOne');
  //     Route::get('company/listWithAdmin', 'Sync\SyncViaAPIController@listWithAdmin');
  //     Route::get('company/searchWithAdmin', 'Sync\SyncViaAPIController@searchWithAdmin');
  //     Route::get('member/list', 'Sync\SyncViaAPIController@MemberList');
  //     Route::get('member/getChangeId', 'Sync\SyncViaAPIController@MemberGetChangeId');
  //     Route::get('member/getAdmin', 'Sync\SyncViaAPIController@MemberGetAdmin');
  //     Route::get('member/getMany', 'Sync\SyncViaAPIController@MemberGetMany');
  //     Route::get('member/getOne', 'Sync\SyncViaAPIController@MemberGetOne');
  //     Route::get('member/agreeFlag/change', 'Sync\SyncViaAPIController@MemberAgreeFlagChange');
  //     Route::get('si/company/list', 'Sync\SyncViaAPIController@SICompanyList');
  //     Route::get('si/permission/get', 'Sync\SyncViaAPIController@SIPermissionGet');
  // });

  /* --------MQTT API------------- */
  Route::group(['prefix' => 'mqtt'],  function () {
      Route::post('/test', 'MQTT\MqttController@test');
  });

/* ***************************** END OF DMS API ***************************** */
