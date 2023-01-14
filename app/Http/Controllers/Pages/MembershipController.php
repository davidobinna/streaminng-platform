<?php
namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function index()
    {
        try {
           $plan = Plan::all();
           
           foreach($plan as $val){
             $plans['name'] = $val->name();
             $plans['price'] = $val->price();
             $plans['abbreviation']  = $val->abbreviation();
             $plans['plan'] = $val->stripeName();
         }        
           return response()->json([
             'plans'   => $plans,
             'success' => true
           ]);
        } catch (\Throwable $e) {
           return response()->json([
            'success' => false,
            'errors'  => $e->getMessage()
           ]);
        }
    }
}
