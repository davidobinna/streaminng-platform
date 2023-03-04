<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
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
            'title'               => ['required', 'max:100'],
            'body'                => ['required'],
            'type'                => ['required', 'in:standard,premium'],
            'tags'                => ['array', 'nullable'],
            'tags.*'              => ['exists:tags,id'],
        ];
    }

    public function title(): string
    {
        return $this->get('title');
    }

    public function body(): string
    {
        return $this->get('body');
    }

    public function type(): string
    {
        return $this->get('type');
    }
      
    public function isCommentable()
    {
        $com = $this->get('comments') === 'true' ? true : false;
        return $com;
    }
}
