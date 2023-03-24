<?php

namespace App\Http\Controllers\Feed;

use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    public function index()
    {
       return TagResource::collection(
           Tag::all()->orderBy('id','DESC')
       );
    }

    public function show($id)
    {
        return response()->json([
           'tags' => Tag::findOrFail($id)
        ], 201);
    }
}
