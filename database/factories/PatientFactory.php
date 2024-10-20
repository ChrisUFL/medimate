<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class PatientFactory extends Factory
{
    protected $model = Patient::class;

    public function definition(): array
    {
        return [
            'user_id' => User::class,
            'company_id' => Company::class,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
