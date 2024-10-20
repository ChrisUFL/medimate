<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'min:2', 'max:255'],
            'last_name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'email', 'min:5', 'max:255'],
            'date_of_birth' => ['required', 'date'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
