<?php
namespace App\Http\Controllers\Dash;


use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         return UserResource::collection(
            User::query()->orderBy('id','desc')->paginate()
         );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
          $data = $request->validated();
          $data['password'] = Hash::make($data['password']);
          $user = User::create($data);
          return response(new UserResource($user),201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
         return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
              $data = $request->validated();
              if ($data['password']) {
                  $data['password'] = Hash::make($data['password']);
              }
              $updated = $user->fill($data)->save();

              return new UserResource($user);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
         try {
             $user = User::find($id);
             $user->delete();
             return response([
                'message' => 'user deleted sucessfully',
                'status'  => 200
             ]);
         } catch (\Throwable $e) {
            # code...
             return response([
                'message' => $e->getMessage(),
             ]);
         }
    }
}
