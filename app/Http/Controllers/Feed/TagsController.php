<?php

namespace App\Http\Controllers\Feed;

use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    public function index()
    {
       return TagResource::collection(
           Tag::all()
       );
    }
 
    public function loadmorepost($id,$slug)
    {
        session()->put('loadmorepost',intval($id));
        return $this->show($slug);
    }

    public function show($slug = '')
    {
        $this->setLoadSession(session()->get('loadmorepost') ?? 4);

        function loadTagPost($count,$slug)
        {
            return Post::where('published_at','<=', new \Datetime())
                   ->whereHas('tagsRelation', function($query) use ($slug){
                   $query->where('tags.slug', $slug);
            })->paginate($count);
        }

        $route_slug = $slug == '' ? false : trim(strval($slug)) ;
            if (!$route_slug) {
                    return response()->json([
            'route_slug' => false
        ]);
            } else {
              try {

                 return response()->json([
                    'tags' => Tag::whereSlug($slug)->firstOrFail(),
                    'posts' => loadTagPost(session()
                                    ->get('loadmorepost'),$slug)
                                    ->map(function($data){
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
                                    }),
                    'morepages' => loadTagPost(session()->get('loadmorepost'),$slug)
                                  ->hasMorePages()
                 ], 201); 
              } catch (\Throwable $e) {
                 return response()->json([
                   'error' => $e->getMessage()
                 ]);
              }
            }


    }
    public function setLoadSession($count)
    {
        session()->put('loadmorepost',$count);
    }
}
