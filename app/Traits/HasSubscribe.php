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
        $user    = User::where('email',Auth::guard('api')
                            ->user()->email)
                            ->first();
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
