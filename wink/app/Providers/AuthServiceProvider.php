<?php

namespace Wink\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'Wink\Model' => 'Wink\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //$this->registerPolicies($gate);

        // Is this user part of the group who can edit any aspect - used for stopping non editors from access
        Gate::define('edit', function ($user) {
            return in_array($user->getRole(), ['Root', 'Administrator', 'Board Manager', 'Store Manager']);
        });

        // Is this user part of the group who can edit company settings
        Gate::define('edit-settings', function ($user) {
            return in_array($user->getRole(), ['Root', 'Administrator']);
        });
    }
}
