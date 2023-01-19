<?php 
namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

/**
 * 
 */
trait HasSubscribe
{   
    public function getAuthUser()
    {
        $apiUser = Auth::guard('api')->user();
        $user    = User::where('email',$apiUser->email)->first();
        return $user;
    }
     
    public function isSubscribed(User $user)
    {
        return $user->subscribed('monthly') || $user->subscribed('yearly');
    }
    
    public function isNotsubscribed(User $user)
    {
        return !($user->subscribed('monthly') || $user->subscribed('yearly'));
    }
    
    public function isSubscribedToProduct(User $user, $id, $name)
    {
        return $user->subscribedToProduct($id, $name);
    }    
}

?>