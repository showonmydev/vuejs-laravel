<?php

namespace App\Http\Controllers\Sync;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use PhpAmqpLib\Connection\AMQPConnection;
use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Exception\AMQPIOException;
use PhpAmqpLib\Exception\RuntimeException;
use PhpAmqpLib\Exception\ErrorException;
use Config;
use DB;
use App\Model\Company;
use App\Model\Member;
use App\Model\MemberSync;
use App\Model\MemberPermission;
use App\Model\DeviceGroup;
use App\Model\CompanySync;
use App\Model\SystemIntegrator;
use App\Model\SystemIntegratorPermission;
use App\Model\SystemIntegratorSync;
use App\Model\Cron;
use App\User;


class RabbitMQService extends Controller
{

    public function listenQueue($queue)
	{
		\Log::info('listQueue on Benq Test:'.$queue);
		$callback = function($message) {
			\Log::info('callback $message:');
			\Log::info($message->body);
			//jsonede event
			$data = json_decode($message->body, true);
      //\Log::info($data);
			\Log::info('-----------------------------------------------------');
			$event = (!isset($data['event']) ? '' : $data['event']);
			//\Log::info($event);
      switch($event){
        case 'createAdministrator':
            \Log::info('Start createAdministrator Operation--------------------');
            \Log::info($data);
              $this->createAdministrator($data);
            \Log::info('success');
            \Log::info('End createAdministrator Operation----------------------');
          break;
        case 'createUser':
            \Log::info('Start createUser Operation--------------------');
            \Log::info($data);
              $this->createUser($data);
            \Log::info('success');
            \Log::info('End createUser Operation----------------------');  
          break;
        case 'createBatchUser':
            //\Log::info('Start createBatchUser Operation--------------------');
            //\Log::info($data);
              $this->createBatchUser($data);
            //\Log::info('success');
            //\Log::info('End createBatchUser Operation----------------------'); 
          break;
        case 'delAccount':
            //\Log::info('Start delAccount Operation--------------------');
            //\Log::info($data);
              $this->delAccount($data);
            //\Log::info('success');
            //\Log::info('End delAccount Operation----------------------'); 
          break;
        case 'editAccount':
            //\Log::info('Start editAccount Operation--------------------');
            //\Log::info($data);
              $this->editAccount($data);
            //\Log::info('success');
            //\Log::info('End editAccount Operation----------------------');
          break;
        case 'editAccountPermission':
            //\Log::info('Start editAccountPermission Operation--------------------');
            //\Log::info($data);
              $this->editAccountPermission($data);
            //\Log::info('success');
            //\Log::info('End editAccountPermission Operation----------------------');
          break;
        case 'delCompany':
            //\Log::info('Start deleteCompany Operation--------------------');
            //\Log::info($data['company']);
              $this->delCompany($data['company']);
            //\Log::info('success');
            //\Log::info('End deleteCompany Operation----------------------'); 
          break;
        case 'addSystemIntegrator':
            \Log::info('Start Add SystemIntegrator member Operation--------------------');
            \Log::info($data);
              $this->addSystemIntegrator($data);
            \Log::info('success');
            \Log::info('End Add SystemIntegrator member Operation----------------------'); 
          break;
        case 'delSystemIntegrator':
            \Log::info('Start delete SystemIntegrator member Operation--------------------');
            \Log::info($data);
              $this->delSystemIntegrator($data);
            \Log::info('success');
            \Log::info('End delete SystemIntegrator member Operation----------------------');
          break;
        default :
            \Log::info('-------------------------------------------------------------------');
            \Log::info('---------------------------Empty-----------------------------------');
            \Log::info('-------------------------------------------------------------------');
      }
      \Log::info('-----------------------------ROUND OFF------------------------------');
        $message->delivery_info['channel']->basic_ack($message->delivery_info['delivery_tag']);
      \Log::info('-----------------------------ROUND OFF------------------------------');
		};
		
		while (true) {
			try {
				/**
				* Create a connection to RabbitAMQP
				*/
				\Log::info('new AMQPConnection');
				$connection = new AMQPConnection(
					Config::get('rabbitmq.host'), //host-host name where the rabbit
					Config::get('rabbitmq.port'), //port- port number of the ser
					Config::get('rabbitmq.username'), // host- username to connection
					Config::get('rabbitmq.password'), //password
					'/', //vhost
					false, //insist
					'AMQPLAIN', //login_method
					null, //login_response
					'en_us', //locale
					10, //connection_timeout
					10, //read_write_timeout
					null, //context
					false, //keepalive
					5//heartbeat
				);
				
				/** @var $channel AMQPChannel */
				$channel = $connection->channel();

				$channel->queue_declare(
					$queue, //queue name - Queue names may be up to 255 bytes of
					false,  //passive - can use this to check whether an exchange
					true,  //durable - make sure that RabbitMQ will never lose our
					false,  // exclusive - used by only one connection and the queue
					false // autodelete - queue is deleted when last consumer unsub
				);

				$channel->basic_consume(
					$queue, //queue name - Queue names may be up to 255 bytes of
					'', //consumer tag - Identifier for the consumer
					false,//no local
					false, // no ack
					false, //exclusive
					false, //no wait
					$callback //callback
				);

				while(count($channel->callbacks)) {
					$channel->wait();
				}

				$channel->close();
				$connection->close();
				\Log::info('close AMQPConnection');
			} catch (AMQPIOException $e) {
				\Log::error('AMQPIOException :' .$e->getMessage());
				\Log::error($e->getTraceAsString());
				//$this->closeConnection($connection);
				//usleep($this->Reconnect());
			} catch (\RuntimeException $e) {
				\Log::error('RuntimeException :'.$e->getMessage());
				//$this->closeConnection($connection);
				//usleep(self::WAIT_BEFORE_RECONNECT_uS);
				//usleep($this->Reconnect());
			} catch(\ErrorException $e){
				\Log::error('ErrorException : '.$e->getMessage());
				// \Log::error($e->getTraceAsStrings());
				//$this->closeConnection($connection);
				//usleep(self::WAIT_BEFORE_RECONNECT_uS);
				//usleep($this->Reconnect());
			}
		}	
	}

	public function Reconnect(){
		$this->listenQueue();
	}

  //[Account Management]
	public function createAdministrator($data = '') {
    $company = $data['company'];
    $member = $data['member'];
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
		if(!Member::where('mct_member_id', $member['id'])->count()){
            $tempMember = [
                     'name'=>$member['name'],
                     'account'=>$member['account'],
                     'email'=>$member['email'],
                     'timezone'=>$member['timezone'],
                     'comment'=>$member['comment'],
                     'enable_flag'=>$member['enable_flag'],
                     'company_id'=>(int)$member['company_id'],
                     'mct_member_id'=>$member['id'],
                     'role'=>$member['role']
                    ];
            if(!User::where('member_id', $member['id'])->count()){
                User::insert(
                   ['name'=>$member['name'],
                    'email'=>$member['email'],
                    'password'=>bcrypt($member['company_id']),
                    'company_id'=>(int)$member['company_id'],
                    'account_name'=>$member['account'],
                    'role'=>($member['role'] == 'Administrator' ? '1' : '2'),
                    'member_id'=>$member['id']]
                );
                // Register Default group
                $GroupData = ['name' => 'All',
                    'company_id' => (int)$member['company_id'],
                    'lft' => '0',
                    'rgt' => '0',
                    'depth' => 1,
                    'created_user' => $member['id'],
                    'updated_user' => $member['id'],
                    'parent_id' => 0,
                    'created_at' => date("Y-m-d H:i:s")];
                $Id = DeviceGroup::insertGetId($GroupData);

                // Register AnotherGroup UnCategory Default group
                $UnCatGroupData = ['name' => 'Uncategorized',
                    'company_id' => (int)$member['company_id'],
                    'lft' => '0',
                    'rgt' => '0',
                    'depth' => 2,
                    'created_user' => $member['id'],
                    'updated_user' => $member['id'],
                    'parent_id' => $Id,
                    'created_at' => date("Y-m-d H:i:s")];
                DeviceGroup::insertGetId($UnCatGroupData);
             if (!Company::where('mct_company_id','=',$company['id'])->count()) {
                  $tempCompany = [
                     'id'=>$company['id'],
                     'name'=>$company['name'],
                     'nation_region_id'=>$company['nation_region_id'],
                     'enable_flag'=>$company['enable_flag'],
                     'mct_company_id'=>$company['id']
                    ];   
                   $compant_id =  Company::insertGetId($tempCompany);
                   // $tempStatus = [
                   //   'company_id'=>$compant_id,
                   //   'total_space'=>'',
                   //   'used_space'=>''
                   //  ];
                   //  CompanyStatus::insertGetId($tempStatus); 
                    $tempSync = [
                     'mct_company_id'=>$company['id'],
                     'mct_company_change_id'=>$company['company_change_id'],
                     'mct_company_info_updated_at'=>date("Y-m-d H:i:s",(int)$company['company_info_updated_at'])]; 
                   
                    CompanySync::insertGetId($tempSync);
             } else{
               if (CompanySync::where('mct_company_id','=',$company['id'])->where('mct_company_change_id','!=',$company['company_change_id'])->count()){
                    $tempCompany = [
                     'name'=>$company['name'],
                     'nation_region_id'=>$company['nation_region_id'],
                     'enable_flag'=>$company['enable_flag'],
                    ];
                    Company::where('mct_company_id','=',$company['id'])->update($temp);
              } 
             }
            } else {
                User::where('email',$member['email'])->where('company_id',$member['company_id'])->update(
                       ['name'=>$member['name'],
                        'email'=>$member['email'],
                        'password'=>bcrypt($member['company_id']),
                        'company_id'=>(int)$member['company_id'],
                        'account_name'=>$member['account'],
                        'role'=>($member['role'] == 'Administrator' ? '1' : '2'),
                        'member_id'=>$member['id']]
                    );
            }
            $permissionArr = [];
            $MemberSync = ['mct_member_id'=>$member['id'],
                           'mct_member_change_id'=>$member['member_change_id'],
                           'mct_member_info_updated_at'=>date("Y-m-d H:i:s",(int)$member['member_info_updated_at']),
                           'mct_permission_updated_at'=>date("Y-m-d H:i:s",(int)$member['permission']['permission_updated_at'])];
            $MemberID = Member::insertGetId($tempMember);
            MemberSync::insert($MemberSync);
            foreach ($member['permission']['name'] as $key1 => $value1) {
                array_push($permissionArr,['permission_name'=>$value1,'member_id'=>$MemberID]);
            }
            if($MemberID){
                MemberPermission::insert($permissionArr);
            }
        DB::statement('SET FOREIGN_KEY_CHECKS=1;'); 
        } else {
        	$this->editAccount($data);
        }
	}

	public function createUser($data = '') {
		$member = $data['member'];
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
		if(!Member::where('mct_member_id', $member['id'])->count()){
      \Log::info('here');
            $temp = [
                     'name'=>$member['name'],
                     'account'=>$member['account'],
                     'email'=>$member['email'],
                     'timezone'=>$member['timezone'],
                     'comment'=>$member['comment'],
                     'enable_flag'=>$member['enable_flag'],
                     'company_id'=>(int)$member['company_id'],
                     'mct_member_id'=>$member['id']
                    ];
            if(!User::where('member_id', $member['id'])->count()){
                User::insert(
                   ['name'=>$member['name'],
                    'email'=>$member['email'],
                    'password'=>bcrypt($member['company_id']),
                    'company_id'=>(int)$member['company_id'],
                    'account_name'=>$member['account'],
                    'role'=>($member['role'] == 'Administrator' ? '1' : '2'),
                    'member_id'=>$member['id']]
                );
                // Register Default group
                $GroupData = ['name' => 'All',
                    'company_id' => (int)$member['company_id'],
                    'lft' => '0',
                    'rgt' => '0',
                    'depth' => 1,
                    'created_user' => $member['id'],
                    'updated_user' => $member['id'],
                    'parent_id' => 0,
                    'created_at' => date("Y-m-d H:i:s")];
                $Id = DeviceGroup::insertGetId($GroupData);

                // Register AnotherGroup UnCategory Default group
                $UnCatGroupData = ['name' => 'Uncategorized',
                    'company_id' => (int)$member['company_id'],
                    'lft' => '0',
                    'rgt' => '0',
                    'depth' => 2,
                    'created_user' => $member['id'],
                    'updated_user' => $member['id'],
                    'parent_id' => $Id,
                    'created_at' => date("Y-m-d H:i:s")];
                DeviceGroup::insertGetId($UnCatGroupData);
            } else {
                User::where('email',$member['email'])->where('company_id',$member['company_id'])->update(
                       ['name'=>$member['name'],
                        'email'=>$member['email'],
                        'password'=>bcrypt($member['company_id']),
                        'company_id'=>(int)$member['company_id'],
                        'account_name'=>$member['account'],
                        'role'=>($member['role'] == 'Administrator' ? '1' : '2'),
                        'member_id'=>$member['id']]
                    );
            }
            $permissionArr = [];
            $MemberSync = ['mct_member_id'=>$member['id'],
                           'mct_member_change_id'=>$member['member_change_id'],
                           'mct_member_info_updated_at'=>date("Y-m-d H:i:s",(int)$member['member_info_updated_at']),
                           'mct_permission_updated_at'=>date("Y-m-d H:i:s",(int)$member['permission']['permission_updated_at'])];
            $MemberID = Member::insertGetId($temp);
            MemberSync::insert($MemberSync);
            foreach ($member['permission']['name'] as $key1 => $value1) {
                array_push($permissionArr,['permission_name'=>$value1,'member_id'=>$MemberID]);
            }
            if($MemberID){
                MemberPermission::insert($permissionArr);
            }
    } else {
          if (MemberSync::where('mct_member_id','=',$member['id'])->where('mct_member_change_id','!=',$member['member_change_id'])->count()) {
                  $this->editAccount($data);
              }
    }
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');    
	}

  public function createBatchUser($data = '') {
    $member = $data['member'];
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    foreach ($member as $data) {
      if(!Member::where('mct_member_id', $data['id'])->count()){
            $temp = [
                     'name'=>$data['name'],
                     'account'=>$data['account'],
                     'email'=>$data['email'],
                     'timezone'=>$data['timezone'],
                     'comment'=>$data['comment'],
                     'enable_flag'=>$data['enable_flag'],
                     'company_id'=>(int)$data['company_id'],
                     'mct_member_id'=>$data['id']
                    ];
            if(!User::where('member_id', $data['id'])->count()){
                User::insert(
                   ['name'=>$data['name'],
                    'email'=>$data['email'],
                    'password'=>bcrypt($data['company_id']),
                    'company_id'=>(int)$data['company_id'],
                    'account_name'=>$data['account'],
                    'role'=>($data['role'] == 'Administrator' ? '1' : '2'),
                    'member_id'=>$data['id']]
                );
                // Register Default group
                $GroupData = ['name' => 'All',
                    'company_id' => (int)$data['company_id'],
                    'lft' => '0',
                    'rgt' => '0',
                    'depth' => 1,
                    'created_user' => $data['id'],
                    'updated_user' => $data['id'],
                    'parent_id' => 0,
                    'created_at' => date("Y-m-d H:i:s")];
                $Id = DeviceGroup::insertGetId($GroupData);

                // Register AnotherGroup UnCategory Default group
                $UnCatGroupData = ['name' => 'Uncategorized',
                    'company_id' => (int)$data['company_id'],
                    'lft' => '0',
                    'rgt' => '0',
                    'depth' => 2,
                    'created_user' => $data['id'],
                    'updated_user' => $data['id'],
                    'parent_id' => $Id,
                    'created_at' => date("Y-m-d H:i:s")];
                DeviceGroup::insertGetId($UnCatGroupData);
            } else {
                User::where('email',$data['email'])->where('company_id',$data['company_id'])->update(
                       ['name'=>$data['name'],
                        'email'=>$data['email'],
                        'password'=>bcrypt($data['company_id']),
                        'company_id'=>(int)$data['company_id'],
                        'account_name'=>$data['account'],
                        'role'=>($data['role'] == 'Administrator' ? '1' : '2'),
                        'member_id'=>$data['id']]
                    );
            }
            $permissionArr = [];
            $MemberSync = ['mct_member_id'=>$data['id'],
                           'mct_member_change_id'=>$data['member_change_id'],
                           'mct_member_info_updated_at'=>date("Y-m-d H:i:s",(int)$data['member_info_updated_at']),
                           'mct_permission_updated_at'=>date("Y-m-d H:i:s",(int)$data['permission']['permission_updated_at'])];
            $MemberID = Member::insertGetId($temp);
            MemberSync::insert($MemberSync);
            foreach ($data['permission']['name'] as $key1 => $value1) {
                array_push($permissionArr,['permission_name'=>$value1,'member_id'=>$MemberID]);
            }
            if($MemberID){
                MemberPermission::insert($permissionArr);
            }
        } else {
          $this->editAccount($data);
        }
    }
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
  }

	public function editAccount($data = '') {
	  $member = $data['member'];
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
		if(Member::where('mct_member_id', $member['id'])->count()){
            $temp = [
                     'name'=>$member['name'],
                     'account'=>$member['account'],
                     'email'=>$member['email'],
                     'timezone'=>$member['timezone'],
                     'comment'=>$member['comment'],
                     'enable_flag'=>$member['enable_flag'],
                     'company_id'=>(int)$member['company_id'],
                     'mct_member_id'=>$member['id']
                    ];
            if(!User::where('member_id', $member['id'])->count()){
                User::insert(
                   ['name'=>$member['name'],
                    'email'=>$member['email'],
                    'password'=>bcrypt($member['company_id']),
                    'company_id'=>(int)$member['company_id'],
                    'account_name'=>$member['account'],
                    'role'=>($member['role'] == 'Administrator' ? '1' : '2'),
                    'member_id'=>$member['id']]
                );
                // Register Default group
                $GroupData = ['name' => 'All',
                    'company_id' => (int)$member['company_id'],
                    'lft' => '0',
                    'rgt' => '0',
                    'depth' => 1,
                    'created_user' => $member['id'],
                    'updated_user' => $member['id'],
                    'parent_id' => 0,
                    'created_at' => date("Y-m-d H:i:s")];
                $Id = DeviceGroup::insertGetId($GroupData);

                // Register AnotherGroup UnCategory Default group
                $UnCatGroupData = ['name' => 'Uncategorized',
                    'company_id' => (int)$member['company_id'],
                    'lft' => '0',
                    'rgt' => '0',
                    'depth' => 2,
                    'created_user' => $member['id'],
                    'updated_user' => $member['id'],
                    'parent_id' => $Id,
                    'created_at' => date("Y-m-d H:i:s")];
                DeviceGroup::insertGetId($UnCatGroupData);
            } else {
                User::where('email',$member['email'])->where('company_id',$member['company_id'])->update(
                       ['name'=>$member['name'],
                        'email'=>$member['email'],
                        'password'=>bcrypt($member['company_id']),
                        'company_id'=>(int)$member['company_id'],
                        'account_name'=>$member['account'],
                        'role'=>($member['role'] == 'Administrator' ? '1' : '2'),
                        'member_id'=>$member['id']]
                    );
            }
            $permissionArr = [];
            $MemberSync = ['mct_member_id'=>$member['id'],
                           'mct_member_change_id'=>$member['member_change_id'],
                           'mct_member_info_updated_at'=>date("Y-m-d H:i:s",(int)$member['member_info_updated_at']),
                           'mct_permission_updated_at'=>date("Y-m-d H:i:s",(int)$member['permission']['permission_updated_at'])];
            Member::where('mct_member_id', $member['id'])->update($temp);
            $Member_ID = Member::select('id')->where('mct_member_id', $member['id'])->limit('1')->get()->toArray();
            // dd($Member_ID);
            MemberSync::where('mct_member_id', $member['id'])->update($MemberSync);
            //First we need to delete old permission
            MemberPermission::where('member_id', $Member_ID[0]['id'])->delete();
            foreach ($member['permission']['name'] as $key1 => $value1) {
                array_push($permissionArr,['permission_name'=>$value1,'member_id'=>$Member_ID[0]['id']]);
            }
            if($member['id']){
                MemberPermission::insert($permissionArr);
            }
        }
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');    
	}

  public function delAccount($data = ''){
    $member = $data['member'];
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    if(Member::where('mct_member_id', $member['id'])->count()){
        Member::where('mct_member_id',$member['id'])->update(['enable_flag'=>'N','updated_at'=>date("Y-m-d H:i:s",(int)$member['deleted_at']),'deleted_at'=>date("Y-m-d H:i:s",(int)$member['deleted_at'])]);
        $MemberSync = ['mct_member_id'=>$member['id'],
                           'mct_member_change_id'=>$member['member_change_id'],
                           'mct_member_info_updated_at'=>date("Y-m-d H:i:s",(int)$member['deleted_at']),
                           'mct_permission_updated_at'=>date("Y-m-d H:i:s",(int)$member['deleted_at'])];
        MemberSync::where('mct_member_id', $member['id'])->update($MemberSync);
    }
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
  }

  //[Role Management]
  
  public function editAccountPermission($data = ''){
    $member = $data['member'];
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    foreach ($member as $data) {
          $permissionArr = [];
          $Member_ID = Member::select('id')->where('mct_member_id', $data['id'])->limit('1')->get()->toArray();
          //First we need to delete old permission
          MemberPermission::where('member_id', $Member_ID[0]['id'])->delete();
            foreach ($data['permission']['name'] as $key1 => $value1) {
                array_push($permissionArr,['permission_name'=>$value1,'member_id'=>$Member_ID[0]['id']]);
            }
            if($data['id']){
                MemberPermission::insert($permissionArr);
            }
          $MemberSync = ['mct_member_id'=>$data['id'],
                           'mct_member_change_id'=>$data['member_change_id'],
                           'mct_permission_updated_at'=>date("Y-m-d H:i:s",(int)$data['permission']['permission_updated_at'])];  
          MemberSync::where('mct_member_id', $data['id'])->update($MemberSync);  
    }
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');  
  }

	public function delCompany($data = '') {
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
		if($data==''){
			$data = [
			  "event"=> "delCompany",
			  "company"=> [
			    "id"=> "6162",
			    "deleted_at"=> "1526968347",
			    "company_change_id"=> "1526968347"
			  ]
			];
			$data = $data['company'];
		}
		Company::where('mct_company_id',$data['id'])->update(['enable_flag'=>'N','updated_at'=>date("Y-m-d H:i:s",(int)$data['deleted_at'])]);
		$Member_ID = Company::select('id')->where('mct_company_id', $data['id'])->limit('1')->get()->toArray();
		$sync1 = ['mct_company_id'=>$Member_ID[0]['id'],
	             'mct_company_change_id'=>$data['company_change_id'],
	             'mct_company_info_updated_at'=>date("Y-m-d h:i:s")];
        CompanySync::insert($sync1);
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');    
	}

	//[SI setting]

  public function addSystemIntegrator($data = '') {
    $member = $data['member'];
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    if(Member::where('mct_member_id', $member['id'])->count()){
       if(Company::where('mct_company_id', $member['manage_company']['company_id'])->count()){
          $systemIntegrator = [];
          $systemIntegrator = ['member_id' => (int)$member['id'],
                    'company_id' => (int)$member['manage_company']['company_id'],
                    'enable_flag' => $member['manage_company']['enable_flag'],
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s")                    
                  ];            
      $countID = SystemIntegrator::where('member_id', '=',(int)$member['id'])->where('company_id','=',(int)$member['manage_company']['company_id'])->count();
      \Log::info('count = '.$countID);
      if($countID == 0) {
            $SystemIntegratorID = SystemIntegrator::insertGetId($systemIntegrator);         
            $permissionArr = [];
            $SystemIntegratorSync = [];
            foreach ($member['manage_company']['permission_name'] as $key2 => $value2) {
                  array_push($permissionArr,['permission_name'=>$value2,'system_integrator_id'=>$SystemIntegratorID]);
              }
            SystemIntegratorPermission::insert($permissionArr);
            $SystemIntegratorSync = [
              'system_integrator_id' => $SystemIntegratorID,
              'mct_info_updated_at' => date("Y-m-d H:i:s",(int)$member['manage_company']['info_updated_at']),
              'mct_permission_updated_at' => date("Y-m-d H:i:s",(int)$member['manage_company']['permission_updated_at'])
            ];
            SystemIntegratorSync::insert($SystemIntegratorSync);
          }
       }
    }
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
  }

  public function delSystemIntegrator($data = '') {
		$member = $data['member'];
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    if(Member::where('mct_member_id', $member['id'])->count()){
       if(Company::where('mct_company_id', $member['manage_company']['company_id'])->count()){
        $SystemIntegratorID = SystemIntegrator::select('id')->where('member_id','=',$member['id'])->where('company_id','=',$member['manage_company']['company_id'])->limit('1')->get()->toArray();
        $MemberSync = ['mct_member_id'=>$member['id'],
                       'mct_member_change_id'=>$member['member_change_id'],
                       'mct_permission_updated_at'=>date("Y-m-d H:i:s",(int)$member['manage_company']['deleted_at'])];  
        MemberSync::where('mct_member_id', $member['id'])->update($MemberSync);
        \Log::info('ID :'.$SystemIntegratorID[0]['id']);
        if($SystemIntegratorID[0]['id']){
          SystemIntegrator::where('id', $SystemIntegratorID[0]['id'])->update(['enable_flag'=>'N','deleted_at'=>date("Y-m-d H:i:s")]);
          SystemIntegratorPermission::where('system_integrator_id',$SystemIntegratorID[0]['id'])->delete();
          SystemIntegratorSync::where('system_integrator_id', $SystemIntegratorID[0]['id'])->delete();
          }
       }
     }
     DB::statement('SET FOREIGN_KEY_CHECKS=1;');
	}



}
