<?php

namespace App\Http\Controllers\Mock;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use ResponseJson;

class MockController extends Controller {

    private $JSONSend;

    function __construct() {
        $this->JSONSend = new ResponseJson();
    }

    public function test_Mock(Request $request) {
        print_r($request->all());
    }
    //Hit to Banq for getting the valid session token_access code and check the device valididty
    public function AddNewDevice(Request $request) {

        /* access_token, bdid, device_name, description */
        $Data = [];
        if (!empty($request->all())) {

            if (!empty($request->all()) && !empty($request->get('device_name')) && !empty($request->get('bdid'))) {
                //All data received
                $Data['result_code'] = '200';
            } elseif (empty($request->all())) {
                //validate token 
                $Data['error'] = 'Invalid access token.';
            } elseif (empty($request->get('device_name'))) {
                //validate device data 
                $Data['error'] = 'Empty device name.';
            } elseif (empty($request->get('bdid'))) {
                //validate device bdid
                $Data['error'] = 'Empty device BDID.';
            } else {
                $Data['error'] = 'Something went wrong. Please try again later."}';
            }
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /*
      Set New Device
     * */

    public function SetDevName(Request $request) {

        /* access_token, bdid, device_name, description */
        $Data = [];
        if (!empty($request->all())) {

            if (!empty($request->all()) && !empty($request->get('device_name')) && !empty($request->get('bdid'))) {
                //All data received
                $Data['result_code'] = '200';
            } elseif (empty($request->all())) {
                //validate token 
                $Data['error'] = 'Invalid access token.';
            } elseif (empty($request->get('device_name'))) {
                //validate device data 
                $Data['error'] = 'Empty device name.';
            } elseif (empty($request->get('bdid'))) {
                //validate device bdid
                $Data['error'] = 'Empty device BDID.';
            } else {
                $Data['error'] = 'Something went wrong. Please try again later."}';
            }
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /*
      Set Device Description
     * */

    public function SetDevDescription(Request $request) {

        /* access_token, bdid, description */
        $Data = [];
        if (!empty($request->all())) {

            if (!empty($request->all()) && !empty($request->get('description')) && !empty($request->get('bdid'))) {
                //All data received
                $Data['result_code'] = '200';
            } elseif (empty($request->get('bdid'))) {
                //validate device bdid
                $Data['error'] = 'Empty device BDID.';
            } elseif (empty($request->get('description'))) {
                //validate device description 
                $Data['error'] = 'Empty description.';
            } else {
                $Data['error'] = 'Something went wrong. Please try again later."}';
            }
        } else {

            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /*
      Get Device List(Recent Added)
     * */

    public function GetDeviceListRecent(Request $request) {
        /* access_token */
        $Data = [];
        if (!empty($request->all())) {

            if (!empty($request->all())) {
                //All data received
                $Data['result_code'] = '200';
            } else {
                $Data['error'] = 'Something went wrong. Please try again later."}';
            }
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /*
      Get Device Sync (Added By Me)
     * */

    public function DeviceSync(Request $request) {
        /* access  */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /*
      Get Device List (Added By Me)
     * */

    public function GetDeviceListByMe(Request $request) {
        /* access_token */
        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /*
     * Get Device Status
     * */

    public function GetDeviceStatus(Request $request) {
        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /*
     * Check Device
     * */

    public function CheckDevice(Request $request) {

        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /*
     * Edit Device
     * */

    public function EditDevice(Request $request) {
        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /*
     * Delete Device
     * */

    public function DeleteDevice(Request $request) {
        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /* CSV import */

    public function csvImport(Request $request) {
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
                    $Data['rowsImported'] = count($Data);
                    $Data['format'] = $ext;
                } else {
                    $Data['errors'] = 'File is empty.';
                }
            } else {
                $Data['errors'] = 'Please upload .CSV file.';
            }
        } else {
            $Data['errors'] = 'Please upload file.';
        }
        return $this->JSONSend->Send($Data, 200);
    }

    /*
      Set Device Name into Device
     * */

    public function RenameDevice(Request $request) {
        /* For Device Rename {
         */
        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /*
     * Change Device Group
     * */

    public function ChangeDevice(Request $request) {
        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /* Bulk changes device */

    public function BulkChangeDevice(Request $request) {

        $rw = json_decode($request->input('data'));
        $data = [];
        if (!empty($rw)) {
            $Data['sucess'] = '200';
        } else {
            $Data['error'] = 'Some error';
        }
        return $this->JSONSend->Send($Data, 200);
    }

    /* -------------------------------------- */
    /* -------------------------------------- */
    /* -------------------------------------- */
    /* -------------------------------------- */
    /* --------Group Mock Routes------------- */
    /* -------------------------------------- */
    /* -------------------------------------- */
    /* -------------------------------------- */
    /* -------------------------------------- */

    /* Add new Group */

    public function AddNewGroup(Request $request) {
        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /* Edit Group */

    public function EditGroup(Request $request) {
        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /* Delete Group */

    public function DeleteGroup(Request $request) {
        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /* Rename Group */

    public function RenameGroup(Request $request) {
        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

    /* Group Sync */

    public function GroupSync(Request $request) {
        /* access */
        $Data = [];
        if (!empty($request->all())) {
            //All data received
            $Data['result_code'] = '200';
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }

        return $this->JSONSend->Send($Data, 200);
    }

}
