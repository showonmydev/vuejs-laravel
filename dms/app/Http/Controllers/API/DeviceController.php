<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Response;
use ResponseJson;
use Session;
use Image;
use DB;
use App\Model\Device;
use App\Model\DeviceGroup;
use App\Model\DeviceMeta;
use App\Model\DeviceData;
use App\Model\Member;
use Validator;
use Excel;
use JWTAuth;
use Auth;
use App\User;
use App\Logs;
use App\Model\Company;
use Exception;

class DeviceController extends Controller
{
    private $JSONSend;
    private $Device;
    private $DeviceGroup;
    private $ForLog;
    private $DeviceMeta;
    private $DeviceData;
    private $Helper;
    private $User;

    public function __construct()
    {
        $this->Device = new Device();
        $this->DeviceGroup = new DeviceGroup();
        $this->DeviceMeta = new DeviceMeta();
        $this->DeviceData = new DeviceData();
        $this->JSONSend = new ResponseJson();
        $this->ForLog = new ResponseJson();
        $this->Helper = new ResponseJson();
        if (Auth::check()) {
            $this->User = Auth::user();
        }
    }

    /*
      Default Function for Sync Device
     * */

    public function index(Request $request)
    {
        /* $CURL = ['userID' => 12, 'Get' => 12];
          dd($this->ForLog->GetCallFromAnotherServe('post', $CURL, 'test'));
         */
        $Data = [];
        if (Auth::check()) {
            $user = Auth::user();
            $id = Auth::id();
            $request->user();
            $company = Company::where("mct_company_id", $user->company_id)->first();

            //$Data['AllDevice'] = $this->Device->all()->where('company_id', $company->id)->where('created_user', $id);
            try {
                $role = ($this->User->role == 3 ? 2 : 1 );
                $res_date = $this->Device->with('dms_equipment', 'device_data')
                ->where('created_user', $id)
                ->where('company_id', $user->company_id)
                ->where(function ($query) use ($role) {
                    if ($role==2) {
                        $query->where('created_user', $this->User->id);
                    }
                })
                ->get();
                //get data in json format
                $Data['AllDevice'] = collect($res_date)->toArray();
            } catch (\Illuminate\Database\QueryException $ex) {
                $Data['error'] = $ex->getMessage();
            }
            if ($role==2) {
                $Data['AllGroup'] = $this->DeviceGroup->all()->where('company_id', $company->id)->where('created_user', $id);
                $Data['AllCompany'] = Company::where('id',$company->id)->get()->toArray();
                $Data['role'] = 2;
            } else {
                $Data['AllGroup'] = $this->DeviceGroup->all();
                $Data['AllCompany'] = Company::all();

                // $Data['AllCompany'] = DB::select("SELECT A.*, A.name, D.* FROM dms_company A
                //             LEFT JOIN dms_nation_region B ON A.nation_region_id = B.id 
                //             LEFT JOIN dms_region C ON B.region_id = C.id
                //             LEFT JOIN dms_region_manager D ON C.id = D.region_id
                //             WHERE D.mct_member_id = $id");
                //dd($Comp);

                $Data['AllDevice'] = $this->Device->with('dms_equipment', 'device_data')->get()->toArray();
                $Data['role'] = 1;
            }
            $Data['log'] = Logs::where('user_id', $id)->orderBy('id', 'desc')->get();
            $Data['lastlog'] = Logs::all()->where('user_id', $id)->where('type', 1)->last();
            $Data['user'] = ['name'=>$this->User->name, 'email'=>$this->User->email, 'role'=>$role];
            return $this->JSONSend->Send($Data, 200);
        } else {
            $Data['error'] = 'Error';
            return $this->JSONSend->Send($Data, 400);
        }
    }

    /*
     * Edit Device
     * */

    public function EditDevice(Request $request)
    {
        $Data = [];
        //Set device data
        $CURL = ['userID' => 12, 'Get' => 12];
        $bnQ_res = $this->ForLog->GetCallFromAnotherServe('post', $CURL, 'mock/device/add/new');
        if ($bnQ_res['status'] = '200') {
            $Data['success'] = $bnQ_res['success'];
            return $this->JSONSend->Send($Data, 200);
        }
    }

    /*
     * Delete Device
     * */

    public function DeleteDevice(Request $request)
    {
        /* For Deleting Device
          {deviceID: "4", groupId: "2", company_id: "1", _token: "hgsdhgjdsfjkfgdsk", access_token: "sdfjkhfdsjkjhksj"}
         */
        // dd($request->all());


        $Data = [];
        $rules = array(
            'deviceID' => 'required',
            'groupId' => 'required',
            'company_id' => 'required',
        );
        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);


        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 200);
        } else {
            $check = $this->Device->where('id', $request->deviceID)->delete();
            $count = $this->Device->count();
            // Register in Log
            if (isset($request->log)) {
                $this->ForLog->Log_Event($request->log);
            }

            if ($check) {
                $Data['sucess'] = '200';
                $Data['count'] = $count;
                return $this->JSONSend->Send($Data, 200);
            }
        }
    }

    /* Bulk changes device */

    public function BulkChangeDevice(Request $request)
    {

        /* Here is bulk device drop response data
          [
          {"deviceId":4,"parentId":5,"company_id":"1","_token":"hgsdhgjdsfjkfgdsk","access_token":"sdfjkhfdsjkjhksj"},
          {"deviceId":3,"parentId":5,"company_id":"1","_token":"hgsdhgjdsfjkfgdsk","access_token":"sdfjkhfdsjkjhksj"},
          {"deviceId":2,"parentId":5,"company_id":"1","_token":"hgsdhgjdsfjkfgdsk","access_token":"sdfjkhfdsjkjhksj"}
          ]:
         */

        $rew = '{"AllDevice":[{"deviceId":5,"parent_id":5,"company_id":"1","_token":"hgsdhgjdsfjkfgdsk","access_token":"sdfjkhfdsjkjhksj"},
          {"deviceId":3,"parent_id":5,"company_id":"1","_token":"hgsdhgjdsfjkfgdsk","access_token":"sdfjkhfdsjkjhksj"},
          {"deviceId":2,"parent_id":5,"company_id":"1","_token":"hgsdhgjdsfjkfgdsk","access_token":"sdfjkhfdsjkjhksj"}
      ]}';

        $rw = json_decode($request->input('data'));
        $data = [];

        foreach ($rw as $request_device) {
            $did = $request_device->deviceId;
            $pid = $request_device->parent_id;
            if (!empty($did) && !empty($did)) {
                // code here
                $check = $this->Device->where('id', $did)->update(['group_id' => $pid]);
            }
        }

        if ($check) {
            $Data['sucess'] = '200';
        } else {
            $Data['error'] = 'Some error';
        }
        return $this->JSONSend->Send($Data, 200);
    }

    /*
    * Check Device BDID FOR API
    **/
    public function CheckDeviceFORAPI(Request $request)
    {
        $Data = [];
        $rules = array(
            'token' => 'required',
            'bdid' => 'required'
        );
        if(!isset($request->bdid)){
            return $this->JSONSend->Send(['error'=>'Required BDID'], 422);
        }else if(!isset($request->token)){
            return $this->JSONSend->Send(['error'=>'Required Token'], 422);
        }
        else {
            if($request->token){
                $token = JWTAuth::getToken();
                if ($token) {
                    try {
                        if (!JWTAuth::toUser($token)) {
                            return $this->JSONSend->Send(['error'=>'Invalid access token.'], 402);
                        }
                    } catch (Exception $e) {
                        if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                            return $this->JSONSend->Send(['error'=>'Invalid access token.'], 402);
                        } elseif ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                            return $this->JSONSend->Send(['error'=>'Invalid access token.'], 402);
                        } else {
                        }
                    }
                } else {
                    return $this->JSONSend->Send(['error'=>'Invalid access token.'], 402);
                }
            }
            $data = $this->DeviceData->select(DB::raw('"200" as result_code'),'name as device_name','description')->Where('bdid', $request->bdid)->first();
            // $data = $this->Device->select('name as bdid','model_name as name','description')->Where('name', 'like', '%' . $request->bdid . '%')->get()->toArray();
            // 0A00270000
            // Register in Log
            if ($data) {
                return $this->JSONSend->Send($data, 200);
            } else {
                // Set device data
                // $CURL = ['bdid' => $request->bdid];
                // $Shado_res = $this->ForLog->SendRequestToShadoDB('post', $CURL, 'device/check/bdid');
                // if (!json_decode($Shado_res['data'])->device) {
                //     $Data['device'] = 'Device not found';
                //     $Data['status'] = 401;
                //     return $this->JSONSend->Send($Data, 401);
                // } else {
                //     $Data['status'] = "200";
                //     $Data['device'] = json_decode($Shado_res['data'])->device;
                //     return $Data;
                // }
                $Data['error'] = "Invalid BDID.";
                return $this->JSONSend->Send($Data, 402);
            }
        }
    }

    /*
     * Check Device
     * */

    public function CheckDevice(Request $request)
    {
        $Data = [];
        $rules = array(
            'bdid' => 'required'
        );
        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $Data['error'] = json_encode($validator->errors()->all());
            $Data['status'] = '401';
            return $this->JSONSend->Send($Data, 401);
        } else {
            // dd(Device::with('device_meta')->where('created_user',Auth::id())->get()->toArray());
            $data = $this->DeviceData->Where('bdid', 'like', '%' . $request->bdid . '%')->get()->toArray();
            if ($data) {
                $Data['result_code'] = '200';
                $Data['device'] = $data;
                return $this->JSONSend->Send($Data, 200);
            } else {
                $Data['status'] = '200';
                $Data['device'] = '';
                return $this->JSONSend->Send($Data, 200);
            }
        }
    }

    /*
     * Change Device Group
     * */

    public function ChangeDevice(Request $request)
    {
        /*
          deviceId: 6
          parent_id: 5
          company_id: 1
          _token: hgsdhgjdsfjkfgdsk
          access_token: sdfjkhfdsjkjhksj
         */


        $Data = [];
        $rules = array(
            'deviceId' => 'required',
            'parent_id' => 'required',
            'company_id' => 'required',
        );
        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 200);
        } else {

            /** Update group ID when Group changed for device  */
            $check = $this->Device->where('id', $request->deviceId)
            ->update(['group_id' => $request->parent_id]);

            // Register in Log
            if (isset($request->log)) {
                $this->ForLog->Log_Event($request->log);
            }

            if ($check) {
                $Data['sucess'] = '200';
                return $this->JSONSend->Send($Data, 200);
            }
        }
    }
    public function AddNewAPI(Request $request)
    {
        $Data = [];
        $rules = array(
            'bdid' => 'required',
            'device_name' => 'required',
            'description' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $status = '401';
            $Data['error'] = $validator->errors()->all();
        } else {
            $status = '200';
            $Data['result_code'] = '200';
        }
        return $this->JSONSend->Send($Data, $status);
    }

    /*
        Get Device Info
    **/
    public function Getdeviceinfo(Request $request)
    {
        $Data = [];
        $rules = array(
        'device_id' => 'required'
      );

        //Validate
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return $this->JSONSend->Send(json_encode($validator->errors()->all()), 422);
        } else {
            $res = [];
            $DeviceData = Device::where('mac', $request->device_id)->first();
            if ($DeviceData) {
                $res['device_name'] = $DeviceData->name;
                $res['mac_address'] = $DeviceData->mac;
                $res['device_model'] = $DeviceData->model_name;
                $res['device_type'] = $DeviceData->device_type;
                $res['device_group'] = $DeviceData->group_id;
                $result = DeviceMeta::where('bdid', $DeviceID)->get();
                if ($result) {
                    foreach ($result->toArray() as $key) {
                        if ($key['parameter_key'] == "serialNo") {
                            $res['serial_number'] = $key['parameter_value'];
                        }
                        if ($key['parameter_key'] == "version") {
                            $res['version'] = $key['parameter_value'];
                        }
                        if ($key['parameter_key'] == "ip") {
                            $res['ip_address'] = $key['parameter_value'];
                        }
                    }
                    $Data['result_code'] = '200';
                    $Data['deviceinfo'] = $res;
                    if ($Data) {
                        return $this->JSONSend->Send($Data, 200);
                    } else {
                        $Data = ['error'=>'Internal Server Error','code'=>401];
                        return $this->JSONSend->Send($Data, 200);
                    }
                } else {
                    return $this->JSONSend->Send(['error'=>'Something went wrong. Please try again later.'], 500);
                }
            } else {
                return $this->JSONSend->Send(['error'=>'Device Id is not valid.'], 422);
            }
        }
        return $this->JSONSend->Send($Data, 401);
    }

    public function GetdeviceinfoForRestAPI(Request $request)
    {
        $Data = [];
        $rules = array(
        'device_id' => 'required'
        );

        //Validate
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 422);
        } else {
            $res = [];
            $DeviceData = Device::where('mac', $request->device_id)->first();
            if ($DeviceData) {
                $res['device_name'] = $DeviceData->name;
                $res['mac_address'] = $DeviceData->mac;
                $res['device_model'] = $DeviceData->model_name;
                $res['device_type'] = $DeviceData->type;
                $res['device_group'] = (string)$DeviceData->group_id;
                $result = DeviceMeta::where('bdid', $DeviceData->id)->get();
                if ($result) {
                    foreach ($result->toArray() as $key) {
                        if ($key['parameter_key'] == "serialNo") {
                            $res['serial_number'] = $key['parameter_value'];
                        }
                        if ($key['parameter_key'] == "version") {
                            $res['version'] = $key['parameter_value'];
                        }
                        if ($key['parameter_key'] == "ip") {
                            $res['ip_address'] = $key['parameter_value'];
                        }
                    }
                    $Data['result_code'] = '200';
                    $Data['device_info'] = $res;
                    if ($Data) {
                        return $this->JSONSend->Send($Data, 200);
                    } else {
                        $Data = ['error'=>'Internal Server Error','code'=>401];
                        return $this->JSONSend->Send($Data, 200);
                    }
                } else {
                    return $this->JSONSend->Send(['error'=>'Something went wrong. Please try again later.'], 500);
                }
            } else {
                return $this->JSONSend->Send(['error'=>'Device Id is not valid.'], 422);
            }
        }
        return $this->JSONSend->Send($Data, 401);
    }

    /*
      Add New Device
     * */
    public function deviceMQTTCheck(Request $request)
    {
        $Shado_res = '';
        if (Auth::user()) {
            $comp_name =  Company::where('mct_company_id',Auth::user()->company_id)->first()->name;
            $CURL = ['bdid' => $request->bdid,'companyid' => Auth::user()->company_id,'companyname' => $comp_name,"addedby" => Auth::user()->name,"addedbyid" => Auth::id() ];
            $Shado_res = $this->ForLog->SendRequestToShadoDB('post', $CURL, 'device/register');
        }
        return $Shado_res;
    }

    public function AddNewDeviceViaAPI(Request $request)
    {
        /* For Adding New Device {
          name: "DeviceName", groupId: "2", company_id: "1", _token: "hgsdhgjdsfjkfgdsk", access_token: "sdfjkhfdsjkjhksj"
        } */
        $Data = [];
        $rules = array(
        'bdid' => 'required',
        'device_name' => 'required',
        //'groupId' => 'required',
        //'company_id' => 'required'
        );

        $str = base64_decode($request->bdid);
        $mac = str_replace(':','',$str);

        Auth::user()->company_id;
        //Validate
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 422);
        } else {
            if (isset($request->description)) {
                // Call MQTT for description
                $res = $this->ForLog->SendRequestToShadoDB('post', ['bdid' => $request->bdid, 'description' =>$request->description], 'device/set/description');
            }
            if (isset($request->device_name)) {
                // Call MQTT for name
                $res = $this->ForLog->SendRequestToShadoDB('post', ['bdid' => $request->bdid, 'name' =>$request->device_name], 'device/set/name');
            }

            $arr = ['name' => $request->device_name,
                'mac' => $mac,
                'model_name' => $request->model,
                'gps' => 'NA',
                'type' => 'IFP',
                'company_id' => Auth::user()->company_id,
                'group_id' => (isset($request->groupId) ? $request->groupId : null),
                'description' => (isset($request->description) ? $request->description : ''),
                'created_user' => Auth::id(),
                'updated_user' => Auth::id(),
                'created_at' => date("Y-m-d H:i:s")];
       
            try {
                /* Insert New Device */
                $last_insert_id = $this->Device->insertGetId($arr);
                if (!empty($last_insert_id)) {
                    // Call MQTT for getting all Meta Data
                    // $Status = $this->ForLog->SendRequestToShadoDB('post', $CURL, 'device/status');
                    if (isset($request->setting)) {
                        $meta = $request->setting;
                        //Set meta values//
                        $meta_arr = [
                                'bdid' => $mac,
                                'power' => $meta['power'],
                                'source' => $meta['source'],
                                'signalStatus' => $meta['signalStatus'],
                                'type' => $meta['type'],
                                'avmute' => $meta['avmute'],
                                'mute' => $meta['mute'],
                                'ip' => $meta['ip'],
                                'pictureMode' => $meta['pictureMode'],
                                'serialNo' => $meta['serialNo'],
                                'aspectRatio' => $meta['aspectRatio'],
                                'version' => $meta['version'],
                                'sensor' => $meta['sensor'],
                                'inputSource' => $meta['inputSource'],
                                'volume' => $meta['volume'],
                                'audioMute' => $meta['audioMute'],
                                'aspectRatio' => $meta['aspectRatio'],
                                'screenBlank' => $meta['screenBlank'],
                                'pictureMode' => $meta['pictureMode'],
                                'CPU' => $meta['CPU'],
                                'Memory' => $meta['Memory'],
                                'Network' => $meta['Network'],
                                'ipaddr' => '',
                                'netmask' => '',
                                'gateway' => ''];

                        foreach ($meta_arr as $key => $value) {
                            try {
                                $res = $this->DeviceMeta->insert(
                                ['bdid' => $last_insert_id,
                                'parameter_key' => $key,
                                'parameter_value' => $value]
                            );

                                $data['meta_status'] = $res;
                            } catch (\Illuminate\Database\QueryException $ex) {
                                $Data[$key] = $ex->getMessage();
                            }
                        }

                        //Set device data like mac_addess and model
                        //$response = $this->AddDeviceData($last_insert_id, $arr);

                        if ($last_insert_id) {
                            $Data['last_insert_id'] = $last_insert_id;
                        }
                    } else {
                        $Data['result_code']='200';
                    }
                } else {
                    return $this->JSONSend->Send(['error' => 'Device is not added'], 400);
                }
            } catch (\Illuminate\Database\QueryException $ex) {
                return $this->JSONSend->Send(['error'=>'Internal Server Error.'], 500);
            }

            // Register in Log
            if (isset($request->log)) {
                $res = $this->ForLog->Log_Event($request->log);
            }
        }
        return $this->JSONSend->Send($Data, 200);
    }
    
    public function AddNew(Request $request)
    {
        /* For Adding New Device {
          name: "DeviceName", groupId: "2", company_id: "1", _token: "hgsdhgjdsfjkfgdsk", access_token: "sdfjkhfdsjkjhksj"
        } */
        $Data = [];
        $rules = array(
        'bdid' => 'required',
        'device_name' => 'required',
        //'groupId' => 'required',
        //'company_id' => 'required'
      );

        Auth::user()->company_id;
        //Validate
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 422);
        } else {
            // $CURL = ['bdid' => $request->bdid];
            // $Shado_res = $this->ForLog->SendRequestToShadoDB('post', $CURL, 'device/register');

            // if (isset($Shado_res) && json_decode($Shado_res['data'])->isRegistered != 1) {
            //     return response(json_encode(['responce'=>'This device is not Active']), 400);
            //     exit();
            // }
        
            if (isset($request->description)) {
                // Call MQTT for description
                $res = $this->ForLog->SendRequestToShadoDB('post', ['bdid' => $request->bdid, 'description' =>$request->description], 'device/set/description');
            }
            if (isset($request->device_name)) {
                // Call MQTT for name
                $res = $this->ForLog->SendRequestToShadoDB('post', ['bdid' => $request->bdid, 'name' =>$request->device_name], 'device/set/name');
            }

            $bdid = $request->bdid;
            $mac = base64_decode($bdid);
            $modified_mac = str_replace(':','',$mac);
            $arr = ['name' => $request->device_name,
                    'mac' => $modified_mac,
                    'model_name' => $request->model,
                    'gps' => 'NA',
                    'type' => 'IFP',
                    'company_id' => Auth::user()->company_id,
                    'group_id' => (isset($request->groupId) ? $request->groupId : null),
                    'description' => (isset($request->description) ? $request->description : ''),
                    'created_user' => Auth::id(),
                    'updated_user' => Auth::id(),
                    'created_at' => date("Y-m-d H:i:s")];
       
            try {
                /* Insert New Device */
                $last_insert_id = $this->Device->insertGetId($arr);
                if (!empty($last_insert_id)) {
                    // Call MQTT for getting all Meta Data
                    // $Status = $this->ForLog->SendRequestToShadoDB('post', $CURL, 'device/status');
                    if (isset($request->setting)) {
                        $meta = $request->setting;
                        //Set meta values//
                        $meta_arr = [
                                'bdid' => $request->bdid,
                                'power' => $meta['power'],
                                'source' => $meta['source'],
                                'signalStatus' => $meta['signalStatus'],
                                'type' => $meta['type'],
                                'avmute' => $meta['avmute'],
                                'mute' => $meta['mute'],
                                'ip' => $meta['ip'],
                                'pictureMode' => $meta['pictureMode'],
                                'serialNo' => $meta['serialNo'],
                                'aspectRatio' => $meta['aspectRatio'],
                                'version' => $meta['version'],
                                'sensor' => $meta['sensor'],
                                'inputSource' => $meta['inputSource'],
                                'volume' => $meta['volume'],
                                'audioMute' => $meta['audioMute'],
                                'aspectRatio' => $meta['aspectRatio'],
                                'screenBlank' => $meta['screenBlank'],
                                'pictureMode' => $meta['pictureMode'],
                                'CPU' => $meta['CPU'],
                                'Memory' => $meta['Memory'],
                                'Network' => $meta['Network'],
                                'ipaddr' => '',
                                'netmask' => '',
                                'gateway' => ''];

                        foreach ($meta_arr as $key => $value) {
                            try {
                                $res = $this->DeviceMeta->insert(
                                ['bdid' => $last_insert_id,
                                'parameter_key' => $key,
                                'parameter_value' => $value]
                            );

                                $data['meta_status'] = $res;
                            } catch (\Illuminate\Database\QueryException $ex) {
                                $Data[$key] = $ex->getMessage();
                            }
                        }

                        //Set device data like mac_addess and model
                        //$response = $this->AddDeviceData($last_insert_id, $arr);

                        if ($last_insert_id) {
                            $Data['last_insert_id'] = $last_insert_id;
                        }
                    } else {
                        $Data['result_code']='200';
                    }
                } else {
                    return $this->JSONSend->Send(['error' => 'Device is not added'], 400);
                }
            } catch (\Illuminate\Database\QueryException $ex) {
                return $this->JSONSend->Send(['error'=>'Internal Server Error.'], 500);
            }

            // Register in Log
            if (isset($request->log)) {
                $res = $this->ForLog->Log_Event($request->log);
            }
        }
        return $this->JSONSend->Send($Data, 200);
    }

    public function AddDeviceData($id, $data)
    {

    /* Table : `id`, `bdid`, `mac_address`, `model`, `created_at`, `updated_at` */
        if (!empty($id) && !empty($data)) {
            $arr = ['bdid' => $id,
        'mac_address' => $data['mac'],
        'model' => $data['model_name'],
        'created_at' => date("Y-m-d H:i:s"),
        'updated_at' => date("Y-m-d H:i:s")];
            try {
                $res = $this->DeviceData->insert($arr);

                if ($res) {
                    return true;
                }
            } catch (\Illuminate\Database\QueryException $ex) {
                return false;
            }
        }
        return false;
    }

    /*
      Set Device Name into Device
     * */

    public function RenameDevice(Request $request)
    {
        /* For Device Rename {
          NewName: "Test4dgf", deviceID: "4", groupId: "2", company_id: "1", _token: "hgsdhgjdsfjkfgdsk"
          }
         */
        $Data = [];
        $rules = array(
            'NewName' => 'required',
            'deviceID' => 'required',
            'groupId' => 'required',
            'company_id' => 'required',
        );

        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 200);
        } else {

            //Rename Device
            $check = $this->Device
            ->where('id', $request->deviceID)
            ->where('group_id', $request->groupId)
            ->where('company_id', $request->company_id)
            ->update(['name' => $request->NewName]);

            // Register in Log
            if (isset($request->log)) {
                $this->ForLog->Log_Event($request->log);
            }

            if ($check) {
                $Data['success'] = '200';
                return $this->JSONSend->Send($Data, 200);
            }
        }
    }

    public function update(Request $request)
    {
        $path = $request->file('avatar')->storeAs('avatars', $request->user()->id);
        // $path = Storage::putFileAs('avatars', $request->file('avatar'), $request->user()->id);
        return $path;
    }

    public function csvImport(Request $request)
    {
        $allData = [];
        $Data = [];
        $company_id = Input::get('account_id');
        $groupId = 17;

        if (Input::hasFile('file')) {
            $ext = Input::file('file')->getClientOriginalExtension();
            if ($ext == 'csv') {
                $path = Input::file('file')->getRealPath();
                $fileD = fopen($path, "r");
                $column = fgetcsv($fileD);

                while (!feof($fileD)) {
                    $rowData[] = fgetcsv($fileD);
                }
                if ($rowData[0] != '') {
                    $rowDat = $this->unique_multidim_array($rowData, '0');
                    foreach ($rowDat as $key => $value) {
                        if (!empty($value[0]) && !empty($value[1])) {
                            $insertdata = [ 'bdid' => $value[0],
                                            'name' => $value[1],
                                            'description' => $value[2]];
                            array_push($Data, $insertdata);
                        }
                    }
                    fclose($fileD);
                    $Data1['device'] = $Data;
                    $Data1['status'] = 200;
                    return $this->JSONSend->Send($Data1, 200);
                } else {
                    $Data['status'] = 300;
                    $Data['errors'] = 'File is empty.';
                    return $this->JSONSend->Send($Data, 300);
                }
            } else {
                $Data['status'] = 300;
                $Data['errors'] = 'Please upload .CSV file.';
                return $this->JSONSend->Send($Data, 300);
            }
        } else {
            $Data['status'] = 300;
            $Data['errors'] = 'Please upload file.';
            return $this->JSONSend->Send($Data, 300);
        }
    }

    public function unique_multidim_array($array, $key)
    {
        $temp_array = array();
        $i = 0;
        $key_array = array();

        foreach ($array as $val) {
            if (!in_array($val[$key], $key_array)) {
                $key_array[$i] = $val[$key];
                $temp_array[$i] = $val;
            }
            $i++;
        }
        return $temp_array;
    }

    public function checkname($name)
    {
        $ch = $this->Device->where('name', $name)->first();
        return $ch;
    }

    /*
      Set Device Meta into Device
     * */

    public function add_device_meta(Request $request)
    {
        $Data = [];
        $token = false;
        $rules = array('bdid' => 'required',
            'parameter_key' => 'required',
            'parameter_value' => 'required',
        );
        
        $ONOFF = ['power','avmute','audioMute','screenBlank'];
        //Validate
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
        } else {
            try {
                $arr = ['bdid' => $request->bdid,
                'parameter_key' => $request->parameter_key,
                'parameter_value' => $request->parameter_value];
                if($request->parameter_key == "description"){
                    $res = $this->Device->where('id',$request->bdid)->update(["description"=>$request->parameter_value]);
                }
                $check = $this->DeviceMeta->all()->where('bdid', $request->bdid)
                ->where('parameter_key', $request->parameter_key)
                ->count();

                if ($check == 0) {
                    //Insert new row
                    try {
                        $this->DeviceMeta->insert(['bdid' => $request->bdid,
                            'parameter_key' => $request->parameter_key,
                            'parameter_value' => $request->parameter_value]);

                        // Call to MQTT
                        if (!in_array($request->parameter_value, $ONOFF)) {
                            $Status = $this->ForLog->SendRequestToShadoDB('post', ['bdid'=>$request->Mbdid,'setting_value'=>$request->parameter_value], 'device/set/'.$request->parameter_key);
                        }

                        $Data['success'] = 'Meta Key Created!';
                    } catch (\Illuminate\Database\QueryException $ex) {
                        $Data['error'] = $ex->getMessage();
                    }
                } else {
                    //Update existing key
                    try {
                        $this->DeviceMeta->where('bdid', $request->bdid)
                        ->where('parameter_key', $request->parameter_key)
                        ->update(['parameter_value' => $request->parameter_value]);

                        // Call to MQTT
                        if (in_array($request->parameter_value, $ONOFF)) {
                            $Status = $this->ForLog->SendRequestToShadoDB('post', ['bdid'=>$request->Mbdid,'status_value'=>$request->parameter_value], 'device/status/'.$request->parameter_key);
                        } else {
                            $Status = $this->ForLog->SendRequestToShadoDB('post', ['bdid'=>$request->Mbdid,'setting_value'=>$request->parameter_value], 'device/update/'.$request->parameter_key);
                        }
                        // Register in Log
                        if (isset($request->log)) {
                            $this->ForLog->Log_Event($request->log);
                        }
                        $Data['success'] = 'Meta Key Updated!';
                    } catch (\Illuminate\Database\QueryException $ex) {
                        $Data['error'] = $ex->getMessage();
                    }
                }
            } catch (\Illuminate\Database\QueryException $ex) {
                $Data['error'] = $ex->getMessage();
            }
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /* update device data from route */

    public function add_device_data(Request $request)
    {
        /* Table : `id`, `bdid`, `mac_address`, `model`, `created_at`, `updated_at` */
        $rules = array('bdid' => 'required');

        //Validate
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
        } else {
            $arr = ['bdid' => $request->bdid,
            'mac_address' => $request->mac,
            'model' => $request->model_name,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")];
            //Banq Check section

            try {
                $count = $this->DeviceData->where('bdid', $request->bdid)->count();

                $Data['success'] = 'Details Udpated!';

                /*                 * ******************** */
            } catch (\Illuminate\Database\QueryException $ex) {
                $Data['error'] = $ex->getMessage();
            }
        }
        return $this->JSONSend->Send($Data, 200);
    }

    /*
      Set Device Name into Device
     * */

    public function SetDeviceName(Request $request)
    {
        $Data = [];
        $rules = array(
            'bdid' => 'required',
            'device_name' => 'required'
        );

        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 422);
        } else {

            //Rename Device
            $check = $this->Device
                     ->where('id', $request->bdid)
                     ->update(['name' => $request->device_name]);

            // Register in Log
            if (isset($request->log)) {
                $this->ForLog->Log_Event($request->log);
            }

            $Data['result_code'] = '200';
            return $this->JSONSend->Send($Data, 200);
        }
    }

    public function EditDescription(Request $request)
    {
        $Data = [];
        $rules = array(
            'bdid' => 'required',
            'description' => 'required'
        );

        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 422);
        } else {

            //Get BDID from Devicemeta
            if ($request->bdid) {
                //Set description
                $check = $this->Device
                         ->where('mac', $request->bdid)
                         ->update(['description' => $request->description]);
                // Register in Log
                if (isset($request->log)) {
                    $this->ForLog->Log_Event($request->log);
                }

                if ($check) {
                    $Data['result_code'] = '200';
                    return $this->JSONSend->Send($Data, 200);
                } else {
                    $Data['result_code'] = '401';
                    $Data['error'] = 'There is multiple BDID';
                    return $this->JSONSend->Send($Data, 401);
                }
            } else {
                $Data['result_code'] = '401';
                $Data['error'] = 'Device Not Found';
                return $this->JSONSend->Send($Data, 401);
            }
        }
    }

    /*
      Get Device List(Recent Added)
     * */

    public function GetDeviceListRecent(Request $request)
    {
        $Data = [];
        //$device = $this->Device->join('device_meta', 'bdid', '=', 'device_meta.bdid')->select('equipment.id as bdid', 'equipment.name as device_name', 'description', 'equipment.created_at as added_on', DB::raw('"200" as status'), DB::raw('"active" as state_type'),'equipment.model_name as device_type', 'device_meta.parameter_value as bdid')->where('device_meta.parameter_key', 'bdid')->where('equipment.created_at','>',date('Y-m-d H:i:s',strtotime('-2 weeks')))->orderBy('equipment.name')->get();
        $device = $this->Device->select('mac as bdid','name as device_name','description as description','created_at as added_on',DB::raw('"200" as status'),'model_name as device_type',DB::raw('"active" as state_type'))->where('created_at','>',date('Y-m-d H:i:s',strtotime('-2 weeks')))->orderBy('name')->get()->toArray();
        //$device = $this->Device->select('equipment.id as bdid1',DB::raw("(SELECT `parameter_value` FROM `dms_device_meta` WHERE `bdid` = bdid1 AND `parameter_key` = 'bdid') as `bdid`"),'equipment.name as device_name','description', 'equipment.created_at as added_on', DB::raw('"200" as status'), DB::raw('"active" as state_type'),'equipment.model_name as device_type')->where('equipment.created_at','>',date('Y-m-d H:i:s',strtotime('-2 weeks')))->orderBy('equipment.name')->get()->toArray();
        // foreach ($device as $i => $v) {
        //     unset($device[$i]['bdid1']);
        // }
        $Data['result_code'] = '200';
        $Data['devices'] = $device;
        return $this->JSONSend->Send($Data, 200);
    }


    /*
      Get Device List (Added By Me)
     * */

    public function GetDeviceListByMe(Request $request)
    {
        $Data = [];
        $user = Auth::User();
        // $device = $this->Device->join('device_meta', 'bdid', '=', 'device_meta.bdid')->select('equipment.id as bdid', 'equipment.id as id', 'equipment.name as device_name', 'description', 'equipment.created_at as added_on', 'device_meta.parameter_value as bdid', DB::raw('200 as status'), DB::raw('"Active" as state_type'))->where('device_meta.parameter_key', 'bdid')->where('created_user', $user['id'])->get();
        // $device = $this->Device->join('device_meta', 'bdid', '=', 'device_meta.bdid')->select('equipment.id as bdid', 'equipment.name as device_name', 'description', 'equipment.created_at as added_on', DB::raw('"200" as status'), DB::raw('"active" as state_type'),'equipment.model_name as device_type', 'device_meta.parameter_value as bdid')->where('device_meta.parameter_key', 'bdid')->where('created_user', $user['id'])->orderBy('equipment.name')->get();
        $device = $this->Device->select('mac as bdid','name as device_name','description as description','created_at as added_on',DB::raw('"200" as status'),'model_name as device_type',DB::raw('"active" as state_type'))->where('created_user', $user['id'])->where('created_at','>',date('Y-m-d H:i:s',strtotime('-2 weeks')))->orderBy('name')->get()->toArray();
        // $device = $this->Device->select('equipment.id as bdid1',DB::raw("(SELECT `parameter_value` FROM `dms_device_meta` WHERE `bdid` = bdid1 AND `parameter_key` = 'bdid') as `bdid`"),'equipment.name as device_name','description', 'equipment.created_at as added_on', DB::raw('"200" as status'), DB::raw('"active" as state_type'),'equipment.model_name as device_type')->where('created_user', $user['id'])->where('equipment.created_at','>',date('Y-m-d H:i:s',strtotime('-2 weeks')))->orderBy('equipment.name')->get()->toArray();
        // foreach ($device as $i => $v) {
        //     unset($device[$i]['bdid1']);
        // }
        
        $Data['result_code'] = '200';
        $Data['devices'] = $device;
        return $this->JSONSend->Send($Data, 200);
    }

    /*
     * Get Device Status
     * */

    public function GetDeviceStatus(Request $request)
    {
        $Data = [];
        $rules = array(
         'device_id' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 422);
        } else {
            // Call MQTT for getting all Meta Data
            $CURL = ['bdid'=>$request->device_id];
            $Status = $this->ForLog->SendRequestToShadoDB('post', $CURL, 'device/status');
            if ($Status['data'] != '{"result_code":200}') {
                $D = json_decode($Status['data']);
                $Data['result_code'] = '200';
                $Data['device_status'] = ['power'=>$D->power,'source'=>$D->source,'signal_status'=>$D->signalStatus,'av_mute'=>$D->avmute];
            } else {
                return $this->JSONSend->Send(["error"=>"Something went wrong. Please try again later."], 500);
            }
        }
        return $this->JSONSend->Send($Data, 200);
    }

    public function GetDeviceStatusAll(Request $request)
    {
        $Data = [];
        $rules = array(
         'device_id' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 422);
        } else {
            // Call MQTT for getting all Meta Data
            $CURL = ['bdid'=>$request->device_id];
            $Status = $this->ForLog->SendRequestToShadoDB('post', $CURL, 'device/status');
            if ($Status['data'] != '{"result_code":200}') {
                $Data['device_status'] = json_decode($Status['data']);
            } else {
                return $this->JSONSend->Send(["error"=>"Something went wrong. Please try again later."], 500);
            }
        }
        return $this->JSONSend->Send($Data, 200);
    }

    public function GetDeviceSettingStatus(Request $request)
    {
        $Data = [];
        $rules = array(
        'access_token' => 'required',
        'settingsname' => 'required',
        'device_id' => 'required'
    );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
        } else {
            $res = $this->Helper->SendRequestToBenq('post', ['device_id'=>$request->device_id], 'status/'.$request->settingsname);
            $obj = json_decode($res['data']);
            if ($res['status']==200 && isset($obj->result_code) && $obj->result_code == 200) {
                $Data['success'] = $res['data'];
            } else {
                $Data['error'] = $res;
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function ResetDeviceData(Request $request)
    {
        if ($request->bdid) {
            $bnQ_res = $this->ForLog->GetParam(['parameter_key'=>'reset','parameter_value'=>'YES','bdid'=>$request->bdid]);
            if ($bnQ_res) {
                $meta_arr = ['avmute'=>'on','inputSource'=>'HDMI-2','aspectRatio'=>1,'volume'=>1,'pictureMode'=>'Picture Mode','audioMute'=>'on','screenBlank'=>'on'];
                foreach ($meta_arr as $key => $value) {
                    try {
                        $this->DeviceMeta->where('bdid', $request->bdid)
                    ->where('parameter_key', $key)
                    ->update(['parameter_value' => $value]);
                    } catch (\Illuminate\Database\QueryException $ex) {
                        // $Data[$key] = $ex->getMessage();
                    }
                }
            }
        }
        return $this->JSONSend->Send(['success'=>'success'], 200);
    }


    /*
    *
    *
    */
    public function checkBdid(Request $request)
    {
        $Data = [];
        $rules = array(
            'bdid' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
        } else {
            //$data = ['access_token' => $request->access_token,
            //         'bdid' => $request->bdid
            //        ];
            //$res = $this->Helper->SendRequestToBenq('post',$data,'check/bdid');
            //$obj = json_decode($res['data']);
            $device = $this->Device->select('name as device_name', 'description')->where('id', $request->bdid)->first();
            if ($device) {
                $Data['result_code'] = '200';
                $Data['device_name'] = $device->device_name;
                $Data['description'] = $device->description;
            } else {
                $Data['result_code'] = '200';
                $Data['message'] = 'No data found';
            }
        }
        return $this->JSONSend->Send($Data, 200);
    }

    
    public function GetDeviceNameByDeviceID($id)
    {
        // $rules = array(
        //     'bdid' => 'required',
        // );
        // $validator = Validator::make($request->all(), $rules);
        if (!$id) {
            $Data['error'] = 'DBID required';
            return $this->JSONSend->Send($Data, 401);
        } else {
            //Get BDID from Devicemeta
            $Id = DeviceMeta::where('parameter_value', $id)->where('parameter_key', 'bdid')->first();
            if ($Id) {
                $Data1 = $this->Device->select('name as device_name')->where('id', $Id->id)->first();
                return $this->JSONSend->Send($Data1, 200);
            } else {
                $Data['error'] = 'Device not exist';
                return $this->JSONSend->Send($Data, 401);
            }
        }
    }

    public function Setipaddrconfig(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'ipaddr' => 'required',
            'netmask' => 'required',
            'gateway' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            if ($request->device_id) {
                $DeviceID = Device::where('mac',$request->device_id)->first();
                if ($DeviceID) {
                    $DeviceID = $DeviceID->id;
                    try {
                        $this->DeviceMeta->where('bdid', $DeviceID)
                                ->where('parameter_key', 'ipaddr')
                                ->update(['parameter_value' => $request->ipaddr]);
                        $this->DeviceMeta->where('bdid', $DeviceID)
                                ->where('parameter_key', 'netmask')
                                ->update(['parameter_value' => $request->netmask]);
                        $this->DeviceMeta->where('bdid', $DeviceID)
                                ->where('parameter_key', 'gateway')
                                ->update(['parameter_value' => $request->gateway]);
                    } catch (\Illuminate\Database\QueryException $ex) {
                        //$Data[$key] = $ex->getMessage();
                    }
                    $Data['result_code'] = 200;
                    $Data['device_id'] = $request->device_id;
                    $Data['message'] = "Settings successfully received.";
                } else {
                    $Data['error'] = "Unprocessable entity.";
                    return $this->Helper->Send($Data, 422);
                }
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function Setavmute(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'av_stat' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            if ($request->device_id) {
                $DeviceID = Device::where('mac',$request->device_id)->first();
                if ($DeviceID) {
                    $DeviceID = $DeviceID->id;
                    try {
                        $this->DeviceMeta->where('bdid', $DeviceID)
                                ->where('parameter_key', 'avmute')
                                ->update(['parameter_value' => $request->av_stat]);
                    } catch (\Illuminate\Database\QueryException $ex) {
                        //$Data[$key] = $ex->getMessage();
                    }
                    $Data['result_code'] = 200;
                    $Data['device_id'] = $request->device_id;
                    $Data['message'] = "Settings successfully received.";
                } else {
                    $Data['error'] = "Unprocessable entity.";
                    return $this->Helper->Send($Data, 422);
                }
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function Setpowermode(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'pwr_stat' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            if ($request->device_id) {
                $DeviceID = Device::where('mac',$request->device_id)->first();
                if ($DeviceID) {
                    try {
                        $this->DeviceMeta->where('bdid', $DeviceID->id)
                                ->where('parameter_key', 'power')
                                ->update(['parameter_value' => $request->pwr_stat]);
                    } catch (\Illuminate\Database\QueryException $ex) {
                        //$Data[$key] = $ex->getMessage();
                    }
                    $Data['result_code'] = "200";
                    $Data['device_id'] = $request->device_id;
                    $Data['message'] = "Settings successfully received.";
                } else {
                    $Data['error'] = "Unprocessable entity.";
                    return $this->Helper->Send($Data, 422);
                }
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function Setinputsrc(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'inp_stat' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            if ($request->device_id) {
                $DeviceID = Device::where('mac',$request->device_id)->first();
                if ($DeviceID) {
                    try {
                        $this->DeviceMeta->where('bdid', $DeviceID->id)
                                ->where('parameter_key', 'inputSource')
                                ->update(['parameter_value' => $request->inp_stat]);
                    } catch (\Illuminate\Database\QueryException $ex) {
                        //$Data[$key] = $ex->getMessage();
                    }
                    $Data['result_code'] = "200";
                    $Data['device_id'] = $request->device_id;
                    $Data['message'] = "Settings successfully received.";
                } else {
                    $Data['error'] = "Unprocessable entity.";
                    return $this->Helper->Send($Data, 422);
                }
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function Setaudiomute(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'audio_mute' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            if ($request->device_id) {
                $DeviceID = Device::where('mac',$request->device_id)->first();
                if ($DeviceID) {
                    try {
                        $this->DeviceMeta->where('bdid', $DeviceID->id)
                                ->where('parameter_key', 'audio_mute')
                                ->update(['parameter_value' => $request->audio_mute]);
                    } catch (\Illuminate\Database\QueryException $ex) {
                        //$Data[$key] = $ex->getMessage();
                    }
                    $Data['result_code'] = "200";
                    $Data['device_id'] = $request->device_id;
                    $Data['message'] = "Settings successfully received.";
                } else {
                    $Data['error'] = "Unprocessable entity.";
                    return $this->Helper->Send($Data, 422);
                }
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function Setvollvl(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'vol_stat' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            if ($request->device_id) {
                $DeviceID = Device::where('mac',$request->device_id)->first();
                if ($DeviceID) {
                    try {
                        $this->DeviceMeta->where('bdid', $DeviceID->id)
                                ->where('parameter_key', 'vol_stat')
                                ->update(['parameter_value' => $request->vol_stat]);
                    } catch (\Illuminate\Database\QueryException $ex) {
                        //$Data[$key] = $ex->getMessage();
                    }
                    $Data['result_code'] = "200";
                    $Data['device_id'] = $request->device_id;
                    $Data['message'] = "Settings successfully received.";
                } else {
                    $Data['error'] = "Unprocessable entity.";
                    return $this->Helper->Send($Data, 422);
                }
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function Setsetaspectratio(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'aspect_ratio' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            if ($request->device_id) {
                $DeviceID = Device::where('mac',$request->device_id)->first();
                if ($DeviceID) {
                    try {
                        $this->DeviceMeta->where('bdid', $DeviceID->id)
                                ->where('parameter_key', 'aspect_ratio')
                                ->update(['parameter_value' => $request->aspect_ratio]);
                    } catch (\Illuminate\Database\QueryException $ex) {
                        //$Data[$key] = $ex->getMessage();
                    }
                    $Data['result_code'] = "200";
                    $Data['device_id'] = $request->device_id;
                    $Data['message'] = "Settings successfully received.";
                } else {
                    $Data['error'] = "Unprocessable entity.";
                    return $this->Helper->Send($Data, 422);
                }
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function Setscreenblank(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'screen_blank' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            if ($request->device_id) {
                $DeviceID = Device::where('mac',$request->device_id)->first();
                if ($DeviceID) {
                    try {
                        $this->DeviceMeta->where('bdid', $DeviceID->id)
                                ->where('parameter_key', 'screen_blank')
                                ->update(['parameter_value' => $request->screen_blank]);
                    } catch (\Illuminate\Database\QueryException $ex) {
                        //$Data[$key] = $ex->getMessage();
                    }
                    $Data['result_code'] = "200";
                    $Data['device_id'] = $request->device_id;
                    $Data['message'] = "Settings successfully received.";
                } else {
                    $Data['error'] = "Unprocessable entity.";
                    return $this->Helper->Send($Data, 422);
                }
            }
        }
        return $this->Helper->Send($Data, 200);
    }


    public function Setpictmode(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'pict_mode' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            if ($request->device_id) {
                $DeviceID = Device::where('mac',$request->device_id)->first();
                if ($DeviceID) {
                    try {
                        $this->DeviceMeta->where('bdid', $DeviceID->id)
                                ->where('parameter_key', 'pict_mode')
                                ->update(['parameter_value' => $request->pict_mode]);
                    } catch (\Illuminate\Database\QueryException $ex) {
                        //$Data[$key] = $ex->getMessage();
                    }
                    $Data['result_code'] = "200";
                    $Data['device_id'] = $request->device_id;
                    $Data['message'] = "Settings successfully received.";
                } else {
                    $Data['error'] = "Unprocessable entity.";
                    return $this->Helper->Send($Data, 422);
                }
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function netcfgmode(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'netcfgmode' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 422);
        } else {
            if ($request->device_id) {
                $Status_val = 'YES';
                if ($request->resetall == 1) {
                    $Status_val = 'YES';
                }
                $DeviceID = $this->ForLog->GetDeviceId($request->device_id);
                if ($DeviceID) {
                    $meta_arr = ['avmute'=>'on','inputSource'=>'HDMI-2','aspectRatio'=>1,'volume'=>1,'pictureMode'=>'Picture Mode','audioMute'=>'on','screenBlank'=>'on'];
                    foreach ($meta_arr as $key => $value) {
                        try {
                            $this->DeviceMeta->where('bdid', $DeviceID)
                            ->where('parameter_key', $key)
                            ->update(['parameter_value' => $value]);
                        } catch (\Illuminate\Database\QueryException $ex) {
                            // $Data[$key] = $ex->getMessage();
                        }
                    }
                    $Data['result_code'] = 200;
                    $Data['device_id'] = $request->device_id;
                    $Data['message'] = "Settings successfully received.";
                } else {
                    $Data['error'] = "Unprocessable entity.";
                    return $this->JSONSend->Send($Data, 422);
                }
            }
        }
        return $this->JSONSend->Send($Data, 200);
    }

    public function Setreset(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'resetall' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            if ($request->device_id) {
                $DeviceID = Device::where('mac',$request->device_id)->first();
                if ($DeviceID) {
                    try {
                        $this->DeviceMeta->where('bdid', $DeviceID->id)
                                ->where('parameter_key', 'resetall')
                                ->update(['parameter_value' => $request->resetall]);
                    } catch (\Illuminate\Database\QueryException $ex) {
                        //$Data[$key] = $ex->getMessage();
                    }
                    $Data['result_code'] = "200";
                    $Data['device_id'] = $request->device_id;
                    $Data['message'] = "Settings successfully received.";
                } else {
                    $Data['error'] = "Unprocessable entity.";
                    return $this->Helper->Send($Data, 422);
                }
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    // public function Setreset(Request $request) {
    //     $Data = [];
    //     $rules = array(
    //         'access_token' => 'required',
    //         'device_id' => 'required',
    //         'resetall' => 'required'
    //     );
    //     $validator = Validator::make($request->all(), $rules);

    //     if ($validator->fails()) {
    //         $Data['error'] = $validator->errors()->all();
    //     } else {
    //         $data = [
    //             'device_id' => $request->device_id,
    //             'resetall' => $request->resetall
    //         ];
    //         $res = $this->Helper->SendRequestToBenq('post',$data,'set/reset');
    //         $obj = json_decode($res['data']);
    //         if($res['status']==200 && isset($obj->result_code) && $obj->result_code == 200){
    //             $Data['success'] = $res['data'];
    //         }else{
    //             $Data['error'] = $res;
    //         }
    //     }
    //     return $this->Helper->Send($Data, 200);
    // }

    public function WhoAddedDeviceByID($id)
    {
        $Data = [];
        if ($id) {
            $res = $this->Device->find($id)->user_info;
            //$bdid = DeviceMeta::where('bdid', $res->id)->where('parameter_key', 'bdid')->first()->parameter_value;
            if ($res) {
                $Data = $res->toArray();
                $Data['id'] = $id;
            }
            return $Data;
        } else {
            return $this->Helper->Send(['error'=>'Unprocessable entity.'], 422);
        }
    }

    public function GetCompanyByDeviceID($id)
    {
        if ($id) {
            $company_id = Device::where('mac', $id)->first();
            if ($company_id) {
                $Data1['name'] = Company::where('id',$company_id->company_id)->first()->name;
                $Data1['id'] = $id;
                return $this->Helper->Send($Data1, 200);
            } else {
                return $this->Helper->Send(['error'=>'Unprocessable entity.'], 422);
            }
        }
    }

    public function CheckStatus(Request $request)
    {
        $Data = [];
        $res = [];
        if ($request->bdid) {
            $CURL = ["bdid" => $request->bdid];
            $Data = $Status = $this->ForLog->SendRequestToShadoDB('post', $CURL, 'device/status');
            if ($Data['data']) {
                $version = json_decode($Data['data']);
                if ($version->version) {
                    $DB_Version = DeviceMeta::where('bdid', $request->device_id)->where('parameter_key', 'version')->first();
                    if ($DB_Version < $version->version) {
                        $res['updateReq'] = 'Yes';
                        $res['UpdateData'] = $version;
                    } else {
                        $res['updateReq'] = 'No';
                        $res['UpdateData'] = '';
                    }
                }
            }
        } else {
            $res['responce'] = 'BDID Not found';
        }
        return $this->Helper->Send($res, 200);
    }

    public function AssignApp(Request $request)
    {
        $alldata = $request->all();
        $appId = $alldata['AppId'];
        $app_id = \App\Model\AppVersion::select('app_id')->where('id', $appId)->first()->toArray();
        foreach ($alldata['data'] as $value) {
            $device_id = $value['device_id'];
            $bd_id = $value['bdid'];
            if ($app_id['app_id']) {
                if (\App\Model\ApplicationMapDevice::where('deviceId', $device_id)->where('appId', $app_id['app_id'])->count()) {
                    \App\Model\ApplicationMapDevice::where('deviceId', $device_id)->where('appId', $app_id['app_id'])->delete();
                    \App\Model\ApplicationMapDevice::insert(['deviceId'=>$device_id,'bdid'=>$bd_id,'appId'=>$app_id['app_id']]);
                } else {
                    \App\Model\ApplicationMapDevice::insert(['deviceId'=>$device_id,'bdid'=>$bd_id,'appId'=>$app_id['app_id']]);
                }

                // Register in Log
                $this->ForLog->Log_Event('Install ' . \App\Model\App::where('id',$app_id['app_id'])->first()->name . ', Application To Device, success');

                // Call MQTT API
                //$app = \App\Model\AppVersion::where('app_id',$request->appId)->first();
                //$appName = \App\Model\App::where('id',$request->appId)->first();
                //$MQTTAPPInstall = ["appname"=>$appName->name,"appinstallid"=>$request->appId,"apkfilepath"=>$app->url,"appver"=>$app->version_name];
                //$res = $this->ForLog->SendRequestToShadoDB('post', $MQTTAPPInstall, 'device/am/install');
                //$res = true;
            }
        }
        $res['responce'] = 'Successfully assign app to device';
        return $this->Helper->Send($res, 200);
    }

    /*REST API*/
    public function register(Request $request)
    {
        $rules = array(
            'bdid' => 'required',
            'device_model' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
        } else {
            $CURL = ['bdid' => $request->bdid];
            $Shado_res = $this->ForLog->SendRequestToShadoDB('post', $CURL, 'device/register');
            $Data = $Shado_res['data'];
        }
        return $this->Helper->Send($Data, 200);
    }

    public function GetCompanyDevID($id)
    {
        // if ($id) {
        //     $res = $this->Device->select('company_id', 'id')->where('id', $id)->first();
        //     if ($res) {
        //         return $this->Helper->Send(['companyid'=>$res->company_id,'id'=>$res->id], 200);
        //     } else {
        //         return $this->Helper->Send(['responce'=>'record not found'], 200);
        //     }
        // }
        if ($id) {
            $company_id = Device::where('mac', $id)->first();
            if ($company_id) {
                $Data1['companyid'] = $company_id->company_id;
                $Data1['id'] = $id;
                return $this->Helper->Send($Data1, 200);
            } else {
                return $this->Helper->Send(['error'=>'Unprocessable entity.'], 422);
            }
        }
    }

    public function MemberFullInfo(Request $request)
    {
        $rules = array(
            'member_id' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            $Member = Member::where('id', $request->member_id)->first();
            if ($Member) {
                $company = Company::where('id', $Member->company_id)->first();
                $Data = ['company_name'=>$Member->name,'account_name'=>$company->name];
            } else {
                return $this->Helper->Send(['error'=>"Something went wrong. Please try again later."], 500);
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function GetDeviceAmList(Request $request)
    {
        $rules = array(
            'device_id' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            $DeviceID = Device::where('mac',$request->device_id)->first();
            if ($DeviceID) {
                $DeviceID = $DeviceID->id;
                $Member = \App\Model\ApplicationMapDevice::with('getApp')->where('deviceId', $DeviceID)->first();
                if ($Member) {
                    $data = $Member->toArray();
                    if ($data['get_app']['get_app_version']) {
                        $Data['result_code'] = "200";
                        $Data['device_id'] = $request->device_id;
                        $Data['message'] = "Settings successfully received.";
                        $Data['applicatons'] = ['appname'=>$data['get_app']['name'],'appver'=>$data['get_app']['get_app_version']['version_code'],'tstmp'=>strtotime($data['get_app']['get_app_version']['created_at']),'size'=>$data['get_app']['get_app_version']['size']];
                    } elseif ($data['get_app']['get_need_update_version']) {
                        $Data['result_code'] = "200";
                        $Data['device_id'] = $request->device_id;
                        $Data['message'] = "Settings successfully received.";
                        $Data['applicatons'] = ['appname'=>$data['get_app']['name'],'appver'=>$data['get_app']['get_need_update_version']['version_code'],'tstmp'=>strtotime($data['get_app']['get_need_update_version']['created_at']),'size'=>$data['get_app']['get_need_update_version']['size']];
                    } else {
                        $Data['error'] = "Unprocessable entity.";
                        return $this->Helper->Send($Data, 422);
                    }
                }
            } else {
                $Data['error'] = "Unprocessable entity.";
                return $this->Helper->Send($Data, 422);
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function GetDeviceAmListDeviceId(Request $request)
    {
        $rules = array(
            'device_id' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            $DeviceID = Device::where('mac',$request->device_id)->first();
            if ($DeviceID) {
                $DeviceID = $DeviceID->id;
                $Member = \App\Model\ApplicationMapDevice::with('getApp')->where('deviceId', $DeviceID)->first();
                if ($Member) {
                    $data = $Member->toArray();
                    if ($data['get_app']['get_app_version']) {
                        $Data['result_code'] = "200";
                        $Data['device_id'] = $request->device_id;
                        $Data['message'] = "Settings successfully received.";
                        $Data['applicatons'] = ['appname'=>$data['get_app']['name'],'appver'=>$data['get_app']['get_app_version']['version_code'],'tstmp'=>strtotime($data['get_app']['get_app_version']['created_at']),'size'=>$data['get_app']['get_app_version']['size']];
                    } elseif ($data['get_app']['get_need_update_version']) {
                        $Data['result_code'] = "200";
                        $Data['device_id'] = $request->device_id;
                        $Data['message'] = "Settings successfully received.";
                        $Data['applicatons'] = ['appname'=>$data['get_app']['name'],'appver'=>$data['get_app']['get_need_update_version']['version_code'],'tstmp'=>strtotime($data['get_app']['get_need_update_version']['created_at']),'size'=>$data['get_app']['get_need_update_version']['size']];
                    } else {
                        $Data['error'] = "Unprocessable entity.";
                        return $this->Helper->Send($Data, 422);
                    }
                }
            } else {
                $Data['error'] = "Unprocessable entity.";
                return $this->Helper->Send($Data, 422);
            }
        }
        return $this->Helper->Send($Data, 200);
    }

    public function registerDeviceDataTable(Request $request)
    {
        $Data = [];
        $rules = array(
            'device_id' => 'required',
            'device_model' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($Data, 422);
        } else {
            $str = base64_decode($request->device_id);
            $mac = str_replace(':','',$str);
            $res = \App\Model\DeviceData::insert(["bdid"=>$request->device_id,"mac_address"=>$mac,"model"=>$request->device_model]);
            if($res){
                $Data['result_code'] = "200";
            } else {
                $Data['error'] = "Something went wrong. Please try again later.";
                $Data['result_code'] = "500";
            }
        }
        return $this->Helper->Send($Data, 200);
    }
}
