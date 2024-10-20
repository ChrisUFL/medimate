<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['string', 'min:5', 'max:25', 'required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
