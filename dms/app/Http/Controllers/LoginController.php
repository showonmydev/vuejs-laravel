<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator;
use DB;
use Hash;
use Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;
use Cookie;
use Config;
use Socialite;
use App\User;
use App\Model\DeviceGroup;
use Auth;
use ResponseJson;
use App\Model\Company;
use App\Model\CompanySync;
use App\Model\Member;
use App\Model\MemberSync;
use App\Model\MemberPermission;
use App\Model\CompanyStatus;

class LoginController extends Controller
{
    private $User;
    private $DeviceGroup;
    private $Helper;

    public function __construct()
    {
        $this->User = new User();
        $this->DeviceGroup = new DeviceGroup();
        $this->Helper = new ResponseJson();
    }
    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }
    public function redirectToProvider()
    {
        return Socialite::with('benq')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        if (url('/') != "http://127.0.0.1:8000") {
            //For Live
            $users = Socialite::driver('benq')->user();
            $userArr = $users->user;
            // Get All Details
            $data_member = ["service"=>"dms","mct_member_id"=>$userArr['id']];
            $res_member = $this->Helper->SendRequestToBenq('post', $data_member, 'member/getOne');
            $iam_member_data = json_decode($res_member['data'])->member;
            if ($iam_member_data->role == "Administrator") {
                $role = 3;
            } elseif ($iam_member_data->role == "SuperAdmin") {
                $role = 4;
            } elseif ($iam_member_data->role == "RO") {
                $role = 1;
            } else {
                $role = 2;
            }
            $user = ['id' => $userArr['id'], 'name' => $userArr['name'], 'email' => $userArr['email'], 'company_id' => $iam_member_data->company_id, 'remember_token' => $userArr['remember_token'], 'account' => $userArr['account'], 'comment'=>'', 'role' => $role];
        } else {
            $user = ['id' => 1236, 'name' => 'Neethu Kuruvilla', 'account' => 'neethu', 'email' => 'neethu@katprotech.com', 'timezone' => 'Asia/Kolkata', 'comment' => '', 'company_id' => 6151, 'created_at' => '2018-04-27 10:05:39', 'updated_at' => '2018-04-27 10:05:39', 'remember_token' => 'Pz3iEOgtFkrfLLdQeLATWDYfO0aDvAMknKS7YfJ6tbK9zqp4BJjoyMiBb4Uw', 'role' => '2'];
        }
        $res = $this->Login($user);
        return redirect(env('UI_BASE_URL').'#/?token='.$res['token'].'&account_id='.$res['company_id'].'&company_id='.$res['local_company_id']);
    }

    /**
     * Logout User Unset Token
     *
     */
    public function Logout(Request $request)
    {
        //Constants::SUBDOMAIN_COOKIE_FOREVER
        Cookie::queue(Config::get('session.sub_session'), '', 2628000, null, Config::get('session.sub_domain'));
        if (Auth::check()) {
            JWTAuth::invalidate(JWTAuth::getToken());
            $request->session()->flush();
            Auth::logout();
        }

        return redirect('login/benq');
    }

    /**
     * Check User Token If Exist or not
     */
    public function CheckToken()
    {
    }

    public function createMemberViaSync($data)
    {
        $role = $data->role;
        if ($role == "Administrator") {
            $role = 3;
        } elseif ($role == "SuperAdmin") {
            $role = 1;
        } elseif ($role == "RO") {
            $role = 1;
        } elseif ($role == "Member") {
            $role = 2;
        }else {
            $role = $data->role;
        }
        if (!Member::where('mct_member_id', $data->id)->count()) {
            $temp = [
                     'name'=>$data->name,
                     'account'=>$data->account,
                     'email'=>$data->email,
                     'timezone'=>$data->timezone,
                     'comment'=>$data->comment,
                     'enable_flag'=>$data->enable_flag,
                     'company_id'=>(int)$data->company_id,
                     'mct_member_id'=>$data->id
                    ];
            if (!User::where('member_id', $data->id)->count()) {
                User::insert(
                   ['name'=>$data->name,
                    'email'=>$data->email,
                    'password'=>bcrypt($data->company_id),
                    'company_id'=>(int)$data->company_id,
                    'account_name'=>$data->account,
                    'role'=>$role,
                    'member_id'=>$data->id]
                );
            } else {
                User::where('email', $data->email)->where('company_id',$data->company_id)->update(
                       ['name'=>$data->name,
                        'email'=>$data->email,
                        'password'=>bcrypt($data->company_id),
                        'company_id'=>(int)$data->company_id,
                        'account_name'=>$data->account,
                        'role'=>$role,
                        'member_id'=>$data->id]
                    );
            }
            $permissionArr = [];
            $MemberSync = ['mct_member_id'=>$data->id,
                           'mct_member_change_id'=>$data->member_change_id,
                           'mct_member_info_updated_at'=>date("Y-m-d H:i:s", (int)$data->member_info_updated_at),
                           'mct_permission_updated_at'=>date("Y-m-d H:i:s", (int)$data->permission->permission_updated_at)];
            $MemberID = Member::insertGetId($temp);
            if(MemberSync::where('mct_member_id',$data->id)->get()->count()){
                MemberSync::insert($MemberSync);
            }
            foreach ($data->permission->name as $key1 => $value1) {
                array_push($permissionArr, ['permission_name'=>$value1,'member_id'=>$MemberID]);
            }
            if ($MemberID) {
                MemberPermission::insert($permissionArr);
            }
        }
    }

    public function SyncDBForAdmin($data)
    {
        $GetCompanyChangeId = [];
        $i = 1;
        $res = null;
        // do {
            $data = ["service"=>"dms","mct_member_id"=>$data['member_id']];
            $res = $this->Helper->SendRequestToBenq('post', $data, 'si/company/list');
            
            if (!empty($res['data'])) {
                $compData = json_decode($res['data'])->member->manage_company;
                // dd($compData);
                foreach ($compData as $key => $value) {
                    $iam_request = ["service"=>"dms","mct_company_id"=>$value->company_id,"mct_company_change_id"=>""];
                    $iam_company_data = $this->Helper->SendRequestToBenq('post', $iam_request, 'company/getOne');
                    $iam_company_data = json_decode($iam_company_data['data'])->company;

                    if (!CompanySync::where('mct_company_change_id', $iam_company_data->id)->count()) {
                        if (!in_array($value->id, $GetCompanyChangeId))
                        {
                            array_push($GetCompanyChangeId,$value->id);
                        }
                    }
                }
            }
            // if (isset(json_decode($res['data'])->next_page)) {
            //     $i=json_decode($res['data'])->next_page;
            // } else {
            //     $i = null;
            // }
        // } while ($i);

        if ($GetCompanyChangeId) {
            $i = 0;
            do {
                $slice = array_slice($GetCompanyChangeId,$i,$i+50);
                if ($slice) {
                    // Here I have call to 1497594520
                    $data = ["service"=>"dms","mct_company_id"=>$slice];
                    $res = $this->Helper->SendRequestToBenq('post', $data, 'company/getMany');
                    if (!empty($res['data']) && $res['status']==200) {
                        $compDatas = json_decode($res['data'])->company;
                        foreach ($compDatas as $key => $value) {
                            if (isset($value->name)) {
                                if (!Company::where('id', $value->id)->count()) {
                                    Company::insertGetId(['id'=>$value->id,'name'=>$value->name,'nation_region_id'=>$value->nation_region_id,'enable_flag'=>$value->enable_flag,'mct_company_id'=>$value->id]);
                                    // STORE IN STATUS TABLE
                                    CompanyStatus::insert(['company_id'=>$value->id,'total_space'=>1048576,'used_space'=>0,'created_at'=>now()]);
                                    if (!CompanySync::where('mct_company_id', $value->id)->count()) {
                                        CompanySync::insert(['mct_company_id'=>$value->id,'mct_company_change_id'=>$value->company_change_id]);
                                    }
                                }
                            }
                        }
                    }
                    $i = $i+50;
                } else {
                    $i = 0;
                }
            } while ($i);
        }

        if ($GetCompanyChangeId) {
            $i = 0;
            do {
                $slice = array_slice($GetCompanyChangeId,$i,$i+10);
                if ($slice) {
                    // Here I have call to 1497594520
                    $data = ["service"=>"dms","mct_company_id"=>$slice];
                    $res = $this->Helper->SendRequestToBenq('post', $data, 'member/getAdmin');
                    if (!empty($res['data']) && $res['status']==200) {
                        $compDatas = json_decode($res['data'])->member;
                        foreach ($compDatas as $key => $value) {
                            if (isset($value->name)) {
                                $this->createMemberViaSync($value);
                            }
                        }
                    }
                    $i = $i+10;
                } else {
                    $i = 0;
                }
            } while ($i);
        }
        return true;
    }

    public function SyncDBForSuperAdmin()
    {
        $GetCompanyChangeId = [];
        $i = 1;
        $res = null;
        do {
            $data = ["service"=>"dms","page"=>$i];
            $res = $this->Helper->SendRequestToBenq('post', $data, 'company/getChangeId');
            if (!empty($res['data'])) {
                $compData = json_decode($res['data'])->company;
                // dd($compData);
                foreach ($compData as $key => $value) {
                    if (!CompanySync::where('mct_company_id', $value->id)->where('mct_company_change_id', $value->company_change_id)->count()) {
                        if (!in_array($value->id, $GetCompanyChangeId))
                        {
                            array_push($GetCompanyChangeId,$value->id);
                        }
                    }
                }
            }
            if (isset(json_decode($res['data'])->next_page)) {
                $i=json_decode($res['data'])->next_page;
            } else {
                $i = null;
            }
        } while ($i);

        if ($GetCompanyChangeId) {
            $i = 0;
            do {
                $slice = array_slice($GetCompanyChangeId,$i,$i+20);
                if ($slice) {
                    // Here I have call to 1497594520
                    try {
                        $data = ["service"=>"dms","mct_company_id"=>$slice];
                        $res = $this->Helper->SendRequestToBenq('post', $data, 'company/getMany');
                        \Log::info('INFOOOOOOOOOOOOOOOO');
                        \Log::info(print_r($res));
                        if (!empty($res['data']) && $res['status']==200) {
                            $compDatas = json_decode($res['data'])->company;
                            foreach ($compDatas as $key => $value) {
                                if (isset($value->name) && isset($value->nation_region_id) && isset($value->enable_flag)) {
                                    if (!Company::where('id', $value->id)->count()) {
                                        Company::insertGetId(['id'=>$value->id,'name'=>$value->name,'nation_region_id'=>$value->nation_region_id,'enable_flag'=>$value->enable_flag,'mct_company_id'=>$value->id]);
                                        if (!CompanySync::where('mct_company_id', $value->id)->count()) {
                                            CompanySync::insert(['mct_company_id'=>$value->id,'mct_company_change_id'=>$value->company_change_id]);
                                        }
                                    }
                                }
                            }
                        }
                    }catch(Exception $e){
                        \Log::info(print_r($e->getMessage()));
                        continue;
                    }
                    $i = $i+20;
                    echo  $i.'<br/>';
                } else {
                    $i = 0;
                }
            } while ($i);
        }

        if ($GetCompanyChangeId) {
            $i = 0;
            do {
                $slice = array_slice($GetCompanyChangeId,$i,$i+20);
                if ($slice) {
                    // Here I have call to 1497594520
                    $data = ["service"=>"dms","mct_company_id"=>$slice];
                    $res = $this->Helper->SendRequestToBenq('post', $data, 'member/getAdmin');
                    if (!empty($res['data']) && $res['status']==200) {
                        $compDatas = json_decode($res['data'])->member;
                        foreach ($compDatas as $key => $value) {
                            if (isset($value->name)) {
                                $this->createMemberViaSync($value);
                            }
                        }
                    }
                    $i = $i+20;
                } else {
                    $i = 0;
                }
            } while ($i);
        }
        return true;
    }
    
    public function Login(array $request)
    {
        $email = $request['email'];
        $password = $request['company_id'];
        $name = $request['name'];
        $email = $request['email'];
        $password = $request['company_id'];
        $company_id = $request['company_id'];
        $account = $request['account'];
        $benQToken = $request['remember_token'];
        $data = ['name' => $name, 'email' => $email, 'benQToken' => $benQToken, 'company_id' => $company_id, 'account_name' => $account, 'member_id'=>$request['id'], 'password' => bcrypt($password), 'remember_token1' => $benQToken, 'role'=>$request['role']];

        //Here is the Checking login User Role If Role is SuperAdmin and RO we need to Sync All Company
            if($request['role'] == 1){
                $this->SyncDBForSuperAdmin();
            }
        //Here is End the Code
         //Here is the Checking login User Role If Role is SuperAdmin and RO we need to Sync All Company
         if($request['role'] == 3){
            $this->SyncDBForAdmin($data);
        }
        //Here is End the Code

        

        //anees (company sync)
        $iam_request = ["service"=>"dms","mct_company_id"=>$company_id,"mct_company_change_id"=>""];
        
        $iam_company_data = $this->Helper->SendRequestToBenq('post', $iam_request, 'company/getOne');

        if (!empty($iam_company_data['data']) && $iam_company_data['status']==200) {
            $company_data = Company::where('mct_company_id', $company_id)->first();
            $iam_company_data = json_decode($iam_company_data['data'])->company;
                if ($company_data) {
                    $changeId = CompanySync::where('mct_company_id',$company_data->id)->first();
                    if ($changeId && $changeId->mct_company_change_id == $iam_company_data->company_change_id) {
                        Company::where('mct_company_id', $company_id)->update(['name'=>$iam_company_data->name,'nation_region_id'=>$iam_company_data->nation_region_id, 'enable_flag'=> $iam_company_data->enable_flag]);
                        $company_created_id = $company_data->id;
                    }
                } else {
                    $company_created_id = Company::insertGetId(['id'=>$company_id, 'name'=>$iam_company_data->name,'nation_region_id'=>$iam_company_data->nation_region_id, 'enable_flag'=> $iam_company_data->enable_flag, 'created_at'=> date("Y-m-d h:i:s"), 'updated_at' => date("Y-m-d h:i:s"), 'mct_company_id'=>$company_id]);
                }

                $company_sync = CompanySync::where('mct_company_id', $company_id)->first();
                if ($company_sync) {
                    if ($company_sync->mct_company_change_id == $iam_company_data->company_change_id) {
                        CompanySync::where('mct_company_id', $company_id)->update(['mct_company_change_id'=>$iam_company_data->company_change_id,'mct_company_info_updated_at'=>date("Y-m-d h:i:s")]);
                    }
                } else {
                    $company_data = CompanySync::insert(['mct_company_id'=>$company_id,'mct_company_change_id'=>$iam_company_data->company_change_id,'mct_company_info_updated_at'=>date("Y-m-d h:i:s")]);
                }
        }
        // check it is already register
        $count = $this->User->where('email', $email)->where('company_id', $password)->count();

        if ($count == 0) {
            // Register As a User
            $user1 = $this->User->insertGetId($data);

            // Register Default group
            $GroupData = ['name' => 'All',
            'company_id' => $company_id,
            'lft' => '0',
            'rgt' => '0',
            'depth' => 1,
            'created_user' => $user1,
            'updated_user' => $user1,
            'parent_id' => 0,
            'created_at' => date("Y-m-d H:i:s")];
            $Id = $this->DeviceGroup->insertGetId($GroupData);

            // Register AnotherGroup UnCategory Default group
            $UnCatGroupData = ['name' => 'Uncategorized',
            'company_id' => $company_id,
            'lft' => '0',
            'rgt' => '0',
            'depth' => 2,
            'created_user' => $user1,
            'updated_user' => $user1,
            'parent_id' => $Id,
            'created_at' => date("Y-m-d H:i:s")];
            $this->DeviceGroup->insertGetId($UnCatGroupData);
        }
        //echo 'Yes I Am In';
        //$this->User('',$account)

        //anees (member sync)
        $data_member = ["service"=>"dms","mct_member_id"=>$request['id']];
        $res_member = $this->Helper->SendRequestToBenq('post', $data_member, 'member/getOne');
        $iam_member_data = json_decode($res_member['data'])->member;

        $member = Member::where('mct_member_id', $iam_member_data->id)->first();
        
        $member_array = [
            'name'=>$iam_member_data->name,
            'account'=>$iam_member_data->account,
            'email'=>$iam_member_data->email,
            'timezone'=>$iam_member_data->timezone,
            'comment'=>$iam_member_data->comment,
            'enable_flag'=>$iam_member_data->enable_flag,
            'company_id'=>$company_id,
            'mct_member_id'=>$iam_member_data->id,
            'role'=>$iam_member_data->role
        ];
        $MemberSyncData = ['mct_member_id'=>$iam_member_data->id,
        'mct_member_change_id'=>$iam_member_data->member_change_id,
        'mct_member_info_updated_at'=>date("Y-m-d H:i:s", (int)$iam_member_data->member_info_updated_at),
        'mct_permission_updated_at'=>date("Y-m-d H:i:s", (int)$iam_member_data->permission->permission_updated_at)];

       

        if ($member) {
            if($member->mct_member_id == $iam_member_data->member_change_id){
                Member::where('mct_member_id', $iam_member_data->id)->update($member_array);
                $member_id = $member->id;
            }
        } else {
            $member_id = Member::insertGetId($member_array);
        }

        $memberSync = MemberSync::where('mct_member_id', $iam_member_data->id)->first();

        if ($member && $memberSync) {
            if($member->mct_member_id == $iam_member_data->member_change_id){
                MemberSync::where('mct_member_id', $iam_member_data->id)->update($MemberSyncData);
            }
        } else {
            $member_data = MemberSync::insert($MemberSyncData);
        }

        $permissionArr = array();
        $flag = false;
        // Delete All MemberPermission
        if (isset($member_id)) {
            MemberPermission::where('member_id', $member_id)->delete();

            foreach ($iam_member_data->permission->name as $key1 => $value1) {
                array_push($permissionArr, ['permission_name'=>$value1,'member_id'=>$member_id]);
                $flag = true;
            }
            if ($flag && $member_id) {
                MemberPermission::insert($permissionArr);
            }
        }

        $credentials = ['email'=> $email, 'password'=>$password];

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                //echo 'Success';
                //return response()->json(['success' => false, 'error' => 'We cant find an account with this credentials. Please make sure you entered the right information and you have verified your email address.'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'error' => 'Failed to login, please try again.'], 500);
        }
        $data['token'] = $token;
        $data['local_company_id'] = $company_id;

        return $data;
    }


    public function LoginViaAPI(Request $request)
    {
        //End Checking Header
        $Data = [];
        if(!isset($request->service)){
            return $this->Helper->Send(['result_code'=>'400','error'=>'Please provide service.'], 400);
        } elseif(!isset($request->account)) {
            return $this->Helper->Send(['result_code'=>'400','error'=>'Please provide username.'], 400);
        } elseif(!isset($request->password)) {
            return $this->Helper->Send(['result_code'=>'400','error'=>'Please provide password.'], 400);
        } else {
            $data = ['service' => $request->service,
            'account' => $request->account,
            'password' => $request->password];
            /*TEST*/
            // $data = ["service"=>"dms","role"=>"SuperAdmin"];
            // $res = $this->Helper->SendRequestToBenq('post', $data, 'company/listWithAdmin');
            
            $res = $this->Helper->SendRequestToBenq('post', $data, 'account/login');
            $obj = json_decode($res['data']);
            if(!$obj || $obj->result_code==401){
                return $this->Helper->Send(['result_code'=>'401','error'=>'Incorrect username or password'], 401);
            }
            /*******
             * Here is Member ID
             */
            $data_member = ["service"=>"dms","mct_member_id"=>$obj->member_id];
            $res_member = $this->Helper->SendRequestToBenq('post', $data_member, 'member/getOne');
            if($res_member['data']){
                $temp = json_decode($res_member['data']);
                if ($temp->member->role == "SuperAdmin" || $temp->member->role == "RO") {
                    $this->SyncDBForSuperAdmin();
                    $Data['result_code'] = "401";
                    $Data['error'] = 'login not allow';
                    return $this->Helper->Send($Data, 401);
                } else {
                    $Tempuser = ['id' => $temp->member->id, 'name' => $temp->member->name, 'account' => $temp->member->account, 'email' => $temp->member->email, 'timezone' => $temp->member->timezone, 'comment' => '', 'company_id' => $temp->member->company_id, 'created_at' => '2018-04-27 10:05:39', 'updated_at' => '2018-04-27 10:05:39', 'remember_token' => $obj->access_token, 'role' => '1'];
                    $this->LoginRestViaAPI($Tempuser);
                }
            }
            /////////////

            if ($res['status']==200 && isset($obj->result_code) && $obj->result_code == 200) {
                // Add by anees (fix: adding jwt token)
                $user = $this->User->where('member_id', $obj->member_id)->first();
                $credentials = ['email'=> $user->email, 'password'=>$user->company_id];
                $token = JWTAuth::attempt($credentials);
                $comp = Company::where('mct_company_id', $obj->company_id)->first();
                $res = [];
                $res["result_code"] = "200";
                $res["token"] = $token;
                $res["company_id"] = (string)$obj->company_id;
                //$res["company_name"] = $comp->name;
                $res["company_change_id"] = (string)$obj->company_change_id;
                $res["member_id"] = (string)$obj->member_id;
                $res["member_change_id"] = (string)$obj->member_change_id;
                return $res;
            } else {
                $Data['result_code'] = "500";
                $Data['error'] = "Something went wrong. Please try again later";
                return $this->Helper->Send($Data, 500);
            }
        }
        $Data['result_code'] = "500";
        $Data['error'] = "Something went wrong. Please try again later";
        return $this->Helper->Send($Data, 500);
    }

    /* Here I have write code for sync company and member while API login */
    public function LoginRestViaAPI(array $request)
    {
        $email = $request['email'];
        $password = $request['company_id'];
        $name = $request['name'];
        $email = $request['email'];
        $password = $request['company_id'];
        $company_id = $request['company_id'];
        $account = $request['account'];
        $benQToken = $request['remember_token'];
        $data = ['name' => $name, 'email' => $email, 'benQToken' => $benQToken, 'company_id' => $company_id, 'account_name' => $account, 'member_id'=>$request['id'], 'password' => bcrypt($password), 'remember_token1' => $benQToken, 'role'=>$request['role']];

        //anees (company sync)
        $iam_request = ["service"=>"dms","mct_company_id"=>$company_id,"mct_company_change_id"=>""];
        $iam_company_data = $this->Helper->SendRequestToBenq('post', $iam_request, 'company/getOne');
        if (!empty($iam_company_data['data']) && $iam_company_data['status']==200) {
            $company_data = Company::where('mct_company_id', $company_id)->first();
            $iam_company_data = json_decode($iam_company_data['data'])->company;
                if ($company_data) {
                    $changeId = CompanySync::where('mct_company_id',$company_data->id)->first();
                    if ($changeId && $changeId->mct_company_change_id == $iam_company_data->company_change_id) {
                        Company::where('mct_company_id', $company_id)->update(['name'=>$iam_company_data->name,'nation_region_id'=>$iam_company_data->nation_region_id, 'enable_flag'=> $iam_company_data->enable_flag]);
                        $company_created_id = $company_data->id;
                    }
                } else {
                    $company_created_id = Company::insertGetId(['id'=>$company_id, 'name'=>$iam_company_data->name,'nation_region_id'=>$iam_company_data->nation_region_id, 'enable_flag'=> $iam_company_data->enable_flag, 'created_at'=> date("Y-m-d h:i:s"), 'updated_at' => date("Y-m-d h:i:s"), 'mct_company_id'=>$company_id]);
                }

                $company_sync = CompanySync::where('mct_company_id', $company_id)->first();
                if ($company_sync) {
                    if ($company_sync->mct_company_change_id == $iam_company_data->company_change_id) {
                        CompanySync::where('mct_company_id', $company_id)->update(['mct_company_change_id'=>$iam_company_data->company_change_id,'mct_company_info_updated_at'=>date("Y-m-d h:i:s")]);
                    }
                } else {
                    $company_data = CompanySync::insert(['mct_company_id'=>$company_id,'mct_company_change_id'=>$iam_company_data->company_change_id,'mct_company_info_updated_at'=>date("Y-m-d h:i:s")]);
                }
        }

        // check it is already register
        $count = $this->User->where('email', $email)->where('company_id', $password)->count();
        if ($count == 0) {
            // Register As a User
            $user1 = $this->User->insertGetId($data);

            // Register Default group
            $GroupData = ['name' => 'All',
            'company_id' => $company_created_id,
            'lft' => '0',
            'rgt' => '0',
            'depth' => 1,
            'created_user' => $user1,
            'updated_user' => $user1,
            'parent_id' => 0,
            'created_at' => date("Y-m-d H:i:s")];
            $Id = $this->DeviceGroup->insertGetId($GroupData);

            // Register AnotherGroup UnCategory Default group
            $UnCatGroupData = ['name' => 'Uncategorized',
            'company_id' => $company_created_id,
            'lft' => '0',
            'rgt' => '0',
            'depth' => 2,
            'created_user' => $user1,
            'updated_user' => $user1,
            'parent_id' => $Id,
            'created_at' => date("Y-m-d H:i:s")];
            $this->DeviceGroup->insertGetId($UnCatGroupData);
        }
        //echo 'Yes I Am In';
        //$this->User('',$account)

        //anees (member sync)
        $data_member = ["service"=>"dms","mct_member_id"=>$request['id']];
        $res_member = $this->Helper->SendRequestToBenq('post', $data_member, 'member/getOne');
        $iam_member_data = json_decode($res_member['data'])->member;

        $member = Member::where('mct_member_id', $iam_member_data->id)->first();
        
        $member_array = [
            'name'=>$iam_member_data->name,
            'account'=>$iam_member_data->account,
            'email'=>$iam_member_data->email,
            'timezone'=>$iam_member_data->timezone,
            'comment'=>$iam_member_data->comment,
            'enable_flag'=>$iam_member_data->enable_flag,
            'company_id'=>$company_created_id,
            'mct_member_id'=>$iam_member_data->id,
            'role'=>$iam_member_data->role
        ];
        $MemberSyncData = ['mct_member_id'=>$iam_member_data->id,
        'mct_member_change_id'=>$iam_member_data->member_change_id,
        'mct_member_info_updated_at'=>date("Y-m-d H:i:s", (int)$iam_member_data->member_info_updated_at),
        'mct_permission_updated_at'=>date("Y-m-d H:i:s", (int)$iam_member_data->permission->permission_updated_at)];

        if ($member) {
            if($member->mct_member_id == $iam_member_data->member_change_id){
                Member::where('mct_member_id', $iam_member_data->id)->update($member_array);
                $member_id = $member->id;
            }
        } else {
            $member_id = Member::insertGetId($member_array);
        }

        $memberSync = MemberSync::where('mct_member_id', $iam_member_data->id)->first();

        if ($member && $memberSync) {
            if($member->mct_member_id == $iam_member_data->member_change_id){
                MemberSync::where('mct_member_id', $iam_member_data->id)->update($MemberSyncData);
            }
        } else {
            $member_data = MemberSync::insert($MemberSyncData);
        }

        $permissionArr = array();
        $flag = false;

        // Delete All MemberPermission
        if (isset($member_id)) {
            MemberPermission::where('member_id', $member_id)->delete();

            foreach ($iam_member_data->permission->name as $key1 => $value1) {
                array_push($permissionArr, ['permission_name'=>$value1,'member_id'=>$member_id]);
                $flag = true;
            }
            if ($flag && $member_id) {
                MemberPermission::insert($permissionArr);
            }
        }


        $credentials = ['email'=> $email, 'password'=>$password];

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                //echo 'Success';
                //return response()->json(['success' => false, 'error' => 'We cant find an account with this credentials. Please make sure you entered the right information and you have verified your email address.'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'error' => 'Failed to login, please try again.'], 500);
        }
        $data['token'] = $token;
        $data['local_company_id'] = $company_created_id;

        return $data;
    }
    /* End of Code */

    public function LogoutViaAPI(Request $request)
    {
        $Data = [];
        // Validate if $request not true
        if (Auth::check()) {
            $res = JWTAuth::invalidate(JWTAuth::getToken());
            Auth::logout();
            return $this->Helper->Send(['result_code'=>'200','message'=>'User successfully logged out.'], 200);
        }
        return $this->Helper->Send($Data, 200);
    }

    public function TokenCheckViaAPI(Request $request)
    {
        $Data = [];
        // $rules = array(
        //     'token' => 'required'
        // );
        // $validator = Validator::make($request->all(), $rules);

        // if ($validator->fails()) {
        //     $Data['error'] = $validator->errors()->all();
        // } else {
        //     $data = ['access_token' => $request->access_token];
        //     $res = $this->Helper->SendRequestToBenq('post', $data, 'account/token/check');
        //     $obj = json_decode($res['data']);
        //     if ($res['status']==200 && isset($obj->result_code) && $obj->result_code == 200) {
        //         $Data['success'] = $res['data'];
        //     } else {
        //         $Data['error'] = $res;
        //     }
        // }
        $Data = ["result_code"=> "200",
                 "message"=> "Session valid."];

        return $this->Helper->Send($Data, 200);
    }

    public function PasswordForget(Request $request)
    {
        $Data = [];
        $rules = array(
            'service' => 'required',
            'email' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            // $Data['error'] = $validator->errors()->all();
            return $this->Helper->Send($validator->errors()->all(), 422);
        } else {
            $data = ['service' => $request->service, 'email' => $request->email];
            $res = $this->Helper->SendRequestToBenq('post', $data, 'password/forget');
            $obj = json_decode($res['data']);
            if ($res['status']==200 && isset($obj->result_code) && $obj->result_code == 200) {
                $Data = $res['data'];
            } else {
                $Data = $res['data'];
                return $this->Helper->Send(json_decode($Data), 422);
            }
        }
        return $this->Helper->Send(json_decode($Data), 200);
    }

    public function PasswordChange(Request $request)
    {
        $Data = [];
        $rules = array(
            'service' => 'required',
            'account' => 'required',
            'current_password' => 'required',
            'new_password' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data = $validator->errors()->all();
        } else {
            $data = ['service' => $request->service,
                    'account' => $request->account,
                    'current_password' => $request->current_password,
                    'new_password' => $request->new_password
        ];
            $res = $this->Helper->SendRequestToBenq('post', $data, 'password/change');
            $obj = json_decode($res['data']);
            if ($res['status']==200 && isset($obj->result_code) && $obj->result_code == 200) {
                $Data = $res['data'];
            } else {
                $Data = $res;
            }
        }
        return response()->json($Data, 200);
    }

    public function ResendVerificationMail(Request $request)
    {
        $Data = [];
        $rules = array(
            'service' => 'required',
            'email' => 'required'
        );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data = $validator->errors()->all();
            return response()->json($Data, 422);
        } else {
            $data = ['service' => $request->service,
                     'email' => $request->email
                    ];
            $res = $this->Helper->SendRequestToBenq('post', $data, 'account/verificationMail/resend');
            $obj = json_decode($res['data']);
            if ($res['status']==200 && isset($obj->result_code) && $obj->result_code == 200) {
                $Data = json_decode($res['data']);
            } else {
                $Data = json_decode($res['data']);
                $Data->result_code = (String)$Data->result_code;
                return response()->json($Data, 422);
            }
        }
        return response()->json($Data, 200);
    }

    public function ResetPassword(Request $request)
    {
        $Data = [];
        $rules = array(
        'service' => 'required',
        'email' => 'required'
    );
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $Data = $validator->errors()->all();
        } else {
            $data = ['service' => $request->service,
        			 'email' => $request->email
    				];
            $res = $this->Helper->SendRequestToBenq('post', $data, 'password/reset');
            $obj = json_decode($res['data']);
            if ($res['status']==200 && isset($obj->result_code) && $obj->result_code == 200) {
                $Data = $res['data'];
            } else {
                $Data = $res;
            }
        }
        return response()->json($Data, 200);
    }
}
