<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    //User ACTION Policy Constant 
   const SUPERADMIN = 'superAdmin';
   const ADMIN = 'admin';
   const BAN = 'ban';
   const DELETE = 'delete';

   //User TAG Policy Constant
   const INDEXTAGS = 'indexTags';
   const SHOWTAGS  = 'showTags';
   const CREATETAGS = 'createTags';
   const UPDATETAGS = 'updateTags';
   const DELTETAGS = 'deleteTags';

   public function superAdmin(User $user): bool
   {
      return $user->isAdmin() || $user->isSuperAdmin();
   }

   public function admin(User $user): bool
   {
    return $user->isAdmin() || $user->isModerator();
   }

   public function ban(User $user, User $subject): bool
   {
     return ($user->isAdmin() && ! $subject->isAdmin()) ||
      ($user->isModerator() && ! $subject->isAdmin() && ! $subject->isModerator());
   }

   public function delete(User $user, User $subject): bool
   {
    return ($user->isAdmin() || $user->matches($subject)) && !$subject->isAdmin();
   }


   //User Tag Policy Set up
   public function indexTags(User $user)
   {
     return $user->isAdmin() || $user->superAdmin();
   }
}
