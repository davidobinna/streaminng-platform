<?php
namespace App\Services;

use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class SaveImageService
{
    public static function UploadImage($image, $model, $folder)
    {
        $path = Storage::putFile('public/' .$folder, new File($image));
        $targetPath = storage_path('app/' . $path); 
        Image::make($image)->resize(1200, 630)->save($targetPath);
        $model->image = $path;
        $model->save();
    }
}
