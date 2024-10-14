<?php

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChartEntriesTable extends Migration
{
    public function up(): void
    {
        Schema::create('chart_entries', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Company::class)->constrained()->cascadeOnDelete();
            $table->string('visit_reason');
            $table->longText('content');
            $table->string('blood_pressure');
            $table->string('temperature');
            $table->string('pulse');
            $table->string('respirator_rate');
            $table->date('visit_date');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::table('chart_entries', static function (Blueprint $table) {
            $table->dropConstrainedForeignId(User::class);
            $table->dropConstrainedForeignId(Company::class);
        });

        Schema::dropIfExists('chart_entries');
    }
}
