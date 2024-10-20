<?php

use App\Models\Note;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientDocumentsTable extends Migration
{
    public function up(): void
    {
        Schema::create('patient_documents', static function (Blueprint $table) {
            $table->id();
            $table->uuid('file_id')->unique();
            $table->string('original_name');
            $table->string('extension');
            $table->string('mimetype');
            $table->foreignIdFor(Note::class);
            $table->foreignIdFor(User::class);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::table('', function (Blueprint $table) {
            $table->dropConstrainedForeignId(Note::class);
            $table->dropConstrainedForeignId(User::class);
        });
        Schema::dropIfExists('patient_documents');
    }
}
