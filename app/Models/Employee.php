<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property string $first_name
 * @property string $last_name
 * @property string|null $license_number
 * @property bool $verified
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property-read Company $company_id
 * @property-read User $user_id
 */
class Employee extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
