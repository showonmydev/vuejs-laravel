<?php

namespace Wink\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'unique:users'
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'This email is already in use. To add this user to your company simply add them to a team.'
        ];
    }
}
