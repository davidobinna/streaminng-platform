<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->sentence();

        return [
            //
            'title'          => $title,
            'slug'           => Str::slug($title.'-'. now()->getPreciseTimestamp(4)),
            'body'           => $this->faker->text,
            'author_id'      => $attribute['author_id'] ?? User::factory(),
            'image'          => 'public/posts/stock-'.$this->faker->randomElement(['one','two','three','four','five']).'.jpg',
            'published_at'   => now(),
            'type'           => $this->faker->randomElement(['standard','premium']),
            'is_commentable' => rand(0,1)
        ];
    }
}
