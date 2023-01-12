<?php

namespace App\Models;

use App\Models\Post;
use App\Models\Profile;
use App\Traits\ModelHelpers;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use ModelHelpers;
    use Billable;

    const DEFAULT = 1;
    const MODERATOR = 2;
    const WRITER = 3;
    const ADMIN = 4;
    const SUPERADMIN = 5;

    const TABLE = 'users';
    protected $table = self::TABLE;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'joined'.
        'type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'joined'  =>'datetime',
    ];

     /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
   /* protected $appends = [
        'profile_photo_url',
    ]; */


    public function id():int
    {
        return $this->id;
    }

    public function name():string
    {
        return $this->name;
    }

     public function emailAddress():string
     {
        return $this->email;
     }

     public function type():int
     {
        return (int) $this->type;
     }


    public function isModerator():bool
    {
        return $this->type() === self::MODERATOR;
    }

    public function isWriter():bool
    {
        return $this->type() === self::WRITER;
    }

    public function isSuperAdmin(): bool
    {
        # code...
        return $this->type() === self::SUPERADMIN;
    }

    public function isAdmin():bool
    {
        return $this->type() === self::ADMIN;
    }
    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    public function posts()
    {
        # code...
        return $this->postRelation;
    }

    public function postRelation(): HasMany
    {
        # code..
        return $this->hasMany(Post::class, 'author_id');
    }
}
