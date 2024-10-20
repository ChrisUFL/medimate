<?php

namespace Database\Factories;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    public function definition(): array
    {
        return [
            'appointment_time' => Carbon::now()->addMinutes(rand(1, 3600))->addDays(rand(0, 15)),
            'patient_id' => $this->faker->numberBetween(1, 100),
            'company_id' => $this->faker->numberBetween(1, 10),
            'employee_id' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
