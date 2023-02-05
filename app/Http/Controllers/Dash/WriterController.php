<?php

namespace App\Http\Controllers\Dash;

use App\Http\Controllers\Controller;
use App\Http\Resources\WriterResource;
use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Http\Request;

class WriterController extends Controller
{
    public function index() {

        $this->authorize(UserPolicy::SUPERADMIN, User::class);
        return WriterResource::collection(
          User::where('type',User::WRITER)->orderBy('created_at','desc')->paginate(5)
        );
    }
}
