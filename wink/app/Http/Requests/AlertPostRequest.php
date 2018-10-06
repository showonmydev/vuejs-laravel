<?php

namespace Wink\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AlertPostRequest extends FormRequest
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
            'name' => 'required',
            'question_id'   => 'required',
            'comparator'  => 'required',
            'reference_input'    => 'required'
        ];
    }
}
