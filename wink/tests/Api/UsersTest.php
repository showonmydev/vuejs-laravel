<?php

namespace Tests\Api;

use Wink\User;
use Wink\Company;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UsersTest extends TestCase
{

    /**
     * Check for authentication and response for failed login
     *
     * @return void
     */
    public function testAuthenticationFailed()
    {
        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'WrongPassWord']);
        $response
        ->assertStatus(401)
        ->assertJson([
            'error' => 'invalid_credentials',
            ]);
    }

    /**
     * Check for authentication and response for successful login
     *
     * @return void
     */
    public function testAuthenticationPass()
    {
        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response
        ->assertStatus(200);
    }

    /**
     * Get detail for authenticated user
     *
     * @return void
     */
    public function testGetAuthenticatedUser()
    {
        $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $response = $this->json('GET', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/authenticate/user', [], $headers);
        $response->assertStatus(200);
    }

    /**
     * Test registration
     *
     * @return void
     */
    public function testRegistration()
    {

        $randomEmail = "john@doe-".rand(100,999).".com";

        $company = Company::where('id',2)->first();

        $userDetails = array(
            "first_name" => "John",
            "last_name"  => "Doe",
            "email"      => $randomEmail,
            "password"   => "password",
            "company_hash" => $company->company_hash
        );

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/register', $userDetails);
        $response
        ->assertStatus(200)
        ->assertJson([
            'token' => true,
            ]);

        $this->assertDatabaseHas('users', [
            'email' => $randomEmail,
            'balance' => 0,
            'account_name' => NULL,
            'account_number' => NULL,
            'account_bank' => NULL,
            'account_type' => NULL
            ]);
    }

    /**
     * Test registration of duplicate email
     *
     * @return void
     */
    public function testDuplicateRegistration()
    {
        $email = "john@doe-".rand(100,999).".com";

        $company = Company::where('id',2)->first();

        $userDetails = array(
            "first_name" => "John",
            "last_name"  => "Doe",
            "email"      => $email,
            "password"   => "password",
            "company_hash" => $company->company_hash
        );

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/register', $userDetails);
        $response
        ->assertStatus(200)
        ->assertJson([
            'token' => true,
            ]);

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/register', $userDetails);
        $response
        ->assertStatus(302);
    }

    /**
     *
     *
     * @return void
     * @group testing
     */
    public function testUserCreate()
    {

        // TODO: GET USER DETALIS, COMPANY LINK UPS, ACCOUNTS
        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $data = [
            'first_name' => 'Testy',
            'last_name'  => 'McJohnson',
            'email'      => 'romano.borman@gmail.com',
            'company_id' => 5
        ];

        $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/user/create', $data, $headers)             
        ->assertJson(['message' => 'User created successfully'])
        ->assertStatus(200);
        
    }

    /**
     * 
     *
     * @return void
     * @group testing
     */
    public function testGetUserDetail()
    {

        // TODO: GET USER DETALIS, COMPANY LINK UPS, ACCOUNTS
        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $this->json('GET', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/users/details/1', [], $headers)             
        ->assertJson(['data' => TRUE])
        ->assertStatus(200);
        
        
    }

    /**
     * Test registration of duplicate email
     *
     * @return void
     * @group testing
     */
    public function testUserCanUpdate()
    {

        // The response from this will be the token for auth
        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $accountDetails = [
        'account_name' => "Phil Benoit",
        'account_number' => "123456789",
        'account_bank' => "123456",
        'account_type' => "savings"
        ];

        $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/account', $accountDetails, $headers)             
        ->assertJson(['message' => "ok"])
        ->assertStatus(200);

        $dbUser = factory(\Wink\User::class)->create();

        $response = $this->actingAs($dbUser)->assertDatabaseHas('users', [
            'account_name' => "Phil Benoit",
            'account_number' => "123456789",
            'account_bank' => "123456",
            'account_type' => "savings"
            ]);
        
    }


    /**
     * Test registration of duplicate email
     *
     * @return void
     * @group testing
     */
    public function testUserCanUpdateBankDetails()
    {

        // The response from this will be the token for auth
        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $accountDetails = [
        'account_name' => "Phil Benoit",
        'account_number' => "123456789",
        'account_bank' => "123456",
        'account_type' => "savings"
        ];

        $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME') . '/api/v1/account', $accountDetails, $headers)             
        ->assertJson(['message' => "ok"])
        ->assertStatus(200);

        $dbUser = factory(\Wink\User::class)->create();

        $response = $this->actingAs($dbUser)->assertDatabaseHas('users', [
            'account_name' => "Phil Benoit",
            'account_number' => "123456789",
            'account_bank' => "123456",
            'account_type' => "savings"
            ]);
        
    }


    /**
     * 
     *
     * @return void
     * @group testing
     */
    public function testUserDelete()
    {
        // TODO: USER DELETE. TEST COMPANY LINK UP AND ROLES DELETE. UN ASSIGN TASKS, PAYOUT REWARDS, ???
    }

 }