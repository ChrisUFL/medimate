<?php

namespace Database\Factories;

use App\Models\ChartEntry;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ChartEntryFactory extends Factory
{
    protected $model = ChartEntry::class;

    public function definition(): array
    {
        return [
            'company_id' => 1,
            'visit_reason' => $this->faker->word(),
            'content' => $this->faker->paragraph(),
            'blood_pressure' => $this->faker->randomNumber(),
            'temperature' => $this->faker->randomNumber(),
            'pulse' => $this->faker->randomNumber(),
            'respirator_rate' => $this->faker->randomNumber(),
            'visit_date' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'patient_id' => 1,
        ];
    }
}
