<?php

use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//........All Public Endpoint Goes Here........//

Route::group(['middleware'=> ['cors', 'json.response']],function(){
    Route::post('/signup',[AuthController::class, 'register'])->name('signup.api');
    Route::post('/login',[AuthController::class, 'login'])->name('login.api');
});

//........All Protected Endpoint Goes Here........//

Route::group(['middleware' => ['cors', 'json.response','auth:api']], function(){
     Route::post('/logout',[AuthController::class, 'logout'])->name('logout.api');

});

//......Api User Resource Endpoint Goes Here.......//
Route::apiResource('users', Api\User\ResourceController::class)->only([
    'index','store','show','update','destroy'
])->middleware(['auth:api','cors']);
