<?php

namespace Tests;

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    //use CreatesApplication;

    private $clientToken;

    public function setUp()
    {
        parent::setUp();
        $this->baseUrl = 'http://demo.'.env('APP_DOMAIN_NAME');
    }

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Kernel::class)->bootstrap();

        $this->setClientToken();

        return $app;
    }

    private function setClientToken(){

        $client = factory(\Wink\User::class)->create();

        //$this->client = $client;
        //$this->clientToken = JWTAuth::fromUser($client);
    }

    public function clientGet($url, $data = [])
    {
        $url .= '?token=' . $this->clientToken;

        \Log::info($url);

        return $this->get($url, $data);
    }
}
