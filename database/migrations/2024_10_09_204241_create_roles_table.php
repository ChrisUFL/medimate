<?php

use App\Models\Company;
use App\Models\Employee;
use App\Models\Patient;
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
            $table->foreignIdFor(Patient::class);
            $table->foreignIdFor(Employee::class);
            $table->foreignIdFor(Company::class);
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
    }
};
