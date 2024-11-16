<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $event_uuid
 * @property string $local_time
 * @property Carbon $datetime
 * @property int $user_id
 * @property-read User $user
 */
class CalendarEvent extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'datetime' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'event_uuid' => 'string',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
