<?php

namespace App\Http\Resources;

use App\Traits\HasSubscribe;
use Illuminate\Http\Resources\Json\JsonResource;

class MembershipResource extends JsonResource
{
    use HasSubscribe; 
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'  => $this->id(),
            'name' => $this->name(),
            'price' => $this->price(),
            'abbreviation' => $this->abbreviation(),
            'plan' => $this->stripeName(),
            'subscribed' => $this->isSubscribed($this->getAuthUser()),
            'notsubscribed' => $this->isNotsubscribed($this->getAuthUser()),
            'subscribedToProduct' => $this->isSubscribedToProduct($this->getAuthUser(),$this->stripeProductId(),$this->stripeName()),
        ];

    }
}
