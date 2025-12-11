<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = \App\Models\Product::all();
        // Transform image path to full URL if it's not already a URL
        $products->transform(function ($product) {
            if (!filter_var($product->image, FILTER_VALIDATE_URL)) {
                // If it's a local path, flattened logic:
                // Regardless of what folder the DB says (storage/products/...), 
                // we serve the file from matching filename in public/images/
                $filename = basename($product->image);
                $product->image = asset('images/' . $filename);
            }
            return $product;
        });
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'new_price' => 'required|numeric',
            'old_price' => 'required|numeric',
            'image' => 'required|string', // Changed to string for URL
        ]);

        $product = Product::create([
            'name' => $request->name,
            'category' => $request->category,
            'new_price' => $request->new_price,
            'old_price' => $request->old_price,
            'image' => $request->image,
        ]);

        return response()->json([
            'message' => 'Product added successfully',
            'product' => $product
        ], 201);
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:products,id'
        ]);

        $product = Product::find($request->id);
        $product->delete();

        return response()->json(['message' => 'Product removed successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = \App\Models\Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        if ($product->image && !filter_var($product->image, FILTER_VALIDATE_URL)) {
             $filename = basename($product->image);
             $product->image = asset('images/' . $filename);
        }
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    // Old methods removed to prevent conflict
}
