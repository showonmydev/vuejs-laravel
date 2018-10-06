<?php

namespace Tests\Api;

use Tests\TestCase;
use Wink\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TasksTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Retrieve all tasks, without auth token
     *
     * @return void
     */
    public function testGetTasksWithoutAuth()
    {
        $response = $this->json('GET', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/tasks', []);
        $response
        ->assertStatus(400)
        ->assertJson([
            "error" => "token_not_provided",
            ]);
    }

    /**
     * Retrieve all tasks, with auth correct token
     *
     * @return void
     * 
     */
    public function testGetTasksWithAuth()
    {
        $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $response = $this->json('GET', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/tasks', [], $headers);
        $response
        ->assertStatus(200)
        ->assertJson([
            "data" => TRUE,
            ]);
    }

    /**
     * Retrieve all tasks, with auth correct token and lat, long
     *
     * @return void
     */
    public function testGetTasksWithAuthLatLong()
    {
        $lat = '-33.933';
        $long = '18.424';

        $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $response = $this->json('GET', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/tasks/' . $lat . '/' . $long, [], $headers);
        $response
        ->assertStatus(200)
        ->assertJson([
            "data" => TRUE,
            ]);
    }

     /**
     * Get task details
     *
     * @return void
     */
     public function testGetSingleTask()
     {

        $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $response = $this->json('GET', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/task/1', [], $headers);
        $response
        ->assertStatus(200)
        ->assertJson([
            "data" => TRUE
            ]);
    }

    /**
     * Checkout task
     *
     * @return void
     */
    public function testTaskCheckout()
    {

        $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/checkout/1', [], $headers);
        $response
        ->assertStatus(200)
        ->assertJson([
            "message" => "Checkout task successful",
            ]);
    }

    /**
     * Checkout task failed
     *
     * @return void
     */
    public function testTaskCheckoutFail()
    {

        $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/checkout/0', [], $headers);
        $response
        ->assertStatus(500)
        ->assertJson([
            "message" => "Checkout task failed",
            ]);
    }

    /**
     * Test submission of task answers
     *
     * @return void
     */
    public function testTaskAnswerSubmit()
    {

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $answers = ["1" => 'Some Text', "2" => 'Option 1',  "3" => 3,  "4" => 5,  "5" => '916489216'];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/answers/1', $answers, $headers);
        $response
        ->assertJson([
            "message" => "Answers saved successfully",
            ]);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/answers/1', $answers, $headers);
        $response
        ->assertStatus(500)
        ->assertJson([
            "message" => "This task has already been submitted"
            ]);
    }



    /**
     * Test submission of images
     *
     * @return void
     */
    public function testImageSubmit()
    {
        $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'multipart/form-data';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $response = $this->post('http://app.'. getenv('APP_DOMAIN_NAME') .'/api/v1/checkout/1', [], $headers);
        $response->assertStatus(200);

        $file = UploadedFile::fake()->image('test.jpg', 250, 250)->size(100);

        $response = $this->post('http://app.'. getenv('APP_DOMAIN_NAME') .'/api/v1/image/save', [
            'file' => $file,
            'taskId' => 1,
            'questionId' => 1

            ], $headers);

        $response
        ->assertStatus(200)
        ->assertJson([
            "file_id" => true,
            ]);
    }


    /**
     * Get task details
     *
     * @return void
     */
     public function testGetSubmissionData()
     {

        $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

         $answers = ["1" => 'Some Text', "2" => 'Option 1',  "3" => 3,  "4" => 5,  "5" => '916489216'];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/answers/1', $answers, $headers);
        $response
        ->assertJson([
            "message" => "Answers saved successfully",
            ]);

        $response = $this->json('GET', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/tasks/data/1', [], $headers);
        $response
        ->assertStatus(200)
        ->assertJson([
            "task" => TRUE,
            "answers" => TRUE
            ]);
    }



    /**
     * Test task submission approval. No reward check
     * @group testing
     * @return void
     */
    public function testSubmissionApproval()
    {

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        // Set reward to and balance to 0, so no reward check on submission approval
        $data = array("balance" => 0, "reward" => 0);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/update/5', $data, $headers);
        $response
        ->assertJson([
            "message" => "Company updated successfully",
            ]);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/checkout/1', [], $headers);
        $response
        ->assertStatus(200)
        ->assertJson([
            "message" => "Checkout task successful",
            ]);

        $answers = ["1" => 'Some Text', "2" => 'Option 1',  "3" => 3,  "4" => 5,  "5" => '916489216'];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/answers/1', $answers, $headers);
        $response
        ->assertJson([
            "message" => "Answers saved successfully",
            ]);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/tasks/edit-approve/1', [], $headers);
        $response
        ->assertStatus(200)
        ->assertJson([
            "message" => "Submission updated and approved successfully",
            ]);

    }


    /**
     * Test task submission delete
     * @group testing
     * @return void
     */
    public function testSubmissionDelete()
    {

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        // Set reward to and balance to 0, so no reward check on submission approval
        $data = array("balance" => 0, "reward" => 0);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/update/5', $data, $headers);
        $response
        ->assertJson([
            "message" => "Company updated successfully",
            ]);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/checkout/1', [], $headers);
        $response
        ->assertStatus(200)
        ->assertJson([
            "message" => "Checkout task successful",
            ]);

        $answers = ["1" => 'Some Text', "2" => 'Option 1',  "3" => 3,  "4" => 5,  "5" => '916489216'];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/answers/1', $answers, $headers);
        $response
        ->assertJson([
            "message" => "Answers saved successfully",
            ]);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/tasks/delete', ['deleteSubmissions' => 1, 'extendCampaign' => false], $headers);
        $response
        ->assertStatus(200)
        ->assertJson([
            "message" => "Submissions deleted successfully",
            ]);

    }

}