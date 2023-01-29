<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WriterResource extends JsonResource
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
            'name'         =>  $this->name(),
            'email'        =>  $this->emailAddress(),
            'role'         =>  $this->type(),
            'joinedDate'   => $this->joinedDate(),
        ];
    }
}
