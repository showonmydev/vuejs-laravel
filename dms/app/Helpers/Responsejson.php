<?php

use Illuminate\Support\Facades\DB;
use App\Logs;
use App\Model\DeviceMeta;

class Responsejson
{
    /**
     * @param int $user_id User-id
     *
     * @return string
     */
    public function Send($data, $code)
    {
        $Time = time();
        return response()->json($data, $code)
                         ->withHeaders([
                            'Content-Type' => 'application/json',
                            'Accept' => 'application/json',
                            'Key' => env('KEY'),
                            'Authorization' => 'BenQ',
                            'Signature-Time' => $Time,
                            'Signature' => base64_encode(hash_hmac('sha1', $Time, env('KEY'), true))
                         ]);
    }

    public function Log_Event($data, $type='2')
    {
        $id = Auth::id();
        $res = Logs::insert([
                'user_id' => $id,
                'operation' => $data,
                'status' => 'success',
                'type' => $type,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
               ]);
        if ($res) {
            return true;
        }
        return false;
    }

    public function GetCallFromAnotherServe($type, $data, $url)
    {
        $base_url = env('MOCK_URL');
        $res = [];
        $http = new GuzzleHttp\Client([
            'headers' => [ 'Content-Type' => 'application/json' ]
        ]);
        try {
            if ($type == 'post') {
                $response = $http->post($base_url.$url, [
                'form_params' => [
                    $data
                ],
                'http_errors' => false // add this to return errors in json
            ]);
            }
            if ($type == 'get') {
                $response = $http->get($url, [
                'form_params' => [
                    $data
                ],
                'http_errors' => false // add this to return errors in json
            ]);
            }
        } catch (Exception $e) {
            $res['error'] = $e->getMessage();
        }
        $res['data'] = $response->getBody()->getContents();
        $res['status'] = $response->getStatusCode();
        return $res;
    }

    public function GetParam(array $data)
    {
        $parameter = $data['parameter_key'];
        $deviceId = $data['bdid'];
        $value = $data['parameter_value'];
        if ($parameter == 'ip') {
            $par = ['device_id' => $deviceId,
                    'netcfgmode' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/netcfgmode'];
        } elseif ($parameter == 'ipAddrConfig') {
            $par = ['device_id' => $deviceId,
                    'ipAddrConfig' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/ipaddrconfig'];
        } elseif ($parameter == 'avmute') {
            $par = ['device_id' => $deviceId,
                    'avmute' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/avmute'];
        } elseif ($parameter == 'power') {
            $par = ['device_id' => $deviceId,
                    'powermode' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/powermode'];
        } elseif ($parameter == 'inputSource') {
            $par = ['device_id' => $deviceId,
                    'inputsrc' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/inputsrc'];
        } elseif ($parameter == 'audioMute') {
            $par = ['device_id' => $deviceId,
                    'audiomute' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/audiomute'];
        } elseif ($parameter == 'volume') {
            $par = ['device_id' => $deviceId,
                    'vollvl' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/vollvl'];
        } elseif ($parameter == 'aspectRatio') {
            $par = ['device_id' => $deviceId,
                    'aspectratio' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/aspectratio'];
        } elseif ($parameter == 'screenBlank') {
            $par = ['device_id' => $deviceId,
                    'screenblank' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/screenblank'];
        } elseif ($parameter == 'pictureMode') {
            $par = ['device_id' => $deviceId,
                    'pictmode' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/pictmode'];
        } elseif ($parameter == 'reset') {
            $par = ['device_id' => $deviceId,
                    'reset' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/reset'];
        } elseif ($parameter == 'mac_address') {
            $par = ['device_id' => $deviceId,
                    'reset' => $value ];
            $data = ['data'=>$par, 'URL'=>'device/set/netcfgmode'];
        } elseif ($parameter == 'description') {
            $par = ['device_id' => $deviceId,
                    'reset' => $value];
            $data = ['data'=>$par, 'URL'=>'device/set/description'];
        } else {
            $par = ['device_id' => $deviceId,
                    'reset' => $value];
            $data = ['data'=>$par, 'URL'=>'device/set/description'];
        }
        //return $this->GetCallFromAnotherServe('post', $data['data'], 'mock/'.$data['URL']);
        return true;
    }

    public function SendRequestToBenq($type, $data, $url)
    {
        $base_url = env('BenQAPI');
        $res = [];
        $http = new \GuzzleHttp\Client([
            'headers'=> [ 'Content-Type' => 'application/json', 'Accept' => 'application/json' ]
        ]);
        try {
            if ($type == 'post') {
                $response = $http->post($base_url.$url, [
                'json' => $data,
                'http_errors' => false // add this to return errors in json
            ]);
            }
            if ($type == 'get') {
                $response = $http->get($base_url.$url, [
                'json' => $data,
                'http_errors' => false // add this to return errors in json
            ]);
            }
        } catch (Exception $e) {
            $res['error'] = $e->getMessage();
        }
        //dd($response);
        $res['data'] = $response->getBody()->getContents();
        $res['status'] = $response->getStatusCode();
        return $res;
    }

    public function SendRequestToShadoDB($type, $data, $url)
    {
        $base_url = env('RestServerAPI');
        $res = [];
        $http = new \GuzzleHttp\Client([
            'headers'=> [ 'Content-Type' => 'application/json', 'Accept' => 'application/json' ]
        ]);
        $response = '';
        try {
            if ($type === 'post') {
                $response = $http->post($base_url.$url, [
                'json' => $data,
                'http_errors' => false // add this to return errors in json
            ]);
            }
            if ($type == 'get') {
                $response = $http->get($base_url.$url, [
                'json' => $data,
                'http_errors' => false // add this to return errors in json
            ]);
            }
        } catch (Exception $e) {
            $res['error'] = $e->getMessage();
        }
        //dd($res['error']);
        //dd($response);
        $res['data'] = $response->getBody()->getContents();
        $res['status'] = $response->getStatusCode();
        return $res;
    }

    public function GetDeviceId($bdid)
    {
        $data = DeviceMeta::select('bdid')->where('parameter_value', $bdid)->where('parameter_key', 'bdid')->first();
        if ($data) {
            if ($data->toArray()) {
                return $data->toArray()['bdid'];
            } else {
                return false;
            }
        } else {
        }
    }
}
