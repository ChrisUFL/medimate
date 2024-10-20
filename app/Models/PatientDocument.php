<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $file_id
 * @property string $extension
 * @property string $mimetype
 * @property string $original_name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read User $user_id
 * @property-read Note $note_id
 */
class PatientDocument extends Model
{
    protected $guarded = [];
    protected function casts(): array
    {
        return [
            'file_id' => 'string',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function note(): BelongsTo
    {
        return $this->belongsTo(Note::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
