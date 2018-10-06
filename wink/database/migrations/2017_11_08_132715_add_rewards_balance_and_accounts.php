<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRewardsBalanceAndAccounts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Update the company record to include a company balance
        Schema::table('companies', function($table) {
            $table->integer('balance')->default(0);
            $table->boolean('rewards')->default(false);
        });

        // Update the user record to include a company balance
        Schema::table('users', function($table) {
            $table->integer('balance')->default(0);
            $table->string('account_name')->nullable();
            $table->string('account_number')->nullable();
            $table->string('account_bank')->nullable();
            $table->string('account_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // DROP the balance from the companies table
        Schema::table('companies', function($table) {
            $table->dropColumn('balance');
            $table->dropColumn('rewards');
        });

        // Drop the balanace and account details from the users table
        Schema::table('users', function($table) {
            $table->dropColumn('balance');
            $table->dropColumn('account_name');
            $table->dropColumn('account_number');
            $table->dropColumn('account_bank');
            $table->dropColumn('account_type');
        });
    }
}
