<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                ->letters()
                ->symbols()
            ]
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success'   => false,
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
            'success'     => true,
            'token'       => $token,
            'status'      => 200,
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    =>  'required|string|email|max:255',
            'password' =>  [
                'required',
                Password::min(8)
                ->letters()
                ->symbols()
            ]
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success'     => false,
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
                    'name'        => $user->name,
                    'success'     => true,
                    'token'       => $token,
                    'status'      => 200,
                 ]);
             } else {
                return response()->json([
                    'success'     => false,
                    'errors'  => 'Incorrect Password',
                    'status'  => 422
                ]);
             }

        } else {
            return response()->json([
                'success'     => false,
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
            'success'     => true,
            'status'   => 200,
         ]);
    }

}
