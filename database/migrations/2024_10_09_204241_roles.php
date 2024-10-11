<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Roles extends Migration
{
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->UUID('role_id')->unique()->nullable(false);
            $table->string('role_name')->unique()->nullable(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        Schema::create('user_role', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Role::class)->nullable(false)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(User::class)->nullable(false)->constrained()->cascadeOnDelete();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });

        Schema::create('patient_provider', static function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patient_id')->nullable(false);
            $table->unsignedBigInteger('provider_id')->nullable(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();

            $table->foreign('patient_id')->references('id')->on('users');
            $table->foreign('provider_id')->references('id')->on('users');
        });

        Schema::create('appointments', static function (Blueprint $table) {
            $table->id();
            $table->string('patient_name');
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
            $table->string('company_name')->nullable(false);
            $table->unsignedBigInteger('owner_id')->nullable(false);
        });
    }

    public function down(): void
    {
        Schema::table('user_role', static function (Blueprint $table) {
            $table->dropConstrainedForeignIdFor(Role::class);
            $table->dropConstrainedForeignIdFor(User::class);
        });

        Schema::dropIfExists('roles');
        Schema::dropIfExists('user_role');
    }
}
