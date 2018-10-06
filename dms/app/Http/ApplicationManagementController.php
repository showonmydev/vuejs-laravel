<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Model\Application;
use DB;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Model\ApplicationMapDevice;
use App\Model\App;
use App\Model\AppVersion;
use ResponseJson;
use Validator;
use Storage;

class ApplicationManagementController extends Controller
{
    private $ForLog;
    public function __construct()
    {
        $this->ForLog = new ResponseJson();
    }

    public function index($id = '')
    {
        $appModel = new Application();
            if ($id != "undefined" && $id != "") {
                return $this->editApp($id);
            } else {
                $data = [];
                try {
                    $Oldresults  = AppVersion::with('getAppVersion')->where('created_at', '>', date('Y-m-d H:i:s', strtotime('-2 weeks')))->get()->toArray();
                    // echo '<pre>';
                    //  print_r($results);
                    //  die;
                        
                    $results  = AppVersion::with('getAppVersion')->orderBy('version_name', 'DESC')->get()->toArray();
                    if ($results) {
                        $applicationList = [];
                        foreach ($Oldresults as $key => $value1) {
                            $appOlderVersion[] = $value1['id'];
                        }
                        foreach ($results as $key => $value) {
                            //dd($value);
                            if ($value['status'] == 1) {
                                $applicationList[] = array(
                                    'id'            => $value['id'],
                                    'appId'         => $value['app_id'],
                                    'app_name'      => $value['get_app_version']['name'],
                                    'description'   => $value['get_app_version']['description'],
                                    'version'       => $value['version_name'],
                                    'date_modified' => $value['get_app_version']['updated_at'],
                                    'file_name'     => $value['version_name'],
                                    'size'          => $value['size'].$value['md5'],
                                    'isLatest'      => ($value['status'] == 2 ? false : true),
                                    'date_uploaded' => $value['get_app_version']['created_at'],
                                );
                            }
                        }
                        $data['status'] = 200;
                        $data['result'] = $applicationList;
                    } else {
                        $data['status']  = 404;
                        $data['message'] = 'No data found';
                    }
                } catch (\Illuminate\Database\QueryException $ex) {
                    $data['status']  = 500;
                    $data['message'] = $ex->getMessage();
                }
            }
        return response()->json($data);
    }

    public function listviaSearch(Request $request)
    {
        $data = [];
        try {
            $appModel = new Application();
                $results    = App::with('getAppVersion')->get()->toArray();
                // echo '<pre>';
                // print_r($results);
                // die;
                if ($results) {
                    $applicationList = [];
                    foreach ($results as $key => $value) {
                        if(!ApplicationMapDevice::where('deviceId',$request->deviceId)->where('appId',$value['id'])->count()){
                            $applicationList[] = array(
                                'id'            => $value['get_app_version']['id'],
                                'appId'         => $value['id'],
                                'app_name'      => $value['name'],
                                'description'   => $value['description'],
                                'version'       => $value['get_app_version']['version_name'],
                                'date_modified' => $value['updated_at'],
                                'file_name'     => $value['get_app_version']['version_name'],
                                'size'          => $value['get_app_version']['size'].$value['get_app_version']['md5'],
                                'isLatest'      => $value['get_app_version']['status'],
                                'date_uploaded' => $value['created_at'],
                            );
                        }  
                    }
                    $data['status'] = 200;
                    $data['result'] = $applicationList;
                } else {
                    $data['status']  = 404;
                    $data['message'] = 'No data found';
                }
        } catch (\Illuminate\Database\QueryException $ex) {
            $data['status']  = 500;
            $data['message'] = $ex->getMessage();
        }

        return response()->json($data);
    }

    public function listAllApp()
    {
        $data = [];
        $appOlderVersion = [];
        try {   
                $results  = AppVersion::with('getAppVersion')->orderBy('version_name', 'DESC')->get()->toArray();
                if ($results) {
                    $applicationList = [];
                    foreach ($results as $key => $value) {
                        //dd($value);
                        $applicationList[] = array(
                            'id'            => $value['id'],
                            'appId'         => $value['app_id'],
                            'app_name'      => $value['get_app_version']['name'],
                            'description'   => $value['get_app_version']['description'],
                            'version'       => $value['version_name'],
                            'date_modified' => $value['get_app_version']['updated_at'],
                            'file_name'     => $value['version_name'],
                            'size'          => $value['size'].$value['md5'],
                            'isLatest'      => ($value['status'] == 2 ? false : true),
                            'date_uploaded' => $value['get_app_version']['created_at'],
                        );
                    }
                    $data['status'] = 200;
                    $data['result'] = $applicationList;
                } else {
                    $data['status']  = 404;
                    $data['message'] = 'No data found';
                }
        } catch (\Illuminate\Database\QueryException $ex) {
            $data['status']  = 500;
            $data['message'] = $ex->getMessage();
        }

        return response()->json($data);
    }

    // public function addNew(Request $request)
    // {
    //     //echo "<pre>"; print_r($request->all()); echo "</pre>";exit;
    //     $data = [];
    //     try {
    //         if (trim($request->input('app_name')) != '') {
    //             if (trim($request->input('description')) != '') {
    //                 if (trim($request->input('version')) != '') {
    //                     if ($request->file('file')) {
    //                         //Set filename
    //                         $file_name = $request->input('file_name') != '' ? $request->input('file_name') . '.' . $request->file('file')->getClientOriginalExtension() : $request->file('file')->getClientOriginalName();

    //                         //Get file size
    //                         $size = $request->file('file')->getClientSize() / (1024 * 1024);

    //                         //Set file upload destination
    //                         $destination = base_path() . '/public/software_files';

    //                         //Check if file already exists
    //                         if (file_exists($destination . '/' . strtolower($file_name))) {
    //                             $data['status']  = 400;
    //                             $data['message'] = 'File with this name ' . $file_name . ' already exists';
    //                         } else {
    //                             //Insert app data
    //                             $appId = DB::table('softwares')->insertGetId(['app_name' => $request->input('app_name'), 'description' => $request->input('description'), 'version' => $request->input('version'), 'size' => ceil($size) . 'MB']);
    //                             if ($appId) {
    //                                 //Upload file
    //                                 $request->file('file')->move($destination, strtolower($file_name));

    //                                 //Update filename
    //                                 DB::table('softwares')->where('id', $appId)->update(['file_name' => strtolower($file_name)]);

    //                                 $data['status']  = 200;
    //                                 $data['lastId']  = $appId;
    //                                 $data['message'] = "Added successfully";
    //                             } else {
    //                                 $data['status']  = 500;
    //                                 $data['message'] = 'Some error occured';
    //                             }
    //                         }

    //                     } else {
    //                          $data['status']  = 422;
    //                          $data['message'] = "Please choose file";
    //                     }
    //                 } else {
    //                     $data['status']  = 422;
    //                     $data['message'] = "Please enter app version";
    //                 }
    //             } else {
    //                 $data['status']  = 422;
    //                 $data['message'] = "Please enter app description";
    //             }
    //         } else {
    //             $data['status']  = 422;
    //             $data['message'] = "Please enter app name";
    //         }
    //     } catch (\Illuminate\Database\QueryException $ex) {
    //         $data['status']  = 500;
    //         $data['message'] = $ex->getMessage();
    //     }
    //     return response()->json($data);
    // }

    public function editApp($id)
    {
        $data = [];
        try {
            $appVersion = AppVersion::find($id);
            $app = App::where('id', $appVersion->app_id)->first();

            if ($app && $appVersion) {
                $data['status'] = 200;
                $data['result'] = ['id' => $appVersion->app_id, 'app_name' => $app->name, 'description' => $app->description, 'version' => $appVersion->version_name, 'size' => $appVersion->size, 'file_name' => '', 'date_modified' => $appVersion->date_modified, 'date_uploaded' => $appVersion->date_uploaded];
            } else {
                $data['status']  = 404;
                $data['message'] = 'No data found';
            }
        } catch (\Illuminate\Database\QueryException $ex) {
            $data['status']  = 500;
            $data['message'] = $ex->getMessage();
        }

        return response()->json($data);
    }

    public function updateApp($id, Request $request)
    {
        $data = [];
        try {
            if (trim($request->input('app_name')) != '') {
                if (trim($request->input('description')) != '') {
                    // Start New Code Here
                    $appVersionId = AppVersion::find($id);
                    if ($appVersionId) {
                        $appId = App::find($appVersionId->app_id);
                        $appId->name = $request->input('app_name');
                        $appId->description = $request->input('description');
                        $appId->save();
                        // Register in Log
                        $this->ForLog->Log_Event('Update ' . $request->app_name . ', Application, success',1);
                    } else {
                        $data['status']  = 500;
                        $data['message'] = "Record Not Found";
                        return response()->json($data);
                    }
                // End of new Code
                } else {
                    $data['status']  = 422;
                    $data['message'] = "Please enter app description";
                    return response()->json($data);
                }
            } else {
                $data['status']  = 422;
                $data['message'] = "Please enter app name";
                return response()->json($data);
            }

            $data['status'] = 200;
            $data['result'] = "App data updated successfully";
        } catch (\Illuminate\Database\QueryException $ex) {
            $data['status']  = 500;
            $data['message'] = $ex->getMessage();
        }

        return response()->json($data);
    }

    public function deleteApp($id)
    {
        $data = [];
        try {
            $appVersion = AppVersion::find($id);

            if ($appVersion) {
                $DeleteFrmVersion= AppVersion::where('app_id', $appVersion->app_id)->where('status','=',1)->delete();
                //$DeleteFrmApp    = App::where('id', $appVersion->app_id)->delete();
                $DeleteFrmMapTbl = ApplicationMapDevice::where('appId', $appVersion->app_id)->delete();
                if ($DeleteFrmVersion) {
                    $data['status']  = 200;
                    $data['message'] = "Deleted successfully";
                }
                // Register in Log
                $this->ForLog->Log_Event('Delete ' . App::where('id',$appVersion->app_id)->first()->name . ', Application, success',1);
            } else {
                $data['status']  = 500;
                $data['message'] = 'Some error occured';
            }
        } catch (\Illuminate\Database\QueryException $ex) {
            $data['status']  = 500;
            $data['message'] = $ex->getMessage();
        }
        return response()->json($data);
    }

    public function getList(Request $request)
    {
        $Data = [];
        if ($request->deviceId) {
            $Data['responce'] = ApplicationMapDevice::with('getApp')->where('deviceId', $request->deviceId)->get();
        } else {
            $Data['responce'] = 'Not Found';
        }
        $obj = new ResponseJson();
        return $obj->Send($Data, 200);
    }

    // Created new add application function
    public function addApplicationSep(Request $request)
    {
        $obj = new ResponseJson();
        $Data = [];
        $rules = array(
          'app_name' => 'required',
          'description' => 'required',
          'version' => 'required'
        );
        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
        } else {
            if ($request->file('file')) {
                //Set filename
                $file_name = $request->input('app_name') != '' ? $request->input('file_name') . '.' . $request->file('file')->getClientOriginalExtension() : $request->file('file')->getClientOriginalName();

                //Get file size
                $size = $request->file('file')->getClientSize() / (1024 * 1024);

                //Set file upload destination
                //$destination = base_path() . '/public/software_files';
				  // S3 Upload
				  $url = 'https://s3.' . env('AWS_DEFAULT_REGION') . '.amazonaws.com/' . env('AWS_BUCKET') . '/';
				  $image = $request->file;
				  $imageFileName = $file_name;
				  $s3 = Storage::disk('s3');
                  $filePath = $imageFileName;

				  // End S3 Upload
                //Check if file already exists
                if (file_exists($url . '/' . strtolower($file_name))) {
                    $Data['status']  = 400;
                    $Data['message'] = 'File with this name ' . $file_name . ' already exists';
                } else {
                    //Upload file
                    //$request->file('file')->move($destination, strtolower($file_name));
					$respones = $s3->put($filePath, file_get_contents($image));  

                    $client = $s3->getDriver()->getAdapter()->getClient();
                    $expiry = "+60 minutes";
                    $command = $client->getCommand('GetObject', [
                        //'Bucket' => \Config::get('filesystems.disks.s3.bucket'),
                        'Bucket' => env('AWS_BUCKET'),
                        'Key'    => $file_name
                    ]);
                    // Get the actual presigned-url
                    $request1 = $client->createPresignedRequest($command, $expiry);
                    $presignedUrl = (string)$request1->getUri();
                    //////////////////////////////////////
                    $App = [
                        'name' => $request->app_name,
                        'package_name' => $request->app_name,
                        'description' => $request->description,
                        'company_id' => $request->company_id,
                        'created_user' => Auth::id(),
                        'updated_user' => Auth::id(),
                        'created_at' => date("Y-m-d H:i:s"),
                        'updated_at' => date("Y-m-d H:i:s")
                    ];
                    if (isset($request->AppId) && $request->AppId != "undefined") {
                        $AppID = $request->AppId;
                        $AppUpdate = App::where('id', $request->AppId)->update($App);

                        // Register in Log
                        $this->ForLog->Log_Event('Update ' . $request->app_name . ', Application, success',1);
                    } else {
                        $AppID = App::insertGetId($App);

                        // Register in Log
                        $this->ForLog->Log_Event('Add ' . $request->app_name . ', Application, success',1);
                    }
                    if ($AppID) {
                        $AppVersion = [
                            'app_id' => $AppID,
                            'version_code' => $request->version[0],
                            'version_name' => $request->version,
                            //'url' => $url.'/'.$file_name,
                            'url' => $presignedUrl,
                            'created_user' => Auth::id(),
                            'updated_user' => Auth::id(),
                            'created_at' => date("Y-m-d H:i:s"),
                            'updated_at' => date("Y-m-d H:i:s"),
                            'md5' => 'MB',
                            'size' => $size,
                            'status' => 1,
                        ];
                        AppVersion::where('app_id',$AppID)->update(['status'=>2]);
                        if (isset($request->AppversionId)) {
                            // Register in Log
                            $this->ForLog->Log_Event('Update ' . $request->app_name .' '. $request->version. ', Version, success',1);
                            AppVersion::where('id', $request->AppversionId)->update($AppVersion);
                        } else {
                            // Register in Log
                            $this->ForLog->Log_Event('Add ' . $request->app_name .' '. $request->version. ', Version, success',1);
                            AppVersion::insert($AppVersion);
                        }
                    }
                    $res = false;
                    if ($AppID) {
                        $Data['status']  = 200;
                        $Data['lastId']  = 200;
                        $Data['message']  = 200;
                        $Data['responce'] = 'Application has been Added';
                        $Data['status'] = 200;
                    } else {
                        $Data['responce'] = 'Somthing Went Wrong';
                    }
                    /////////////////////////////////////
                }
            }
        }
        return $obj->Send($Data, 200);
    }

    public function addApplication(Request $request)
    {
        $obj = new ResponseJson();
        $Data = [];
        $rules = array(
          'deviceId' => 'required',
          'app_name' => 'required',
          'description' => 'required',
        );
        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $Data['message'] = $validator->errors()->all();
        } else {
            if ($request->file('file')!=null) {
                //Set filename
                $file_name = $request->input('app_name') != '' ? $request->input('file_name') . '.' . $request->file('file')->getClientOriginalExtension() : $request->file('file')->getClientOriginalName();

                //Get file size
                $size = $request->file('file')->getClientSize() / (1024 * 1024);

                //Set file upload destination
                //$destination = base_path() . '/public/software_files';
				  // S3 Upload
				  $url = 'https://s3.' . env('AWS_DEFAULT_REGION') . '.amazonaws.com/' . env('AWS_BUCKET') . '/';
				  $image = $request->file;
				  $imageFileName = $file_name;
				  $s3 = Storage::disk('s3');
                  $filePath = $imageFileName;

				  // End S3 Upload
                //Check if file already exists
                if (file_exists($url . '/' . strtolower($file_name))) {
                    $Data['status']  = 400;
                    $Data['message'] = 'File with this name ' . $file_name . ' already exists';
                } else {
                    //Upload file
                    //$request->file('file')->move($destination, strtolower($file_name));
					$respones = $s3->put($filePath, file_get_contents($image));  

                    $client = $s3->getDriver()->getAdapter()->getClient();
                    $expiry = "+60 minutes";
                    $command = $client->getCommand('GetObject', [
                        //'Bucket' => \Config::get('filesystems.disks.s3.bucket'),
                        'Bucket' => env('AWS_BUCKET'),
                        'Key'    => $file_name
                    ]);
                    // Get the actual presigned-url
                    $request1 = $client->createPresignedRequest($command, $expiry);
                    $presignedUrl = (string)$request1->getUri();
                    //////////////////////////////////////
                    $App = [
                        'name' => $request->app_name,
                        'package_name' => $request->app_name,
                        'description' => $request->description,
                        'company_id' => $request->company_id,
                        'created_user' => Auth::id(),
                        'updated_user' => Auth::id(),
                        'created_at' => date("Y-m-d H:i:s"),
                        'updated_at' => date("Y-m-d H:i:s")
                    ];
                    if (isset($request->AppId) && $request->AppId != "undefined") {
                        $AppID = $request->AppId;
                        $AppUpdate = App::where('id', $request->AppId)->update($App);

                        // Register in Log
                        $this->ForLog->Log_Event('Update ' . $request->app_name . ', Application, success',1);
                    } else {
                        $AppID = App::insertGetId($App);

                        // Register in Log
                        $this->ForLog->Log_Event('created ' . $request->app_name . ', Application, success',1);
                    }
                    
                    
                    if ($AppID) {
                        $AppVersion = [
                            'app_id' => $AppID,
                            'version_code' => $request->version[0],
                            'version_name' => $request->version,
                            //'url' => $url.'/'.$file_name,
                            'url' => $presignedUrl,
                            'created_user' => Auth::id(),
                            'updated_user' => Auth::id(),
                            'created_at' => date("Y-m-d H:i:s"),
                            'updated_at' => date("Y-m-d H:i:s"),
                            'md5' => 'MB',
                            'size' => $size,
                            'status' => 1
                        ];
                        AppVersion::where('app_id',$AppID)->update(['status'=>2]);
                        if (isset($request->AppversionId)) {
                            $AppVer = AppVersion::where('id', $request->AppversionId)->get();
                            if($AppVer){
                                if($AppVer->version_name == $request->version){
                                    AppVersion::where('id', $request->AppversionId)->update($AppVersion);
                                    // Register in Log
                                    $this->ForLog->Log_Event('Update ' . $request->app_name .' '. $request->version. ', Version, success',1);
                                } else {
                                    AppVersion::insert($AppVersion);  

                                    // Register in Log
                                    $this->ForLog->Log_Event('Add ' . $request->app_name .' '. $request->version. ', Version, success',1);
                                }
                            }
                        } else {
                            AppVersion::insert($AppVersion);
                        }
                    }
                    $res = false;
                    if ($AppID) {
                        $MQTTAPPInstall = ["appname"=>$request->app_name,"appinstallid"=>$AppID,"apkfilepath"=>$presignedUrl,"appver"=>$request->version];
                        $res = $this->ForLog->SendRequestToShadoDB('post', $MQTTAPPInstall, 'device/am/install');
                        //Here Assign to Device Meta Table
                        $Arr = ['deviceId'=>$request->deviceId,'appId'=>$AppID,'bdid'=>$request->bdid];
                        $res = ApplicationMapDevice::insert($Arr);

                        // Register in Log
                        $this->ForLog->Log_Event('Assign ' . $request->app_name . ', Application To Device , success',1);

                        $Data['status']  = 200;
                        $Data['lastId']  = 200;
                        $Data['message']  = 200;
                        $Data['responce'] = 'Application has been Added';
                        $Data['status'] = 200;
                    } else {
                        $Data['responce'] = 'Somthing Went Wrong';
                    }
                    /////////////////////////////////////
                }

                

            } else {
                $res = false;
                $App = [
                    'name' => $request->app_name,
                    'package_name' => $request->app_name,
                    'description' => $request->description,
                    'updated_user' => Auth::id(),
                    'updated_at' => date("Y-m-d H:i:s")
                ];
                if (isset($request->appId)) {
                    $AppID = $request->appId;
                    $AppUpdate = App::where('id', $request->appId)->update($App);
                    // Register in Log
                    $this->ForLog->Log_Event('Update ' . $request->app_name . ', Application , success',1);
                    $res = true;
                } else {
                    $res = true;
                }
                if ($res) {
                    $Data['status'] = 200;
                    $Data['message'] = 'Application has been Updated';
                }
            }
        }
        return $obj->Send($Data, 200);
    }

    public function ReqUpdateApplicationList(Request $request)
    {
        $Data = [];
        if ($request->deviceId) {
            $Data['responce'] = ApplicationMapDevice::with('getApp')->where('deviceId', $request->deviceId)->get();
        } else {
            $Data['responce'] = 'Not Found';
        }
        $obj = new ResponseJson();
        return $obj->Send($Data, 200);
    }

    public function UpdateVersion(Request $request)
    {
        $obj = new ResponseJson();
        if (isset($request->deviceId) && isset($request->get_app['id']) && isset($request->get_app['get_need_update_version']['id'])) {
            $device_Id = $request->deviceId;
            $get_app = $request->get_app['id'];
            $updateId = $request->get_app['get_need_update_version']['id'];
            $res = AppVersion::where('app_id', $get_app)->update(['status'=>2]);
            $res = AppVersion::where('id', $updateId)->update(['status'=>1]);
            if ($res) {
                return $obj->Send(['error'=>'Device Updated Successfully!'], 200);
            }
        }
        return $obj->Send(['error'=>'Somthing Went Wrong!'], 200);
    }

    public function uninstall(Request $request)
    {
        $obj = new ResponseJson();
        if (isset($request->appId)) {
            AppVersion::where('app_id', $request->appId)->update(['status'=>2]);
            return $obj->Send(['error'=>'Device Updated Successfully!'], 200);
        }
        return $obj->Send(['error'=>'Somthing Went Wrong!'], 200);
    }

    public function AddAppViaSearch(Request $request)
    {
        $obj = new ResponseJson();
        $Data = [];
        $rules = array(
          'DeviceId' => 'required',
          'appId' => 'required',
          'bdid' => 'required'
        );
        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $Data['message'] = $validator->errors()->all();
        } else {
            $Arr = ['deviceId'=>$request->DeviceId,'appId'=>$request->appId,'bdid'=>$request->bdid];
            if(!ApplicationMapDevice::where('deviceId',$request->DeviceId)->where('appId',$request->appId)->where('bdid',$request->bdid)->count()){
                $res = ApplicationMapDevice::insert($Arr);
                $app = AppVersion::where('app_id',$request->appId)->first();
                $appName = App::where('id',$request->appId)->first();
                $MQTTAPPInstall = ["appname"=>$appName->name,"appinstallid"=>$request->appId,"apkfilepath"=>$app->url,"appver"=>$app->version_name];
                $res = $this->ForLog->SendRequestToShadoDB('post', $MQTTAPPInstall, 'device/am/install');
                return $obj->Send(['success'=>'Application Added Successfully'], 200);
            } else {
                return $obj->Send(['success'=>'This Application is Already Added'], 200);
            }
        }
        return $obj->Send(['error'=>'Somthing Went Wrong!'], 200);
    }
}
