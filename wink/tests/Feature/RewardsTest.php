<?php

namespace Tests\Feature;

use Wink\User;
use Wink\Company;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RewardsTest extends TestCase
{

    use DatabaseTransactions;

    /**
     * Test user and company setup correctly
     * By testing the complete registration we are testing that a registered user and company
     * are setup with the right DB columns. 
     * @group testing
     * @return void
     */
    public function testCompanyAndUserSetupCorrectly()
    {

        // Setup a Registered User in the DB so we can call the registerComplete 
        // method on the RegistrationController
        $user = factory(\Wink\Registered::class)->create();

        $response = $this->json('GET', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/complete_registration/'. $user->registration_link);
        $response->assertStatus(200);

        $this->assertDatabaseHas('users', [
            'email' => $user->email,
            'balance' => 0,
            'account_name' => NULL,
            'account_number' => NULL,
            'account_bank' => NULL,
            'account_type' => NULL
            ]);

        $this->assertDatabaseHas('companies', [
            'name' => 'Demo',
            'rewards' => 1
            ]);

    }


     /**
     * Test user can't checkout tasks for campaigns with low reward balance
     * @group testing
     * @return void
     */
     public function testUserCantCheckoutTaskCompanyLowBalance()
     {


        $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/checkout/6', [], $headers);
        $response
        ->assertStatus(422)
        ->assertJson([
            "message" => "Checkout task failed. Insufficient funds for checkout.",
            ]);

    }


     /**
     * Test user can't checkout tasks for campaigns with low reward balance
     * @group testing
     * @return void
     */
     public function testUpdateCompanyBalance()
     {


        $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $data = array("balance" => 5000);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/update/5', $data, $headers);
        $response
         ->assertJson([
            "message" => "Company updated successfully",
        ]);

    }

    /**
     * Test user can checkout tasks for campaigns after balance updated
     * @group testing
     * @return void
     */
     public function testUserCanCheckoutRewardTask()
     {


        $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $data = array("balance" => 5000);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/update/5', $data, $headers);
        $response
         ->assertJson([
            "message" => "Company updated successfully",
        ]);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/checkout/6', [], $headers);
        $response
        ->assertStatus(200);

    }


     /**
     * Test user can't checkout tasks for campaigns with low reward balance
     * @group testing
     * @return void
     */
     public function testLowBalancSubmissionApproveFailLowBalance()
     {

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        // TODO add test functionality for reminder email check
        $data = array("balance" => 0);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/update/5', $data, $headers);
        $response
         ->assertJson([
            "message" => "Company updated successfully",
        ]);

        $answers = ["1" => 'Some Text', "2" => 'Option 1',  "3" => 3,  "4" => 5, "5" => '916489216'];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/answers/10', $answers, $headers);
        $response
            ->assertJson([
                "message" => "Answers saved successfully",
            ]);

        // $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/tasks/edit-approve/10', $answers, $headers);
        // $response
        // ->assertStatus(422)
        // ->assertJson([
        //     "message" => "Insufficent funds to pay reward."
        // ]);

    }


/**
     * Test user can't checkout tasks for campaigns with low reward balance
     * @group testing
     * @return void
     */
     public function testLowBalancSubmissionApproveWithReward()
     {

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        // TODO add test functionality for reminder email check
        $data = array("balance" => 1000);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/update/5', $data, $headers);
        $response
         ->assertJson([
            "message" => "Company updated successfully",
        ]);

          $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/checkout/10', [], $headers);
        $response
            ->assertStatus(200)
            ->assertJson([
                "message" => "Checkout task successful",
            ]);

        $answers = ["1" => 'Some Text', "2" => 'Option 1',  "3" => 3,  "4" => 5, "5" => '916489216'];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/answers/10', $answers, $headers);
        $response
            ->assertJson([
                "message" => "Answers saved successfully",
            ]);

//         $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/tasks/edit-approve/10', $answers, $headers);
//         $response
//         ->assertStatus(200)
//            ->assertJson([
//                 "message" => "Submission updated and approved successfully",
//             ]);
// ;

    }


    /**
     * Test user can't checkout tasks for campaigns with low reward balance
     * @group testing
     * @return void
     */
     public function testMultiSubmissionApprove()
     {

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        // TODO add test functionality for reminder email check
        $data = array("balance" => 1000);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/update/5', $data, $headers);
        $response
         ->assertJson([
            "message" => "Company updated successfully",
        ]);

        $count = 8;
        while($count >= 3){

                $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/checkout/' . $count, [], $headers);
                $response
                    ->assertStatus(200)
                    ->assertJson([
                        "message" => "Checkout task successful",
                    ]);

                $answers = ["1" => 'Some Text', "2" => 'Option 1',  "3" => 3,  "4" => 5, "5" => '916489216'];

                $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/answers/' . $count, $answers, $headers);
                $response
                    ->assertJson([
                        "message" => "Answers saved successfully",
                    ]);

                // $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/tasks/edit-approve/' . $count, $answers, $headers);
                // $response
                // ->assertStatus(200)
                //    ->assertJson([
                //         "message" => "Submission updated and approved successfully",
                //     ]);

                $count--;
        }

    }


     /**
     * Test user can't checkout tasks for campaigns with low reward balance
     * @group testing
     * @return void
     */
     public function testRewardBalanceUpdating()
     {

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        // TODO add test functionality for reminder email check
        $data = array("balance" => 1000);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/update/5', $data, $headers);
        $response
         ->assertJson([
            "message" => "Company updated successfully",
        ]);

        // TODO: SUBMIT AND APPROVE A BUNCH OF TASKS. CHECK IF COMPANY AND USER BALANCES HAVE UDPATED

        // $count = 8;
        // while($count >= 3){

        //         $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/checkout/' . $count, [], $headers);
        //         $response
        //             ->assertStatus(200)
        //             ->assertJson([
        //                 "message" => "Checkout task successful",
        //             ]);

        //         $answers = ["1" => 'Some Text', "2" => 'Option 1',  "3" => 3,  "4" => 5, "5" => '916489216'];

        //         $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/answers/' . $count, $answers, $headers);
        //         $response
        //             ->assertJson([
        //                 "message" => "Answers saved successfully",
        //             ]);

        //         $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/tasks/edit-approve/' . $count, $answers, $headers);
        //         $response
        //         ->assertStatus(200)
        //            ->assertJson([
        //                 "message" => "Submission updated and approved successfully",
        //             ]);

        //         $count--;
        // }


    }




     /**
     * Test transactions are logged correctly in accounting log table
     * @group testing
     * @return void
     */
     public function testAccountLogging()
     {

     }


}