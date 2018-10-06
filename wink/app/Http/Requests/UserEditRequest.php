<?php

namespace Wink\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserEditRequest extends FormRequest
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

        // TODO: This should be updated to validate the email but only if its changed
        // This mean adding in the user ID to the item getting updated.

        return [
            'first_name' => 'required',
            'last_name' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'This email is already in use. To add this user to your company simply add them to a team.'
        ];
    }
}
