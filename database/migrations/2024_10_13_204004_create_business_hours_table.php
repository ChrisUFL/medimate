<?php

use App\Models\Company;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusinessHoursTable extends Migration
{
    public function up(): void
    {
        Schema::create('business_hours', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Company::class)->constrained()->cascadeOnDelete();
            $table->integer('day');
            $table->time('open_time');
            $table->time('close_time');
            $table->integer('length_of_lunch');
            $table->time('lunch_time');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::table('business_hours', static function (Blueprint $table) {
            $table->dropConstrainedForeignId(Company::class);
        });
        Schema::dropIfExists('business_hours');
    }
}
