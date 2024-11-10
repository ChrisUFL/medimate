<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalendarEventRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'time' => ['required'],
            'days' => ['required', 'array', 'max:7'],
            'frequency' => ['required', 'string'],
            'timezoneOffset' => ['required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
