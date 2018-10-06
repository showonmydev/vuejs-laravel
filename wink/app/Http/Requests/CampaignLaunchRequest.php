<?php

namespace Wink\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CampaignLaunchRequest extends FormRequest
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
            'per_location' => 'required_unless:update_campaign,true',
            'targets'      => 'required_if:launch_campaign,true'
        ];
    }
}
