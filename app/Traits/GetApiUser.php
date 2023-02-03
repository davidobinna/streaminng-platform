<?php
namespace App\Traits;



use App\Models\User;
use Illuminate\Support\Facades\Auth;

/**
 *
 */
trait GetApiUser
{
    public function getAuthUser()
    {
        $apiUser = Auth::guard('api')->user();
        $user    = User::where('email',$apiUser->email)->first();
        return $user;
    }

    public function isAdmin()
    {
         $user = $this->getAuthUser();
         return ($user->isAdmin() || $user->isWriter() || $user->isSuperAdmin());
    }

    public function isWriter()
    {
        $user = $this->getAuthUser();
        return $user->isWriter();
    }
}




?>
