<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property Carbon $email_verified_at
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $date_of_birth
 * @property string $avatar_url
 * @property string $gender
 * @property string $phone_number
 * @property string $address
 * @property string $language
 *
 * @property-read Note $note
 * @property-read Company $company
 */
class User extends Authenticatable implements HasName, FilamentUser
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'date_of_birth',
        'avatar_url',
       
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'dob' => 'date',
        ];
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    public function company(): HasOne
    {
        return $this->hasOne(Company::class);
    }

    public function employee(): HasOne
    {
        return $this->hasOne(Employee::class);
    }

    /** User is a patient of many companies */
    public function patient(): HasMany
    {
        return $this->hasMany(Patient::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(PatientDocument::class);
    }

    public function getFilamentName(): string
    {
        $firstName = ucfirst($this->first_name);
        $lastName = ucfirst($this->last_name);
        return "{$firstName} {$lastName}";
    }
    public function canAccessPanel(Panel $panel): bool
    {
        return str_ends_with($this->email, '@ufl.edu') /*&& $this->hasVerifiedEmail()*/;
    }

}
