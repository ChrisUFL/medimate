<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property Carbon $appointment_time
 * @property int $patient_id
 * @property int $provider_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Appointment extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected function casts(): array
    {
        return [
            'appointment_time' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
    public function patient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'patient_id', 'id');
    }

    public function provider(): BelongsTo
    {
        return $this->belongsTo(User::class, 'provider_id', 'id');
    }
}
