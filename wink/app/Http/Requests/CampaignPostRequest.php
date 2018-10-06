<?php

namespace Wink\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CampaignPostRequest extends FormRequest
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
            'report_name' => 'required',
            'task_name'   => 'required',
            'start_date'  => 'required',
            'end_date'    => 'required'
        ];
    }
}
