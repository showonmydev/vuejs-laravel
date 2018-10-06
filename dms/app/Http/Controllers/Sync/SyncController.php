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

class SyncController extends Controller
{

    public function SyncInit($queue)
	{
		\Log::info('listQueue:'.$queue);
		$callback = function($message) {
			\Log::info('callback $message:');
			\Log::info($message->body);
			//jsonede event
			$data = json_decode($message->body, true);
			\Log::info('-----------------------------------------------------');
			$event = (!isset($data['event']) ? '' : $data['event']);
			\Log::info($event);
			if(isset($event) && $event == 'createAdministrator') {
				\Log::info('Start createAdministrator Operation--------------------');
				\Log::info($data);
					$this->createAdministrator($data);
				\Log::info('success');
				\Log::info('End createAdministrator Operation----------------------');

			} elseif (isset($event) && $event == 'createUser') {
				\Log::info('Start createUser Operation--------------------');
				\Log::info($data['member']);
					$this->createUser($data['member']);
				\Log::info('success');
				\Log::info('End createUser Operation----------------------');

			} elseif (isset($event) && $event == 'createBatchUser') {
        \Log::info('Start createBatchUser Operation--------------------');
        \Log::info($data['member']);
          $this->createBatchUser($data['member']);
        \Log::info('success');
        \Log::info('End createBatchUser Operation----------------------');

      } elseif (isset($event) && $event == 'delAccount') {
        \Log::info('Start delAccount Operation--------------------');
        \Log::info($data['member']);
          $this->delAccount($data['member']);
        \Log::info('success');
        \Log::info('End delAccount Operation----------------------');

      } elseif (isset($event) && $event == 'editAccount') {
				\Log::info('Start editAccount Operation--------------------');
				\Log::info($data['member']);
					$this->editAccount($data['member']);
				\Log::info('success');
				\Log::info('End editAccount Operation----------------------');

			} elseif (isset($event) && $event == 'editAccountPermission') {
        \Log::info('Start editAccountPermission Operation--------------------');
        \Log::info($data['member']);
          $this->editAccountPermission($data['member']);
        \Log::info('success');
        \Log::info('End editAccountPermission Operation----------------------');

      } elseif (isset($event) && $event == 'delCompany') {
				\Log::info('Start deleteCompany Operation--------------------');
				\Log::info($data['company']);
					$this->delCompany($data['company']);
				\Log::info('success');
				\Log::info('End deleteCompany Operation----------------------');

			} elseif (isset($event) && $event == 'addSystemIntegrator') {
        \Log::info('Start Add SystemIntegrator member Operation--------------------');
        \Log::info($data['member']);
          $this->addSystemIntegrator($data['member']);
        \Log::info('success');
        \Log::info('End Add SystemIntegrator member Operation----------------------');
      } elseif (isset($event) && $event == 'delSystemIntegrator') {
				\Log::info('Start delete SystemIntegrator member Operation--------------------');
				\Log::info($data['member']);
					$this->delSystemIntegrator($data['member']);
				\Log::info('success');
				\Log::info('End delete SystemIntegrator member Operation----------------------');
			} else {
				\Log::info('-------------------------------------------------------------------');
				\Log::info('---------------------------Empty-----------------------------------');
				\Log::info('-------------------------------------------------------------------');
			}
			// return true;
			\Log::info('-----------------------------ROUND OFF--------------------------------------');
				$message->delivery_info['channel']->basic_ack($message->delivery_info['delivery_tag']);
			\Log::info('-----------------------------ROUND OFFF------------------------------'); 
		};
		
		
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

	public function Reconnect(){
		$this->SyncInit();
	}

  //[Account Management]
	public function createAdministrator($data = '') {
		if($data == ''){
			$data = [
			  "event"=> "createAdministrator",
        "company"=>[
        "id"=>"3",
        "company_change_id"=>"1502948767",
        "name"=>"Qisda",
        "nation_region_id"=>"218",
        "enable_flag"=>"Y",
        "company_info_updated_at"=>"1502948767"
        ],
			  "member"=> [
			    "id"=> "1217",
			    "company_id"=> "6139",
			    "name"=> "tyreke",
			    "account"=> "tyrekeadmin",
			    "email"=> "5uc2akbi56w0000000000@yopmail.com",
			    "timezone"=> "Asia/Shanghai",
			    "comment"=> null,
			    "role"=> "Administrator",
			    "enable_flag"=> "Y",
			    "member_info_updated_at"=> "1523344283",
			    "member_change_id"=> "1523344283",
			    "permission"=> [
			      "name"=> [
			        "view_devcie_list",
			        "add_device",
			        "add_group",
			        "edit_device",
			        "edit_group",
			        "delete_device",
			        "delete_group",
			        "view_status_and_log",
			        "device_control",
			        "install_app",
			        "uninsatll_app",
			        "image_update",
			        "view_app_list",
			        "add_app",
			        "edit_app",
			        "delete_app",
			        "update_app",
			        "view_account_management"
			      ],
			      "permission_updated_at"=> "1523344283"
			    ]
			 ]];
		$company = $data['company'];
    $data = $data['member'];
    }else{
    $company = $data['company'];  
    $data = $data['member'];
    }
		if(!Member::where('mct_member_id', $data['id'])->count()){
            $temp = [
                     'name'=>$data['name'],
                     'account'=>$data['account'],
                     'email'=>$data['email'],
                     'timezone'=>$data['timezone'],
                     'comment'=>$data['comment'],
                     'enable_flag'=>$data['enable_flag'],
                     'company_id'=>(int)$data['company_id'],
                     'mct_member_id'=>$data['id'],
                     'role'=>$data['role']
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
             if (!Company::where('mct_company_id','=',$company['id'])->count()) {
                  $temp = [
                     'name'=>$company['name'],
                     'nation_region_id'=>$company['nation_region_id'],
                     'enable_flag'=>$company['enable_flag'],
                     'mct_company_id'=>$company['id']
                    ];   
                   $compant_id =  Company::insertGetId($temp);
                   $tempStatus = [
                     'company_id'=>$compant_id,
                     'total_space'=>'',
                     'used_space'=>''
                    ];
                    CompanyStatus::insertGetId($tempStatus);
                    
                    $tempSync = [
                     'mct_company_id'=>$company['id'],
                     'mct_company_change_id'=>$company['company_change_id'],
                     'mct_company_info_updated_at'=>date("Y-m-d H:i:s",(int)$company['company_info_updated_at'])]; 
                   
                    CompanySync::insertGetId($tempSync);
             } else{
               if (CompanySync::where('mct_company_id','=',$company['id'])->where('mct_company_change_id','!=',$company['company_change_id'])->count()){
                    $temp = [
                     'name'=>$company['name'],
                     'nation_region_id'=>$company['nation_region_id'],
                     'enable_flag'=>$company['enable_flag'],
                    ];
                    Company::where('mct_company_id','=',$company['id'])->update($temp);
              } 
             }
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

	public function createUser($data = '') {
		if($data == ''){
			$data = [
					  "event"=> "createUser",
					  "member"=> [
					    "id"=> "1262",
					    "company_id"=> "6148",
					    "name"=> "testsandeep",
					    "account"=> "usersandeep",
					    "email"=> "sandeep@katprotech.com",
					    "timezone"=> "Asia/Kolkata",
					    "comment"=> null,
					    "role"=> "User",
					    "enable_flag"=> "Y",
					    "member_info_updated_at"=> "1528116334",
					    "member_change_id"=> "1528116334",
					    "permission"=> [
					      "name"=> [
					        "view_devcie_list",
					        "add_device",
					        "add_group",
					        "edit_device",
					        "edit_group",
					        "delete_device",
					        "delete_group",
					        "view_status_and_log",
					        "device_control",
					        "install_app",
					        "uninsatll_app",
					        "image_update",
					        "view_app_list",
					        "add_app",
					        "edit_app",
					        "delete_app",
					        "update_app"
					      ],
					      "permission_updated_at"=> "1528116334"
					    ]
					  ]
					];
		$data = $data['member'];
		}
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
          if (MemberSync::where('mct_member_id','=',$data['id'])->where('mct_member_change_id','!=',$data['member_change_id'])->count()) {
            $this->editAccount($data);
        }
	}

  public function createBatchUser($data = '') {
    if($data == ''){
      $data = [
            "event"=> "createUser",
            "member"=> [
              [
                "id"=> "1262",
              "company_id"=> "6148",
              "name"=> "testsandeep",
              "account"=> "usersandeep",
              "email"=> "sandeep@katprotech.com",
              "timezone"=> "Asia/Kolkata",
              "comment"=> null,
              "role"=> "User",
              "enable_flag"=> "Y",
              "member_info_updated_at"=> "1528116334",
              "member_change_id"=> "1528116334",
              "permission"=> [
                "name"=> [
                  "view_devcie_list",
                  "add_device",
                  "add_group",
                  "edit_device",
                  "edit_group",
                  "delete_device",
                  "delete_group",
                  "view_status_and_log",
                  "device_control",
                  "install_app",
                  "uninsatll_app",
                  "image_update",
                  "view_app_list",
                  "add_app",
                  "edit_app",
                  "delete_app",
                  "update_app"
                ],
                "permission_updated_at"=> "1528116334"
              ],

            ],
            [
              "id" => "17",
              "member_change_id" => "1503281348",
              "company_id" => "3",
              "name" => "Tomato F Chou",
              "account" => "tomato_chou",
              "role" =>"User",
              "email" => "tomato.f.chou@benq.com",
              "timezone" => "Asia/Taipei",
              "comment" => "",
              "enable_flag" => "Y",
              "member_info_updated_at" => "1503281348",
              "permission"=> [
                "name"=> [
                  "view_devcie_list",
                  "add_device",
                  "add_group",
                  "edit_device",
                  "edit_group",
                  "delete_device",
                  "delete_group",
                  "view_status_and_log",
                  "device_control",
                  "install_app",
                  "uninsatll_app",
                  "image_update",
                  "view_app_list",
                  "add_app",
                  "edit_app",
                  "delete_app",
                  "update_app"
                ],
                "permission_updated_at"=> "1528116334"
              ],

            ]
          ]
          ];
    $member = $data['member'];
    }
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
  }

	public function editAccount($data = '') {
	   if($data == ''){
		$data = [
		  "event"=> "editAccount",
		  "member"=> [
		    "id"=> "1262",
		    "company_id"=> "6148",
		    "name"=> "testsandeep",
		    "account"=> "usersandeep",
		    "email"=> "sandeep@katprotech.com",
		    "timezone"=> "Asia/Kolkata",
		    "comment"=> "s",
		    "role"=> "User",
		    "enable_flag"=> "Y",
		    "member_info_updated_at"=> "1528184918",
		    "member_change_id"=> "1528184918",
		    "permission"=> [
		      "name"=> [
		        "view_devcie_list",
		        "add_device",
		        "add_group",
		        "edit_device",
		        "edit_group",
		        "delete_device",
		        "delete_group",
		        "view_status_and_log",
		        "device_control",
		        "install_app",
		        "uninsatll_app",
		        "image_update",
		        "view_app_list",
		        "add_app",
		        "edit_app",
		        "delete_app",
		        "update_app"
		      ],
		      "permission_updated_at"=> "1528184918"
		    ]
		  ]];
		 $data = $data['member'];
		}

		if(Member::where('mct_member_id', $data['id'])->count()){
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
            Member::where('mct_member_id', $data['id'])->update($temp);
            $Member_ID = Member::select('id')->where('mct_member_id', $data['id'])->limit('1')->get()->toArray();
            // dd($Member_ID);
            MemberSync::where('mct_member_id', $data['id'])->update($MemberSync);
            //First we need to delete old permission
            MemberPermission::where('member_id', $Member_ID[0]['id'])->delete();
            foreach ($data['permission']['name'] as $key1 => $value1) {
                array_push($permissionArr,['permission_name'=>$value1,'member_id'=>$Member_ID[0]['id']]);
            }
            if($data['id']){
                MemberPermission::insert($permissionArr);
            }
        } else {
        	$this->createAdministrator($data);
        }

	}

  public function delAccount($data = ''){
     if($data==''){
      $data = [
        "event"=> "delAccount",
        "member"=> [
          "id"=> "17",
          "deleted_at"=> "1503373155",
          "member_change_id"=> "1503373155"
        ]
      ];
      $data = $data['member'];
    }
    if(Member::where('mct_member_id', $data['id'])->count()){
        Member::where('mct_member_id',$data['id'])->update(['enable_flag'=>'N','updated_at'=>date("Y-m-d H:i:s",(int)$data['deleted_at'])]);
        $MemberSync = ['mct_member_id'=>$data['id'],
                           'mct_member_change_id'=>$data['member_change_id'],
                           'mct_member_info_updated_at'=>date("Y-m-d H:i:s",(int)$data['deleted_at']),
                           'mct_permission_updated_at'=>date("Y-m-d H:i:s",(int)$data['deleted_at'])];
        MemberSync::where('mct_member_id', $data['id'])->update($MemberSync);
    }
    
  }

  //[Role Management]
  
  public function editAccountPermission($data = ''){
     if($data==''){
      $data = [
        "event"=> "editAccountPermission",
        "member"=> [
          [
            "id"=>"17",
            "member_change_id"=>"1503380805",
            "permission"=>[
            "name"=>[
               "view_account_list",
               "background_setting",
               "general_setting",
               "shortcut_setting",
               "widget_setting",
               "view_nfc_list",
               "nfc_setting",
               "view_device_list",
               "rename_device",
               "unbind_device",
               "clear_app_setting"
              ],
            "permission_updated_at"=>"1503380805"
            ]
          ],
          [
              "id"=>"18",
               "member_change_id"=>"1503380805",
               "permission"=>[
                  "name"=>[
                     "view_account_list",
                     "background_setting",
                     "general_setting",
                     "shortcut_setting",
                     "widget_setting",
                     "view_nfc_list",
                     "nfc_setting",
                     "view_device_list",
                     "rename_device",
                     "unbind_device",
                     "clear_app_setting"
                  ],
                  "permission_updated_at"=>"1503380805"
               ]
          ] 
        ]
      ];
      $member = $data['member'];
    }
    
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
  }

	public function delCompany($data = '') {
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
	}

	//[SI setting]

  public function addSystemIntegrator($data = '') {
    if($data==''){
      $data = [
        "event"=> "addSystemIntegrator",
        "member"=> [
          "id"=>"17",
          "si_change_id"=>"1503390779",
          "manage_company"=>[
             "company_id"=>"5",
             "enable_flag"=>"Y",
             "permission_name"=>[
                "view_account_list",
                "background_setting",
                "general_setting",
                "shortcut_setting",
                "widget_setting",
                "view_nfc_list",
                "nfc_setting",
                "view_device_list",
                "rename_device",
                "unbind_device",
                "clear_app_setting"
             ],
             "info_updated_at"=>"1503390779",
             "permission_updated_at"=>"1503390779"
          ]
        ]
      ];
      $data = $data['member'];
    }
    if(Member::where('mct_member_id', $data['id'])->count()){
       if(Company::where('mct_company_id', $data['manage_company']['company_id'])->count()){
          $systemIntegrator = [];
          $systemIntegrator = ['member_id' => (int)$data['id'],
                    'company_id' => (int)$data['manage_company']['company_id'],
                    'enable_flag' => $data['manage_company']['enable_flag'],
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s")                    
                  ];
          $Id = SystemIntegrator::insertGetId($systemIntegrator);
          $permissionArr = [];
          foreach ($data['manage_company']['permission_name'] as $key2 => $value2) {
                array_push($permissionArr,['permission_name'=>$value2,'member_id'=>$Id]);
            }
          SystemIntegratorPermission::insert($permissionArr);
          $SystemIntegratorSync = [
            'system_integrator_id' => (int)$data['id'],
            'mct_info_updated_at' => $data['manage_company']['info_updated_at'],
            'mct_permission_updated_at' => $data['manage_company']['permission_updated_at']
          ];
          SystemIntegratorSync::insert($SystemIntegratorSync);

       }
    }
  }

  public function delSystemIntegrator($data = '') {
		if($data==''){
		  $data = [
			  "event"=> "delSystemIntegrator",
			  "member"=> [
			    "id"=> "1001",
			    "member_change_id"=> "1526871189",
			    "manage_company"=> [
			      "company_id"=> "1098",
			      "deleted_at"=> "1526885633"
			    ]
			  ]
			];
		  $data = $data['member'];
		}
    if(Member::where('mct_member_id', $data['id'])->count()){
       if(Company::where('mct_company_id', $data['manage_company']['company_id'])->count()){
          $Id = SystemIntegrator::select('id')->where('member_id', $data['id'])->where('company_id', $$data['manage_company']['company_id'])->limit('1')->get()->toArray();
          if($Id[0]['id']){
                SystemIntegratorPermission::where('id',$Id[0]['id'])->softDeletes();
                MemberPermission::where(' system_integrator_id', $Id[0]['id'])->delete();
                SystemIntegratorSync::where(' system_integrator_id', $Id[0]['id'])->delete();

          }
       }
     }
	}
}
