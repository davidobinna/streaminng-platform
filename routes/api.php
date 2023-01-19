<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Pages\MembershipController;
use App\Http\Controllers\Stripe\PaymentController;
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

//........Public Auth Endpoint Goes Here........//
Route::group(['middleware'=> ['cors', 'json.response']],function(){
    Route::post('/signup',[AuthController::class, 'register'])->name('signup.api');
    Route::post('/login',[AuthController::class, 'login'])->name('login.api');
});
//........ Protected Auth Endpoint Goes Here........//
Route::group(['middleware' => ['cors', 'json.response','auth:api']], function(){
     Route::post('/logout',[AuthController::class, 'logout'])->name('logout.api');
});


//-----Public Membership Point Goes here -------??
Route::group(['middleware' => ['cors', 'json.response']], function(){
    Route::get('/membership',[MembershipController::class, 'index'])->name('membership.api');
});

//-----Public Stripe Endpoint Goes here -------??
Route::group(['middleware' => ['cors', 'json.response','auth:api']], function(){
    Route::get('/payments', [PaymentController::class, 'index'])->name('payments');
    Route::post('/payments', [PaymentController::class, 'store'])->name('payments.store');
});


//......All User Resource Endpoint Goes Here.......//
Route::apiResource('/users', Dash\ResourceController::class)->only([
    'index','store','show','update','destroy'])->middleware(['cors', 'json.response','auth:api','isAdmin']);
