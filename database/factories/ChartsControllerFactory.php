<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ChartsControllerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'content' => $this->faker->paragraph(),
            'visit_reason' => $this->faker->text(50),
            'visit_date' => $this->faker->date(),
            'blood_pressure' => $this->faker->randomNumber(),
            'temperature' => $this->faker->randomNumber(),
            'pulse' => $this->faker->randomNumber(),
            'respirator_rate' => $this->faker->randomNumber(),
        ];
    }
}
