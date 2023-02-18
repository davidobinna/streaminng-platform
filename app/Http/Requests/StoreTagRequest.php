<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTagRequest extends FormRequest
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
            'name'          => ['required', 'max:100'],
            'image'         => 'required|file|image|mimes:jpeg,png,gif,jpg|max:2048',
            'description'   => ['sometimes', 'max:200'],
        ];
    }
    public function name(): string
    {
        return $this->input('name');
    }

    public function image(): ?string
    {
        return $this->image;
    }
    public function description(): string
    {
        return $this->get('description');
    }
}
