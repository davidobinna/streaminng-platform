<?php

namespace App\Http\Controllers\Feed;

use App\Http\Controllers\Controller;
use App\Http\Resources\FeedResource;
use App\Models\Plan;
use App\Models\Post;
use App\Traits\HasSubscribe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FeedController extends Controller
{

    use HasSubscribe;

    public $count = 2 ;

    public function loadmore($id)
    {
        session()->put('loadmore',intVal($id));

        return  $this->index();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         $this->setLoadSession(session()->get('loadmore') ?? 4);

        function loadlatest($count = 4)
        {
           return  Post::whereNotNull('published_at')
                    ->where('published_at','<=', new \Datetime())
                    ->latest()
                    ->paginate($count);
        }


          return response()->json([
            'posts' => loadlatest(session()->get('loadmore'))->map(function($data){
                return [
                    'id'    => $data->id(),
                    'title' => $data->title(),
                    'slug'  => $data->getRouteKeyName(),
                    'image' => $data->coverimage(),
                    'type'   => $data->type(),
                    'published_at' => $data->published_at->format('d F Y'),
                    'author_id'  => $data->authorRelation->id,
                    'author_name'  => $data->authorRelation->name,
                    'author_image' => $data->authorRelation->profile_photo_path
                ];

            })
       , 'morepages' => loadlatest(session()
                            ->get('loadmore'))
                            ->hasMorePages() ], 201);

    }

       public function setLoadSession($count)
       {
            session()->put('loadmore',$count);
       }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
         $data  = Post::findOrfail($id);

         return response()->json([
            'id'        => $data->id(),
            'image'     => $data->coverimage(),
            'tag_name'  => $data->tags()->pluck('name'),
            'title'     => $data->title(),
            'type'   => $data->type(),
            'author_image' => $data->author()->profile_photo_path,
            'author_name'  => $data->author()->name,
            'published_at' => $data->published_at->format('d F Y'),
            'body_content' => $data->body(),
            'body_excerpt' => $data->excerpt(),
            'is_commnetable' => $data->isCommentable(),
            'plan'         => [
                'subscribed' => $this->isSubscribed(
                                $this->getAuthUser()),
                'notsubscribed' => $this->isNotsubscribed(
                                $this->getAuthUser())
            ]
         ]);
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
