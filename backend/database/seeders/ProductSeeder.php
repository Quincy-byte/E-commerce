<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define the source directory for images (Frontend)
        $sourceDir = base_path('../src/Components/Assets');
        // Target is public/images directly
        $targetDir = public_path('images');

        // Ensure target directory exists
        if (!File::exists($targetDir)) {
            File::makeDirectory($targetDir, 0755, true);
        }

        $products = [
              [
                "id" => 1,
                "name" => "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
                "category" => "women",
                "image_file" => "product_1.png",
                "new_price" => 50.0,
                "old_price" => 80.5,
              ],
              [
                "id" => 2,
                "name" => "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
                "category" => "women",
                "image_file" => "product_2.png",
                "new_price" => 85.0,
                "old_price" => 120.5,
              ],
        ];
        
        // Generate full product list (1-36) based on patterns
        $all_products = [];
        
        // Women (1-12)
        for ($i = 1; $i <= 12; $i++) {
            $all_products[] = [
                'id' => $i,
                'name' => "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
                'category' => "women",
                'image_file' => "product_{$i}.png",
                'new_price' => ($i === 1) ? 50.0 : (($i === 3) ? 60.0 : (($i === 4) ? 100.0 : 85.0)),
                'old_price' => ($i === 1) ? 80.5 : (($i === 3) ? 100.5 : (($i === 4) ? 150.0 : 120.5)),
            ];
        }
        
        // Men (13-24)
        for ($i = 13; $i <= 24; $i++) {
            $all_products[] = [
                'id' => $i,
                'name' => "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
                'category' => "men",
                'image_file' => "product_{$i}.png",
                'new_price' => 85.0,
                'old_price' => 120.5,
            ];
        }

        // Kids (25-36)
        for ($i = 25; $i <= 36; $i++) {
            $all_products[] = [
                'id' => $i,
                'name' => "Boys Orange Colourblocked Hooded Sweatshirt",
                'category' => "kid",
                'image_file' => "product_{$i}.png",
                'new_price' => 85.0,
                'old_price' => 120.5,
            ];
        }

        foreach ($all_products as $product) {
            // Copy Image
            $sourcePath = $sourceDir . '/' . $product['image_file'];
            $targetPath = $targetDir . '/' . $product['image_file'];
            
            if (File::exists($sourcePath)) {
                File::copy($sourcePath, $targetPath);
                $imagePath = $product['image_file']; 
            } else {
                $imagePath = null;
            }

            DB::table('products')->insertOrIgnore([
                'id' => $product['id'],
                'name' => $product['name'],
                'category' => $product['category'],
                'image' => $imagePath, // using 'image' column as defined in migration
                'new_price' => $product['new_price'],
                'old_price' => $product['old_price'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
