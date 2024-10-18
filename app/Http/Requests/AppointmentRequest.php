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
            'isoTime' => ['required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
