<?php

namespace Wink\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserEditAccountDetailsRequest extends FormRequest
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
            'account_name' => 'required',
            'account_number' => 'required',
            'account_bank' => 'required|size:6',
            'account_type' => 'required'
        ];
    }

}
