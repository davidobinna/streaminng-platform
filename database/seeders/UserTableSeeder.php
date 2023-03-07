<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

      //--------------Admins-------------\\
    User::factory()->create([
        'name'     => 'Administrator',
        'email'    => 'admin@example.com',
        'password' => Hash::make('password'),
        'type'     => User::ADMIN,
     ])->profile()->save(Profile::factory()->make());

     //--------------Writers-------------\\
     User::factory()->create([
        'name'     => 'David Obi',
        'email'    => 'davidobi@example.com',
        'password' => Hash::make('password'),
        'type'     => User::WRITER
     ])->profile()->save(Profile::factory()->make());

     User::factory()->create([
        'name'     => 'Joy Obi',
        'email'    => 'joyobi@example.com',
        'password' => Hash::make('password'),
        'type'     => User::WRITER
     ])->profile()->save(Profile::factory()->make());

     User::factory()->create([
        'name'     => 'Mike Obi',
        'email'    => 'mikeobi@example.com',
        'password' => Hash::make('password'),
        'type'     => User::WRITER
     ])->profile()->save(Profile::factory()->make());

     User::factory()->create([
        'name'     => 'Chika Obi',
        'email'    => 'chikaobi@example.com',
        'password' => Hash::make('password'),
        'type'     => User::WRITER
     ])->profile()->save(Profile::factory()->make());

     //---------------Moderator--------------\\
     User::factory()->create([
        'name'     => 'Moderator',
        'email'    => 'mod@example.com',
        'password' => Hash::make('password'),
        'type'     => User::MODERATOR,
     ])->profile()->save(Profile::factory()->make());


     //--------------Default Users----------------\\
     User::factory()->create([
        'name'     => 'User One',
        'email'    => 'userone@example.com',
        'password' => Hash::make('password'),
        'type'     => User::DEFAULT,
     ])->profile()->save(Profile::factory()->make());

     User::factory()->create([
        'name'     => 'User Two',
        'email'    => 'usertwo@example.com',
        'password' => Hash::make('password'),
        'type'     => User::DEFAULT,
     ])->profile()->save(Profile::factory()->make());


     User::factory(10)->create()->each(function($user){
       $user->profile()->save(Profile::factory()->make());
     });
   }
}
