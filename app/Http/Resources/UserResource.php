<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name'         => $this->name(),
            'email'        => $this->emailAddress(),
            'subcription'  => $this->subscriptions,
            'isadmin'      => $this->isAdmin(),
            'isSuperAdmin' => $this->isSuperAdmin(),
            'isModerator'  => $this->isModerator(),
            'isWriter'     => $this->isWriter(),
            'isDefault'    => $this->isDefault(),
            'joinedDate'   => $this->joinedDate(),
        ]; 
    }
}
