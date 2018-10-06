<?php

namespace App\Http\Controllers\MQTT;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use ResponseJson;

class MqttController extends Controller
{
    private $JSONSend;

    public function __construct()
    {
        $this->JSONSend = new ResponseJson();
    }

    public function mqttpublish(Request $request)
    {
        $Data = [];
        if (!empty($request->all())) {
            if (!empty($request->all()) && !empty($request->get('topic')) && !empty($request->get('msg'))) {
                //All data received
                $Data['result_code'] = '200';
                $Data['time'] = $request->get('time');
                $Data['topic'] = $request->get('topic');
                $Data['msg'] = $request->get('msg');
            }
        } else {
            //System / server error / unable to process request.
            $Data['error'] = 'Unknown error.';
        }
        return $this->JSONSend->Send($Data, 200);
    }
}
