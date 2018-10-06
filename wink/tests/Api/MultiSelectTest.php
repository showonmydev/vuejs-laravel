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

class MultiSelectTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Retrieve all companies
     *
     * @return void
     */
    public function checkOutMultiSelect()
    {

         $user = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14'])->decodeResponseJson();

        $headers = [];
        $headers['CONTENT_TYPE'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/checkout/11', [], $headers);
        $response
        ->assertStatus(200)
        ->assertJson([
            "message" => "Checkout task successful",
            ]);
    }


     /**
     * Test submission of multi select task answers
     *
     * @return void
     */
    public function testMultiSelectAnswerSubmit()
    {

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/authenticate', ['email' => 'phil@kiwidc.com', 'password' => 'CapeTown2*14']);
        $response->assertStatus(200);
        $user = $response->decodeResponseJson();

        $headers = [];
        $headers['Content_Type'] = 'application/json';
        $headers['Authorization'] = 'Bearer ' . $user['token'];

        $answers = ["8_11" => "Option #1", "10_11" => "Option #3",  "11_11" => "Option #4",  "12_12" => "Option #1",  "16_12" => "Option #5"];

        $response = $this->json('POST', 'http://app.'. getenv('APP_DOMAIN_NAME'). '/api/v1/answers/11', $answers, $headers);
        $response
        ->assertJson([
            "message" => "Answers saved successfully",
            ]);

    }

}