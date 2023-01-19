<?php

namespace App\Http\Controllers\Stripe;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class PaymentController extends Controller
{
    public function index()
    {
            $user = Auth::guard('api')->user();
            $intent = $user->createSetupIntent();

            $authUser = User::where('email',$user->email)->first();

        try {
           return response([
            'success' => true,
            'data'  => [
                'intent'  => $intent,
                'name'   => $authUser->name() ?? '',
                'email'  => $authUser->emailAddress() ?? '',
                'line1'  => $authUser->lineOne() ?? '',
                'line2'  => $authUser->lineTwo() ?? '',
                'city'   => $authUser->city() ?? '',
                'state'  => $authUser->state() ?? '',
                'country'=> $authUser->country() ?? '',
                'postal_code' => $authUser->postalCode() ?? '',
                'card_name'   => $authUser->name() ?? '',
            ]
           ]);
        } catch (\Throwable $e) {
           return response()->json([
            'success' => false,
            'errors'  => $e->getMessage()
           ]);
        }

    }

    public function store(Request $request)
     {
        $user = Auth::guard('api')->user();
        $authUser = User::where('email',$user->email)->first();

       try {

        $paymentMethod = $request->get('payment_method');

        $authUser->update([
         'line1'       => $request->get('line1'),
         'line2'       => $request->get('line2'),
         'city'        => $request->get('city'),
         'state'       => $request->get('state'),
         'country'     => $request->get('country'),
         'postal_code' => $request->get('postal_code'),
        ]);

       $plan = Plan::where('stripe_name',$request->get('plan'))->first();

       $user->newSubscription($plan->stripe_name,$plan->stripe_price_id)->create($paymentMethod);

       return response([
            'success' => true,
            'message' => 'thank you for subscribing!',
       ]);
       } catch (\Throwable $e) {
        return response([
            'success' => false,
            'errors' => 'An error Ocurred! '.$e->getMessage(),
       ]);
       }
     }
}
