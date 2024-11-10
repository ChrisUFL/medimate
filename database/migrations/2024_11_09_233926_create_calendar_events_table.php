<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCalendarEventsTable extends Migration
{
    public function up(): void
    {
        Schema::create('calendar_events', static function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('description');
            $table->timestamp('datetime');
            $table->string('local_time');
            $table->uuid('event_uuid');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::table('calendar_events', static function (Blueprint $table) {
            $table->dropConstrainedForeignIdFor(User::class);
        });

        Schema::dropIfExists('calendar_events');
    }
}
