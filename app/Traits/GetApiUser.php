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
        $user    = User::where('email',Auth::guard('api')
                        ->user()->email)
                        ->first();
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
