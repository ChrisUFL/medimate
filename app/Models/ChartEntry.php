<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $visit_reason
 * @property string $content
 * @property string $blood_pressure
 * @property string $temperature
 * @property string $pulse
 * @property string $respiratory_rate
 * @property Carbon $visit_date
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property-read User $patient_id
 */
class ChartEntry extends Model {

    use HasFactory;
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'visit_date' => 'date',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
