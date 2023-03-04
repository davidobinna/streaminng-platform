<?php

namespace App\Http\Controllers\Dash;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use App\Policies\UserPolicy;
use App\Services\SaveImageService;
use App\Traits\GetApiUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    use GetApiUser;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if ($this->isWriter()) {
             return PostResource::collection(
                Post::where('author_id', $this->getAuthUser()->id())->paginate(5)
             );
        } else {
            $this->authorize(UserPolicy::INDEXPOSTS, User::class);
            return PostResource::collection(
               Post::query()->orderBy('id','desc')->paginate(10)
            );
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        $this->authorize(UserPolicy::CREATEPOSTS, User::class);
        $data = $request->validated();
        $post = new Post([
        'title'                => $request->title(),
        'body'                 => $request->body(),
        'slug'                 => Str::slug($request->title.'-'.now()->format('d-M-Y')),
        'published_at'         => $request->publishedAt(),
        'type'                 => $request->type(),
        'photo_credit_text'    => $request->photoCreditText(),
        'photo_credit_link'    => $request->photoCreditLink(),
        'is_commentable'       => $request->isCommentable() ? true : false,
        ]);

        $image = $request->image();
        $post->authoredBy($request->author());
        $post->syncTags($request->get('tags'));
        SaveImageService::UploadImage($image, $post, Post::TABLE);
        $post->save();
        return response(new PostResource($post), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->authorize(UserPolicy::SHOWPOSTS, User::class);
        $post = Post::findOrfail($id);
        return response()->json([
            'id'             => $post->id(),
            'title'          => $post->title(),
            'body'           => $post->body(),
            'type'           => $post->type(),
            'is_commentable' => $post->isCommentable(),
            'tag_name'       => $post->tags()->pluck('name'),
            'postselectedtags'   => $post->tags()->pluck('id'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostRequest $request, $id)
    {
        $post = Post::findOrfail($id);
        //UPDATEPOST
        $this->authorize(UserPolicy::UPDATEPOST, User::class);
        $data = $request->validated();

        $post->update([
            'title'                => $request->title(),
            'body'                 => $request->body(),
            'slug'                 => Str::slug($request->title.'-'.now()->format('d-M-Y')),
            'type'                 => $request->type(),
            'is_commentable'       => $request->isCommentable() ? true : false,
        ]);

        $post->syncTags($request->get('tags'));
        $post->save();

        return response(new PostResource($post), 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::findOrfail($id);
        $this->authorize(UserPolicy::UPDATEPOST, User::class);

        try {
            $tags = DB::table('taggables')
                            ->select('tag_id')
                            ->where('taggable_id',$post->id)
                            ->pluck('tag_id');
                            if (!is_null($post->image)) {
                                Storage::delete($post->image);
                           }
                        $post->removeTags($tags);
                       $post->delete();
            return response([
                'errors' => false,
            ]);
        } catch (\Throwable $e) {
            return response([
                'errors' => true,
                'message' => $e->getMessage(),
            ]);
        } 
    }

          /*      $tags = DB::table('taggables')
            ->select('tag_id')
            ->where('taggable_id',$post->id)->get();

            function gettags($tags)
            {
                $final = [];
                  $tags->each(function($object) use ($final){
                    array_push($final, $object->tag_id);
                   
                 });
                return $final;
            }

    return response(gettags($tags),201);   */
}
