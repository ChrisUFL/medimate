<?php

use App\Models\Company;
use App\Models\Patient;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChartEntriesTable extends Migration
{
    public function up(): void
    {
        Schema::create('chart_entries', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Patient::class)->constrained()->cascadeOnDelete();
            $table->string('visit_reason');
            $table->longText('content')->nullable();
            $table->string('blood_pressure')->nullable();
            $table->string('temperature')->nullable();
            $table->string('pulse')->nullable();
            $table->string('respiratory_rate')->nullable();
            $table->date('visit_date');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::table('chart_entries', static function (Blueprint $table) {
            $table->dropConstrainedForeignId(Patient::class);
            $table->dropConstrainedForeignId(Company::class);
        });

        Schema::dropIfExists('chart_entries');
    }
}
