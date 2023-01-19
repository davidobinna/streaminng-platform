<?php
namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Http\Resources\MembershipResource;
use App\Models\Plan;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function index()
    {
        try {
            $plan = MembershipResource::collection(
                Plan::all()
             );
           return response([
            'success' => true,
            'record'  => $plan
           ]); 
        } catch (\Throwable $e) {
           return response()->json([
            'success' => false,
            'errors'  => $e->getMessage()
           ]);
        }
    }
}
