<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChartEntryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'patientId' => ['required', 'int'],
            'reason' => ['required', 'string'],
            'summary' => ['required', 'string'],
            'date' => ['required', 'date'],
            'bodyTemp' => ['required', 'string'],
            'bloodPressure' => ['required', 'string'],
            'pulse' => ['required', 'string'],
            'respRate' => ['required', 'string'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
