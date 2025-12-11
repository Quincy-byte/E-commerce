<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'category',
        'image',
        'new_price',
        'old_price',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        // If image is a full URL, return it.
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }
        
        // Flatten path: ignore database folder storage/..., use public/images/ + filename
        return asset('images/' . basename($this->image));
    }
}
