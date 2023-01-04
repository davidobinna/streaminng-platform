<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors'    => $validator->errors(),
                'status'    =>  422
            ]);
        }

        $password['password'] = Hash::make($request->get('password'));
        $user = User::create([
            'name'     => $request->get('name'),
            'email'    => $request->get('email'),
            'password' => $password['password']
        ]);

        $token = $user->createToken(Str::random(5))->accessToken;
        return response()->json([
            'message'     => 'Account Created!',
            'token'       => $token,
            'status'      => 200,
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    =>  'required|string|email|max:255',
            'password' =>  'required|string|min:6 ',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors'   => $validator->errors(),
                'status'   =>  422
            ]);
        }

        $user = User::where('email',$request->email)->first();
        if ($user) {
            # code...
             if (Hash::check($request->password,$user->password)) {
                # code...
                 $token = $user->createToken(Str::random(5))->accessToken;
                 return response()->json([
                    'message'     => 'Welcome Back!',
                    'token'       => $token,
                    'status'      => 200
                 ]);
             } else {
                return response()->json([
                    'errors'  => 'Incorrect Password',
                    'status'  => 422
                ]);
             }

        } else {
            return response()->json([
                'errors' => 'Incorrect Email Address',
                'status' => 422
            ]);
        }
    }

    public function logout(Request $request)
    {
        # code...
         $token = $request->user()->token();
         $token->revoke();

         return response()->json([
            'message'  => 'You\'re Logged Out!',
            'status'   => 200,
         ]);
    }

}
