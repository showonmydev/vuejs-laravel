<?php

namespace Wink\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegistrationMobileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name'   => 'required|max:255',
            'last_name'    => 'required|max:255',
            'email'        => 'required|email|max:255',
            'password'     => 'required|min:6',
            'company_id'     => 'min:1'
        ];
    }
}
