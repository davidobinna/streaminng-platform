<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Traits\GetApiUser;
use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    use GetApiUser;
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
            'cover_image'         => 'sometimes|file|image|mimes:jpeg,png,gif,jpg|max:2048',
            'published_at'        => ['required'],
            'type'                => ['required', 'in:standard,premium'],
            'photo_credit_text'   => ['nullable'],
            'photo_credit_link'   => ['nullable'],
            'tags'                => ['array', 'nullable'],
            'tags.*'              => ['exists:tags,id'],
        ];
    }

   public function author(): User
   {
     return $this->getAuthUser();
   }

    public function title(): string
    {
        return $this->get('title');
    }

    public function body(): string
    {
        return $this->get('body');
    }

    public function image(): ?string
    {
        return $this->cover_image;
    }

    public function type(): string
    {
        return $this->get('type');
    }

    public function publishedAt(): string
    {
        return $this->get('published_at');
    }

    public function photoCreditText(): ?string
    {
        return $this->get('photo_credit_text');
    }
    public function photoCreditLink(): ?string
    {
        return $this->get('photo_credit_link');
    }

    public function tags(): array{
        return $this->get('tags',[]);
    }

    public function isCommentable()
    {
        $com = $this->get('comments') === 'true' ? true : false;
        return $com;
    }
}
