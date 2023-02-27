<?php

namespace App\Http\Controllers\Dash;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\User;
use App\Policies\UserPolicy;
use App\Traits\GetApiUser;
use App\Services\SaveImageService;
use Illuminate\Http\Request;
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
        $post->syncTags($request->tags());
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
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
