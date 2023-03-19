<?php
namespace App\Models;


use App\Traits\HasAuthor;
use App\Traits\HasCommentable;
use App\Traits\HasReplies;
use App\Traits\ModelHelpers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Str;

class Comment extends Model
{
    use HasFactory;
    use HasAuthor;
    use ModelHelpers;
    use HasCommentable;
    use HasReplies;

    const TABLE = 'comments';

    protected $table = self::TABLE;

    protected $fillable = [
        'body',
        'parent_id',
        'depth',
    ];
  
    protected $with = [
        'authorRelation',
        'repliesRelation'
    ];

    public function id(): int
    {
        return $this->id;
    }

    public function body(): string
    {
        return $this->body;
    }

    public function parentId():string
    {
        return $this->parent_id;
    }

    public function excerpt(int $limit = 100): string
    {
        return Str::limit($this->body(), $limit);
    }

}
