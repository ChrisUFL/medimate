<?php

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientsTable extends Migration
{
    public function up(): void
    {

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

        Schema::create('patients', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Company::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('patients', static function (Blueprint $table) {
            $table->dropConstrainedForeignId(User::class);
            $table->dropConstrainedForeignId(Company::class);
        });

        Schema::table('companies', static function (Blueprint $table) {
            $table->dropConstrainedForeignId(User::class);
        });

        Schema::dropIfExists('patients');
        Schema::dropIfExists('companies');
    }
}
