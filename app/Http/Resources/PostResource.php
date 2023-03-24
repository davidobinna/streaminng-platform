<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
           'id'           => $this->id(),
           'title'        => $this->title(),
           'excerpt'      => $this->excerpt(50),
           'author'       => $this->author()->name(),
           'created_at'   => $this->created_at->format('d-m-Y'),
           'published_at' => $this->published_at->format('d-m-Y'),
        ];
    }
}
