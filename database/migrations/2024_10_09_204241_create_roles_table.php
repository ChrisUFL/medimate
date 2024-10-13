<?php

use App\Models\Company;
use App\Models\Employee;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roles', static function (Blueprint $table) {
            $table->id();
            $table->UUID('role_id')->unique()->nullable(false);
            $table->string('role_name')->unique()->nullable(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        Schema::create('user_role', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Role::class)->nullable(false)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class)->nullable(false)->constrained()->cascadeOnDelete();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        Schema::create('appointments', static function (Blueprint $table) {
            $table->id();
            $table->timestamp('appointment_time')->nullable(false);
            $table->unsignedBigInteger('patient_id')->nullable(false);
            $table->unsignedBigInteger('provider_id')->nullable(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('patient_id')->references('id')->on('users');
            $table->foreign('provider_id')->references('id')->on('users');
        });

        Schema::create('companies', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->string('company_name')->nullable(false);
            $table->string('street_address');
            $table->string('city');
            $table->string('state');
            $table->string('zip_code');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        Schema::create('company_user', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Company::class);
            $table->foreignIdFor(User::class);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::table('user_role', static function (Blueprint $table) {
            $table->dropConstrainedForeignIdFor(Role::class);
            $table->dropConstrainedForeignIdFor(User::class);
        });

        Schema::table('appointments', static function (Blueprint $table) {
            $table->dropConstrainedForeignId('patient_id');
            $table->dropConstrainedForeignId('provider_id');
        });

        Schema::dropIfExists('roles');
        Schema::dropIfExists('user_role');
        Schema::dropIfExists('company_user');
        Schema::dropIfExists('appointments');
        Schema::dropIfExists('companies');
    }
};
