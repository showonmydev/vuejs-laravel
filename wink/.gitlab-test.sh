#!/bin/sh
# Ensure we fail fast if there is a problem.
# set -eo pipefail

# Ensure that php is working
php -v

# Ensure that mysql server is up and running
ping -c 3 mysql

# Run unit testing with PHPUnit
php artisan migrate:fresh --seed
echo "Running PHPUnit Tests"
php vendor/bin/phpunit  --configuration gitlab.phpunit.xml --coverage-text --colors
