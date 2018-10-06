<?php

namespace Laravel\Socialite\Two;

use Illuminate\Support\Arr;

class BenqProvider extends AbstractProvider implements ProviderInterface
{
    /**
     * The scopes being requested.
     *
     * @var array
     */
    protected $scopes = [];

    /**
     * The separating character for the requested scopes.
     *
     * @var string
     */
    protected $scopeSeparator = ' ';

    /**
     * The fields that are included in the profile.
     *
     * @var array
     */
    protected $fields = [];

    /**
     * {@inheritdoc}
     */
    protected function getAuthUrl($state)
    {

        \Log::info('getAuthUrl::'.$this->buildAuthUrlFromBase('https://service-portaltest.benq.com/oauth/authorize', $state));
        return $this->buildAuthUrlFromBase('https://service-portaltest.benq.com/oauth/authorize', $state);
    }

    /**
     * {@inheritdoc}
     */
    protected function getTokenUrl()
    {
        \Log::info('getTokenUrl::');
        return 'https://service-portaltest.benq.com/oauth/token';
    }

    /**
     * Get the POST fields for the token request.
     *
     * @param  string  $code
     * @return array
     */
    protected function getTokenFields($code)
    {
        return parent::getTokenFields($code) + ['grant_type' => 'authorization_code'];
    }

    /**
     * {@inheritdoc}
     */
    protected function getUserByToken($token)
    {
        $url = 'https://service-portaltest.benq.com/api/user';

        $response = $this->getHttpClient()->get($url, [
            'headers' => [
                //'x-li-format' => 'json',
                'Authorization' => 'Bearer '.$token,
            ],
        ]);
        return json_decode($response->getBody(), true);
    }

    /**
     * {@inheritdoc}
     */
    protected function mapUserToObject(array $user)
    {  
    	\Log::info($user);
         return (new User)->setRaw($user)->map([
            'id' => $user['id'], 'nickname' => null, 'name' => isset($user['name']) ? $user['name']:null,
            'email' => isset($user['email']) ? $user['email']:null, 'avatar' => null,
            'avatar_original' => null,
        ]);

    }

    /**
     * Set the user fields to request from LinkedIn.
     *
     * @param  array  $fields
     * @return $this
     */
    public function fields(array $fields)
    {
       \Log::info('OKKKK');
        $this->fields = $fields;

        return $this;
    }
}
