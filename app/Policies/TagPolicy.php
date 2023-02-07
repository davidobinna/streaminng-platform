<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TagPolicy
{
    use HandlesAuthorization;

    const TAGS = 'tags';

    public function tags(User $user)
    {
       return $user->isAdmin();
    }
}
