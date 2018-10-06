<?php


use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class LoginPageTest extends DuskTestCase
{

    use DatabaseTransactions;

    /**
     * Test the password reset link works
     *
     * @return void
     */
    public function testPasswordResetLink()
    {

        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->seePageIs('/login');
        });
    }


    /**
     * Check that on all url's aside from app... does not contain the sign up link
     */
    public function testSignupNotVisible()
    {

        $this->visit('/login')
            ->dontSee('sign up');

    }

    /**
     * Test the signup link works on the app... url
     *
     * @return void
     */
    public function testSignupLink()
    {

        $this->baseUrl = 'http://app.'.env('APP_DOMAIN_NAME');
        $this->visit('/login')
            ->click('sign up')
            ->seePageIs('/register');
    }

}
