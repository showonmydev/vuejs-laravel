<?php

namespace App\Http\Controllers\Sync;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Config;
use ResponseJson;
use App\Model\Company;
use App\Model\Member;
use App\Model\MemberSync;
use App\Model\MemberPermission;
use App\Model\DeviceGroup;
use App\Model\CompanySync;
use App\Model\Cron;
use App\User;

class SyncViaAPIController extends Controller
{
	public $Helper;
	public function __construct() {
		$this->Helper = new ResponseJson();
	}

    public function index() {
        $row = Cron::orderBy('id','DESC')->limit('1')->get()->toArray();

        if(isset($row) && isset($row[0]) && $row[0]['task'] == 'wait'){
            return true;
        }
        // Initial Call
        if(empty($row)){
            $obj = new Cron();
            $obj->task = 'sync_company';
            $obj->page = '1';
            $obj->status = '1';
            $obj->save();
            $res = $this->CompanyList('1',$obj->id);
        }

        if(isset($row) && isset($row[0]) && $row[0]['task'] == 'sync_company'){
            $row = $row[0];
            if($row['status'] == 3){
                Cron::where('id', $row['id'])->update(['task'=>'sync_company','status'=>1]);
                $res = $this->CompanyList($row['page'], $row['id']);
            } else {
                 $res = $this->CompanyList($row['page'], $row['id']);
            }
        }

        if(isset($row) && isset($row[0]) && $row[0]['task'] == 'sync_member'){
            $row = $row[0];
            if($row['status'] == 3){
                Cron::where('id', $row['id'])->update(['task'=>'sync_member','status'=>1]);
                $res = $this->MemberList($row['parameter_key'], $row['id'], $row['page']);
            } else {
                $res = $this->MemberList($row['parameter_key'], $row['id'], $row['page']);
            }
        }
    }

    // Using in our Sync
    public function CompanyList($id = 1, $cronID) {
    	$i = $id;
    	$Data = [];
    	$arr = [];
        $arrSync1 = [];
    	$data = ["service"=>"dms","page"=>$i];
    	$res = $this->Helper->SendRequestToBenq('post',$data,'company/list');
    	if(!empty($res['data'])){
    		$compData = json_decode($res['data'])->company;
    		foreach ($compData as $key => $value) {
    			if(isset($value->name)){
	    			$temp = ['name'=>$value->name, 'nation_region_id'=>$value->nation_region_id, 'enable_flag'=>$value->enable_flag, 'mct_company_id'=>$value->id, 'updated_at'=>date("Y-m-d h:i:s"), 'created_at'=>date("Y-m-d h:i:s")];

                    $sync1 = ['mct_company_id'=>$value->id,
                             'mct_company_change_id'=>$value->company_change_id,
                             'mct_company_info_updated_at'=>date("Y-m-d h:i:s")];
                    array_push($arrSync1, $sync1);
	    			array_push($arr, $temp);
    			}
    		}
    	}
    	if(isset(json_decode($res['data'])->next_page)){
    		$i=json_decode($res['data'])->next_page;
    	}else{
    		$i = null;
    	}
    	try {
	    	if(!empty($arr)){
                $res = Company::insert($arr);
                CompanySync::insert($arrSync1);
                if($res){
                    if($i){
                        Cron::where('id', $cronID)->update(['status'=>2,'remark'=>'Task Complete']);
                        Cron::insert(['task'=>'sync_company','parameter_key'=>'','page'=>$i,'status'=>3]);
                    } else {
                        Cron::where('id', $cronID)->update(['status'=>2,'remark'=>'Task Complete']);
                        Cron::insert(['task'=>'sync_member','parameter_key'=>'0','page'=>'1','status'=>3]);
                    }
                }
			}
    		if($res){
    			$Data['success'] = 'Insert Successfully';
    		}
		}catch (\Illuminate\Database\QueryException $ex) {
            \Log::error($ex->getMessage());
	        $Data['error'] = $ex->getMessage();
            \DB::statement("SET foreign_key_checks=0");
            Company::truncate();
            // \DB::statement("SET foreign_key_checks=1");
            \DB::statement("SET foreign_key_checks=0");
            CompanySync::truncate();
            // \DB::statement("SET foreign_key_checks=1");
            Cron::where('id', $cronID)->delete();
	    }
        $Data['page'] = $i;
	    return $Data;
    }

    public function getChangeId(Request $request) {
    	$i = 1;
    	$res = null;
    	do{
	    	$data = ["service"=>"dms","page"=>$i];
	    	$res = $this->Helper->SendRequestToBenq('post',$data,'company/getChangeId');
	    	if(!empty($res['data'])){
	    		$compData = json_decode($res['data'])->company;
	    		foreach ($compData as $key => $value) {
	    			echo '<pre>';
	    			print_r($value);
	    			echo '</pre>';
	    		}
	    		echo '<br/>';
	    		echo '<br/>';
	    	}
	    	if(isset(json_decode($res['data'])->next_page)){
	    		$i=json_decode($res['data'])->next_page;
	    	}else{
	    		$i = null;
	    	}
    	} while ($i);
    }

    public function getMany(Request $request) {
    	$i = 1;
    	$res = null;
    	$data = ["service"=>"dms","mct_company_id"=>["1","2"]];
    	$res = $this->Helper->SendRequestToBenq('post',$data,'company/getMany');
    	if(!empty($res['data']) && $res['status']==200){
    		$compData = json_decode($res['data'])->company;
    		foreach ($compData as $key => $value) {
    			echo '<pre>';
    			print_r($value);
    			echo '</pre>';
    		}
    		echo '<br/>';
    		echo '<br/>';
    	} else {
    		print_r($res);
    	}
    }

    public function getOne(Request $request) {
    	$i = 1;
    	$res = null;
    	$data = ["service"=>"dms","mct_company_id"=>"1","mct_company_change_id"=>""];
    	$res = $this->Helper->SendRequestToBenq('post',$data,'company/getOne');
    	if(!empty($res['data']) && $res['status']==200){
    		$compData = json_decode($res['data'])->company;
    		foreach ($compData as $key => $value) {
    			echo '<pre>';
    			print_r($value);
    			echo '</pre>';
    		}
    		echo '<br/>';
    		echo '<br/>';
    	} else {
    		print_r($res);
    	}
    }

    public function listWithAdmin(Request $request) {
    	$i = 1;
    	$res = null;
    	do{
	    	$data = ["service"=>"dms","role"=>"SuperAdmin","page"=>$i];
	    	$res = $this->Helper->SendRequestToBenq('post',$data,'company/listWithAdmin');
	    	dd($res);
	    	if(!empty($res['data'])){
	    		$compData = json_decode($res['data'])->company;
	    		foreach ($compData as $key => $value) {
	    			echo '<pre>';
	    			print_r($value);
	    			echo '</pre>';
	    		}
	    		echo '<br/>';
	    		echo '<br/>';
	    	}
	    	if(isset(json_decode($res['data'])->next_page)){
	    		$i=json_decode($res['data'])->next_page;
	    	}else{
	    		$i = null;
	    	}
    	} while ($i);
    }

    public function searchWithAdmin(Request $request) {
    	$data = ["service"=>"dms","role"=>"SuperAdmin","keyword"=>'elle'];
	    $res = $this->Helper->SendRequestToBenq('post',$data,'company/searchWithAdmin');
	    if(!empty($res['data']) && $res['status']==200){
    		$compData = json_decode($res['data'])->company;
    		foreach ($compData as $key => $value) {
    			echo '<pre>';
    			print_r($value);
    			echo '</pre>';
    		}
    		echo '<br/>';
    		echo '<br/>';
	    } else {
	    	print_r($res);
	    }
    }

    /*Here is started for Member*/
    // Using in our Sync
    public function MemberList($request = 0, $cronID, $page = 1) {
        $CompID = Company::all('mct_company_id')->toArray();
        if(!isset($CompID[$request])){
            Cron::where('id', $cronID)->update(['status'=>2,'remark'=>'Task Complete']);
            Cron::insert(['task'=>'wait','status'=>3]);
        }
        $company_id = $CompID[$request]['mct_company_id'];
    	$res = null;
        //foreach ($CompID as $key => $value) {
            $i = 1;
            //do{
                $data = ["service"=>"dms","mct_company_id"=>$company_id,"page"=>$page];
                $res = $this->Helper->SendRequestToBenq('post',$data,'member/list');
                echo '<pre>';
                print_r($res);
                if(!empty($res['data']) && $res['status']==200){
                    $compData = json_decode($res['data'])->member;
                    foreach ($compData as $key => $value) {
                        if(!Member::where('mct_member_id', $value->id)->count()){
                            $temp = [
                                     'name'=>$value->name,
                                     'account'=>$value->account,
                                     'email'=>$value->email,
                                     'timezone'=>$value->timezone,
                                     'comment'=>$value->comment,
                                     'enable_flag'=>$value->enable_flag,
                                     'company_id'=>(int)$value->company_id,
                                     'mct_member_id'=>$value->id
                                    ];
                            if(!User::where('member_id', $value->id)->count()){
                                User::insert(
                                   ['name'=>$value->name,
                                    'email'=>$value->email,
                                    'password'=>bcrypt($value->company_id),
                                    'company_id'=>(int)$value->company_id,
                                    'account_name'=>$value->account,
                                    'role'=>($value->role == 'Administrator' ? '1' : '2'),
                                    'member_id'=>$value->id]
                                );
                                // Register Default group
                                $GroupData = ['name' => 'All',
                                    'company_id' => (int)$value->company_id,
                                    'lft' => '0',
                                    'rgt' => '0',
                                    'depth' => 1,
                                    'created_user' => $value->id,
                                    'updated_user' => $value->id,
                                    'parent_id' => 0,
                                    'created_at' => date("Y-m-d H:i:s")];
                                $Id = DeviceGroup::insertGetId($GroupData);

                                // Register AnotherGroup UnCategory Default group
                                $UnCatGroupData = ['name' => 'Uncategorized',
                                    'company_id' => (int)$value->company_id,
                                    'lft' => '0',
                                    'rgt' => '0',
                                    'depth' => 2,
                                    'created_user' => $value->id,
                                    'updated_user' => $value->id,
                                    'parent_id' => $Id,
                                    'created_at' => date("Y-m-d H:i:s")];
                                DeviceGroup::insertGetId($UnCatGroupData);
                            } else {
                                User::where('email',$value->email)->where('company_id',$value->company_id)->update(
                                       ['name'=>$value->name,
                                        'email'=>$value->email,
                                        'password'=>bcrypt($value->company_id),
                                        'company_id'=>(int)$value->company_id,
                                        'account_name'=>$value->account,
                                        'role'=>($value->role == 'Administrator' ? '1' : '2'),
                                        'member_id'=>$value->id]
                                    );
                            }
                            $permissionArr = [];
                            $MemberSync = ['mct_member_id'=>$value->id,
                                           'mct_member_change_id'=>$value->member_change_id,
                                           'mct_member_info_updated_at'=>date("Y-m-d H:i:s",(int)$value->member_info_updated_at),
                                           'mct_permission_updated_at'=>date("Y-m-d H:i:s",(int)$value->permission->permission_updated_at)];
                            print_r($MemberSync);
                            $MemberID = Member::insertGetId($temp);
                            MemberSync::insert($MemberSync);
                            foreach ($value->permission->name as $key1 => $value1) {
                                array_push($permissionArr,['permission_name'=>$value1,'member_id'=>$MemberID]);
                            }
                            if($MemberID){
                                MemberPermission::insert($permissionArr);
                            }
                        }
                    }
                }
                if(isset(json_decode($res['data'])->next_page)){
                    $i=json_decode($res['data'])->next_page;
                }else{
                    $i = null;
                }

                if($i){
                    Cron::where('id', $cronID)->update(['status'=>2,'parameter_key'=>$request,'remark'=>'Task Complete']);
                    Cron::insert(['task'=>'sync_company','parameter_key'=>$request,'page'=>$i,'status'=>3]);
                } else {
                    Cron::where('id', $cronID)->update(['status'=>2,'remark'=>'Task Complete']);
                    Cron::insert(['task'=>'sync_member','parameter_key'=>$request+1,'page'=>1,'status'=>3]);
                }

            //} while ($i);
        //}
    }

    public function MemberGetChangeId(Request $request) {
    	$data = ["service"=>"dms"];
	    $res = $this->Helper->SendRequestToBenq('post',$data,'member/getChangeId');
	    if(!empty($res['data']) && $res['status']==200){
    		$compData = json_decode($res['data'])->member;
    		foreach ($compData as $key => $value) {
    			echo '<pre>';
    			print_r($value);
    			echo '</pre>';
    		}
    		echo '<br/>';
    		echo '<br/>';
	    } else {
	    	print_r($res);
	    }
    }

    public function MemberGetAdmin(Request $request) {
    	$data = ["service"=>"dms","mct_company_id"=>["6148"]];
	    $res = $this->Helper->SendRequestToBenq('post',$data,'member/getAdmin');
	    if(!empty($res['data']) && $res['status']==200){
    		$compData = json_decode($res['data'])->member;
    		foreach ($compData as $key => $value) {
    			echo '<pre>';
    			print_r($value);
    			echo '</pre>';
    		}
    		echo '<br/>';
    		echo '<br/>';
	    }else{
	    	print_r($res);
	    }
    }


    public function MemberGetMany(Request $request) {
    	$data = ["service"=>"dms","mct_member_id"=>["1","2"]];
	    $res = $this->Helper->SendRequestToBenq('post',$data,'member/getMany');
	    if(!empty($res['data']) && $res['status']==200){
    		$compData = json_decode($res['data'])->member;
    		foreach ($compData as $key => $value) {
    			echo '<pre>';
    			print_r($value);
    			echo '</pre>';
    		}
    		echo '<br/>';
    		echo '<br/>';
	    }else{
	    	print_r($res);
	    }
    }

    public function MemberGetOne(Request $request) {
    	$data = ["service"=>"dms","mct_member_id"=>"1231"];
	    $res = $this->Helper->SendRequestToBenq('post',$data,'member/getOne');
	    if(!empty($res['data']) && $res['status']==200){
    		$compData = json_decode($res['data'])->member;
    		foreach ($compData as $key => $value) {
    			echo '<pre>';
    			print_r($value);
    			echo '</pre>';
    		}
    		echo '<br/>';
    		echo '<br/>';
	    }else{
	    	print_r($res);
	    }
    }

    public function MemberAgreeFlagChange(Request $request) {
    	$data = [];
	    $res = $this->Helper->SendRequestToBenq('post',$data,'member/agreeFlag/change');
	    dd($res);
	    if(!empty($res['data']) && $res['status']==200){
    			echo '<pre>';
    			print_r($res['data']);
    			echo '</pre>';
	    }else{
	    	print_r($res);
	    }
    }

    public function SICompanyList(Request $request) {
    	$data = ["service"=>"dms","mct_member_id"=>"1","mct_si_change_id"=>""];
	    $res = $this->Helper->SendRequestToBenq('post',$data,'si/company/list');
	    dd($res);
	    if(!empty($res['data']) && $res['status']==200){
    			echo '<pre>';
    			print_r($res['data']);
    			echo '</pre>';
	    }else{
	    	print_r($res);
	    }
    }

    public function SIPermissionGet(Request $request) {
    	$data = ["service"=>"dms","mct_member_id"=>"1","mct_company_id"=>"1","mct_permission_updated_at"=>"6/5/2018"];
	    $res = $this->Helper->SendRequestToBenq('post',$data,'si/permission/get');
	    dd($res);
	    if(!empty($res['data']) && $res['status']==200){
    			echo '<pre>';
    			print_r($res['data']);
    			echo '</pre>';
	    }else{
	    	print_r($res);
	    }
    }
    
}
