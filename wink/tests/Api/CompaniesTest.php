<?php

namespace Tests\Api;

use Tests\TestCase;
use Wink\User;
use Wink\Company;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CompaniesTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Retrieve all companies
     *
     * @return void
     */
    public function testGetCompanies()
    {

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $response = $this->json('GET', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies', [], $headers);
        $response
        ->assertJson([
            "data" => TRUE,
            ]);

    }

    /**
     * Retrieve single comapny data
     *
     * @return void
     * 
     */
    public function testGetSingleCompany()
    {
        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $response = $this->json('GET', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/5', [], $headers);
        $response
        ->assertJson([
            "data" => TRUE,
            ]);
    }

    /**
     * create a company
     *
     * @return void
     */
    public function testCompanyCreate()
    {
        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $data = [
        "name" => 'Rewards Test 2',
        "subdomain" => "rw2",
        "balance" => 0,
        "rewards" => 0
        ];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/create', $data, $headers);
        $response
        ->assertJson([
            "message" => 'Company created successfully',
            ]);
    }

     /**
     * Update a company
     *
     * @return void
     */
     public function testCompanyUpdate()
     {

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $data = [
        "name" => 'Rewards Test 3',
        "subdomain" => "rw3",
        "balance" => 500,
        "rewards" => 1
        ];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/update/5', $data, $headers);
        $response
        ->assertJson([
            "message" => 'Company updated successfully',
            ]);

    }

    /**
     * Delete a Company
     *
     * @return void
     */
    public function testCompanyDelete()
    {

     $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
     $response->assertStatus(200);
     $user = $response->decodeResponseJson();

     $headers = [];
     $headers['Content_Type'] = 'application/json';
     $headers['Authorization'] = 'Bearer ' . $user['token'];

     $data = [
     "name" => 'Rewards Test 2',
     "subdomain" => "rw2",
     "balance" => 0,
     "rewards" => 0
     ];

     $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/create', $data, $headers);
     $response
     ->assertJson([
        "message" => 'Company created successfully',
        ]);

     $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/companies/delete/6' , $data, $headers);
     $response
     ->assertJson([
        "message" => 'Company deleted successfully',
        ]);


 }



}