<?php

namespace Wink\Console\Commands;

use Wink\Task;
use Wink\User;
use Carbon\Carbon;
use Wink\Campaign;
use Wink\CampaignWave;
use Illuminate\Console\Command;
use File;
use Mail;
use DB;
use Storage;
use Wink\AccountingLog;

class RewardBulkPayout extends Command 
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'wink:reward_bulk_payout';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Payout all request reward balances';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $filename = 'DOSS_NETCASH_BATCH_SETTLE_3_'.date("Ymd").'.txt';
        // Delete any existing payment file
        Storage::delete(storage_path() . '/app/payments/' . $filename);

        // Get users that have requested payment and have sufficient balance
        //$users = DB::select('SELECT users.id, account_name, account_type, account_bank, account_number, amount, pending_payout FROM `accounting_log` LEFT JOIN users ON users.id = accounting_log.user_id WHERE notes = "Reward Bulk Payment Success"', []);
        $users = User::where('pending_payout','>',0)->get();
        // Parts of bulk payment file
        $payment_file_contents = '';
        $total_amount = 0;
        // Loop though users and build lines for bulk payment file
        foreach($users as $u){

            if($u->pending_payout > 0){



                $payment_file_contents .= '"606606_' . $u->id .'","'.$u->account_name.'","'.$u->account_name.'","'.$u->account_type.'","'.$u->account_bank.'","'.$u->account_number.'","'.$u->pending_payout.'00","'.$u->pending_payout.'00","","","0","0","0","0","0","doss","SETTLE","","Wink Agent Cashout"' . PHP_EOL;

                $total_amount = $total_amount + $u->pending_payout;

              
                // Log reward payout
                AccountingLog::create([
                    'user_id'       => $u->id,
                    'action'        => 'Reward Bulk Payment',
                    'notes'         => 'Reward Bulk Payment Success',
                    'amount'        =>  $u->pending_payout
                ]);
                  
                $u->update([
                    'payout_requested' => 0,
                    'pending_payout' => 0
                ]);

                $total_amount = $total_amount + $u->pending_payout;

            }

        }

        $payment_file_header = '"c741580e-ff6f-4f27-bcc0-0cdf7782188e","0","0","D","1","1"' . PHP_EOL;
        $payment_file_keys = '"DOSS_NETCASH_BATCH_SETTLE_3_'.date("Ymd").'","'.date("Y/m/d").'"' . PHP_EOL;
        //$payment_file_keys = 'K    101   102    131    132   133     134     135     136     162     252 /r/n';
        $payment_file_footer = '"##END##","'.$total_amount.'00'.'"' . PHP_EOL;

        $data = $payment_file_header . $payment_file_keys . $payment_file_contents . $payment_file_footer;      

        // Check if Web Service function existis, if it does, do payment directly, if not, send to mike for manual submission
        // if(function_exists('WSClient')){
        //     $wsclient = new WSClient( array(
        //         "wsdl" => "https://ws.sagepay.co.za/NIWS/niws_validation.svc",
        //         "to" => "//localhost/SagePay.php"));
        //     /* we need to take the proxy object to call the wsdl operation */
        //     $proxy = $wsclient->getProxy();
        //     /* Right here I'm calling the ExamResult function with argument "Hiro"
        //     Remeber in the WSDL we had "ExamResult" operation with name argument */
        //     $ret_val = $proxy->BatchFileUpload(
        //         array(
        //             "ServiceKey" => env('SAGEPAY_SALARY'),
        //             "File" => $data
        //         )
        //     );
        // }else{
        //    $file = File::put(storage_path() . '/app/payments/' . $filename, $data);
        //    $email_data = array('name'=>"Mike Meterlerkamp");
        // }


        if($total_amount > 0){
            $file = File::put(storage_path() . '/app/payments/' . $filename, $data);
            $email_data = array('name'=>"Mike Meterlerkamp");

            Mail::send('emails.rewardBulkPayout', $email_data, function($message) {
                     $message->to(env('PAYMENTS_TO_EMAIL'), '')->subject('Reward Bulk Payout File');
                     $message->attach(storage_path() . '/app/payments/' . 'DOSS_NETCASH_BATCH_SETTLE_3_'.date("Ymd").'.txt');
                     $message->from(env('PAYMENTS_FROM_EMAIL'), '');
                });
        }
        
    }
}
