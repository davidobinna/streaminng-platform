<?php

namespace App\Http\Controllers\Dash;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\TagUpdateRequest;
use App\Http\Resources\TagResource;
use App\Http\Resources\TaglistResource;
use App\Models\Tag;
use App\Models\User;
use App\Policies\UserPolicy;
use App\Services\SaveImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize(UserPolicy::INDEXTAGS, User::class);
        return TagResource::collection(
           Tag::query()->orderBy('id','desc')->paginate(10)
        );
    }

    public function taglist()
    {
        $this->authorize(UserPolicy::INDEXTAGS, User::class);
        return TaglistResource::collection(
            Tag::query()->orderBy('id','desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTagRequest $request)
    {

        $this->authorize(UserPolicy::CREATETAGS, User::class);
        $data = $request->validated();
        $tag = new Tag([
            'name' => $request->name(),
            'slug'  => Str::slug($request->name.'-'.now()->format('d-M-Y')),
            'description' => $request->description(),
        ]);
        SaveImageService::UploadImage(
            $request->image(),
             $tag,
              Tag::TABLE);
        $tag->save();
        return response(new TagResource($tag),201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->authorize(UserPolicy::SHOWTAGS, User::class);
        $tag = Tag::findOrfail($id);
        return new TagResource($tag);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TagUpdateRequest $request, $id)
    {
        $this->authorize(UserPolicy::UPDATETAGS, User::class);
        $tag = Tag::find($id);
        $data = $request->validated();
        $tag->update([
            'name' => $request->name(),
            'slug'  => Str::slug($request->name.'-'.now()->format('d-M-Y')),
            'description' => $request->description(),
        ]);

          return response(new TagResource($tag),201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize(UserPolicy::DELTETAGS, User::class);
        $tag = Tag::findOrfail($id);
        try {
              if (!is_null($tag->image)) {
                Storage::delete($tag->image);
              }
            $tag->delete();
            return response([
               'errors'  => false
            ]);
        } catch (\Throwable $e) {
           # code...
            return response([
               'errors'  => true,
               'message' => $e->getMessage()
            ]);
        }
    }
}
