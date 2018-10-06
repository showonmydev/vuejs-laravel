<?php
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use ResponseJson;
use App\Model\Device;
use App\Model\DeviceGroup;
use Validator;
use DB;
use JWTAuth;
use Auth;

class DeviceGroupController extends Controller
{
    private $JSONSend;
    private $Device;
    private $DeviceGroup;
    private $ForLog;

    public function __construct()
    {
        $this->Device = new Device();
        $this->DeviceGroup = new DeviceGroup();
        $this->JSONSend = new ResponseJson();
        $this->ForLog = new ResponseJson();
    }

    /*
      Default Function for Sync Device
     * */

    public function index(Request $request)
    {
        $Data = [];
        $Data['AllDevice'] = $this->Device->all();
        $Data['AllGroup'] = $this->DeviceGroup->all();
        return $this->JSONSend->Send($Data, 200);
    }

    /*
     * Add Group
     * */

    public function AddNew(Request $request)
    {
        $Data = [];
        // Create rule for check $request
        $rules = array('depth' => 'required', 'name' => 'required', 'parent_id' => 'required', 'company_id' => 'required');
        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 200);
        } else {
            $arr = ['name' => $request->name,
                'company_id' => $request->company_id,
                'lft' => '0',
                'rgt' => '0',
                'depth' => $request->depth,
                'created_user' => Auth::id(),
                'updated_user' => Auth::id(),
                'parent_id' => $request->parent_id,
                'created_at' => date("Y-m-d H:i:s")];
            $last_insert_id = $this->DeviceGroup->insertGetId($arr);

            // Register in Log
            if (isset($request->log)) {
                $this->ForLog->Log_Event($request->log);
            }

            if (!empty($last_insert_id)) {
                $Data['last_insert_id'] = $last_insert_id;
                return $this->JSONSend->Send($Data, 200);
            }
        }
    }

    /*
     * Edit Group
     * */

    public function RenameGroup(Request $request)
    {

        /* For Group Rename
          {NewName: "uncategoryfg", depth: "2", groupId: "2", company_id: "123", _token: "hgsdhgjdsfjkfgdsk"}
         */
        $Data = [];
        // Create rule for check $request
        $rules = array(
            'NewName' => 'required',
            'groupId' => 'required',
        );
        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();

            return $this->JSONSend->Send($Data, 200);
        } else {
            //Update Group name
            $check = $this->DeviceGroup
                    ->where('id', $request->groupId)
                    ->update(['name' => $request->NewName]);

            // Register in Log
            // if(isset($request->log)){
            //     $this->ForLog->Log_Event($request->log);
            // }

            if ($check) {
                return $this->JSONSend->Send($Data, 200);
            }
        }
    }

    /*
     * Delete Group
     * */

    public function DeleteGroup(Request $request)
    {

        /* For Deleting Group
          {depth: "2", groupId: "5", company_id: "123", _token: "hgsdhgjdsfjkfgdsk", access_token: "sdfjkhfdsjkjhksj"}
         */
        $Data = [];
        // Create rule for check $request
        $rules = array(
            'depth' => 'required',
            'groupId' => 'required',
            'company_id' => 'required',
            'UnCatId' => 'required'
        );

        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);


        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 200);
        } else {
            $delete_status = $this->deleteGroupRecursive($request->groupId, $request->UnCatId);
            //           $count = $this->Device
            //                     ->where('group_id', $request->groupId)->count();
            //           if($count == 0){
            // $gcheck = $this->DeviceGroup
            //                     ->where('id', $request->groupId)->delete();
            //               $Data['sucess'] = 'Deleted';
            //               return $this->JSONSend->Send($Data, 200);
            //    }
            //           $dcheck = $this->Device
            //                     ->where('group_id', $request->groupId)->delete();
            //           if ($dcheck) {
            //           $gcheck = $this->DeviceGroup
            //                     ->where('id', $request->groupId)->delete();
            //           }
            $count = $this->Device->count();
            if ($delete_status) {
                $Data['sucess'] = 'Deleted';
                $Data['count'] = $count;
                return $this->JSONSend->Send($Data, 200);
            }
        }

        // Register in Log
        if (isset($request->log)) {
            $this->ForLog->Log_Event($request->log);
        }
    }

    public function UpdateDeviceGroup(Request $request)
    {
        /* For Update Device parent_id in dms_equipment table when any  user Drop any device into other Group
          {deviceId: 5, parentId: "2", company_id: "123", _token: "hgsdhgjdsfjkfgdsk", access_token: "sdfjkhfdsjkjhksj"}
         */
        $Data = [];
        // Create rule for check $request
        $rules = array(
            'deviceId' => 'required',
            'parentId' => 'required',
            'company_id' => 'required'
        );

        // Validate if $request not true
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data['error'] = $validator->errors()->all();
            return $this->JSONSend->Send($Data, 200);
        } else {
            $check = $this->Device
                    ->where('id', $request->deviceId)
                    ->where('company_id', $request->company_id)
                    ->update(['group_id' => $request->parentId]);

            // Register in Log
            if (isset($request->log)) {
                $this->ForLog->Log_Event($request->log);
            }

            if ($check) {
                $Data['sucess'] = 'Deleted.';
                return $this->JSONSend->Send($Data, 200);
            }
        }
    }

    public function deleteGroupRecursive($group_id, $UnCatId)
    {
        $delete_status = null;
        $gcheck = $this->DeviceGroup
                      ->where('parent_id', $group_id)->get();
        if (!$gcheck->count()) {
            $device_delete = $this->Device
                      ->where('group_id', $group_id)->update(['group_id'=>$UnCatId]);
            $group_delete = $this->DeviceGroup
                      ->where('id', $group_id)->delete();
            return $group_delete;
        } else {
            foreach ($gcheck as $key => $group) {
                
                // $device_delete = $this->Device->where('group_id', $group_id)->delete();
                $device_delete = $this->Device->where('group_id', $group_id)->update(['group_id'=>$UnCatId]);
                $group_delete = $this->DeviceGroup
                      ->where('id', $group_id)->delete();
                $delete_status = $this->deleteGroupRecursive($group->id, $UnCatId);
            }
        }
        return $delete_status;
    }
}
