<?php

namespace App\Models;

use App\Casts\TitleCast;
use App\Contracts\CommentAble;
use App\Traits\HasAuthor;
use App\Traits\HasComments;
use App\Traits\HasTags;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model implements CommentAble
{
    use HasFactory;
    use HasAuthor;
    use HasTags;
    use HasComments;

    const TABLE = 'posts';

    protected $table = self::TABLE;

    protected $fillable = [
        'title',
        'body',
        'slug',
        'image',
        'published_at',
        'type', // Standard Post For free Members & Subscription for Premium post
        'photo_credit_text',
        'photo_credit_link',
        'is_commentable',
        'author_id',
    ];

      //Eager Load the relationships
    protected $with = [
        'authorRelation',
        'commentsRelation',
        'tagsRelation',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'title' => TitleCast::class,
        'is_commentable' => 'boolean',
   ];


   public function id(): int
    {
       return $this->id ;
    }

    public function title(): string
    {
       return $this->title;
    }

    public function body(): string
    {
       return $this->body;
    }

    public function type():string
    {
        return $this->type;
    }

    public function excerpt(int $limit = 250):string
    {
        return Str::limit(strip_tags($this->body(), $limit));
    }

    public function coverimage(): string
    {
        return $this->image;
    }

    public function isCommentable(): bool
    {
        return $this->is_commentable;
    }

    public function readTime()
    {
        $minutes = round(str_word_count(strip_tags($this->body())) / 200);
        return $minutes == 0 ? '1 minute(s)' : $minutes.' minute(s)';
    }

    public function commentAbleTitle(): string
    {
        return $this->title();
    }

    public function getRouteKeyName()
    {
      return 'slug';
    }

}
