<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\Tag;
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

   //User Post Policy Constant
   const INDEXPOSTS  = 'indexPosts';
   const SHOWPOSTS   = 'showPosts';
   const CREATEPOSTS = 'createPosts';
   const UPDATEPOST  = 'updatePosts';
   const DELETEPOST  = 'deletePosts';


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
   public function createTags(User $user)
   {
    return $user->isAdmin() || $user->isSuperAdmin();
   }
   public  function showTags(User $user)
   {
    return $user->isAdmin() || $user->isSuperAdmin();
   }
   public function updateTags(User $user)
   {
    return $user->isAdmin() || $user->isSuperAdmin();

   }
   public function deleteTags(User $user)
   {
    return $user->isAdmin() || $user->isSuperAdmin();
   }


   //User Post Policy Set up
public function indexposts(User $user)
{
    return $user->isAdmin() ||  $user->isSuperAdmin() || $user->isWriter() || $user->isDefault();

}

public function showPosts(User $user)
{
    return $user->isAdmin() || $user->isSuperAdmin() || $user->isWriter();
}

public function createPosts(User $user)
{
    return $user->isAdmin() || $user->isSuperAdmin() || $user->isWriter();
}

public function updatePosts(User $user, Post $post)
{
    return $user->isAdmin() || $user->isSuperAdmin() || $post->isAuthoredBy($user);

}

public function deletePosts(User $user, Post $post)
{
    return $user->isAdmin() || $user->isSuperAdmin() || $post->isAuthoredBy($user);

}

}
