<?php

namespace App\Http\Controllers\Feed;

use App\Http\Controllers\Controller;
use App\Http\Resources\FeedResource;
use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FeedController extends Controller
{
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
                    'published_at' => $data->published_at->format('d-M-Y'),
                    'author_id'  => $data->authorRelation->id,
                    'author_name'  => $data->authorRelation->name,
                    'author_image' => $data->authorRelation->profile_photo_path
                ];

            })
       , 'morepages' => loadlatest(session()->get('loadmore'))->hasMorePages() ], 201);

        // return response(['posts' => loadlatest(session()->get('loadmore'))->hasMorePages()], 201);

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
        //
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
