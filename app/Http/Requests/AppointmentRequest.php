<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppointmentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'patientId' => ['required', 'int'],
            'doctorId' => ['required', 'int'],
            'appointmentDate' => ['required', 'date'],
            'appointmentTime' => ['required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
