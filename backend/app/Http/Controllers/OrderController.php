<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
            'cartItems' => 'required|array',
            'payment_method' => 'string|in:card,cod',
        ]);

        $user = auth()->user();
        $totalAmount = 0;
        $orderItemsData = [];

        // Calculate total and prepare items data
        foreach ($request->cartItems as $itemId => $quantity) {
            if ($quantity > 0) {
                $product = \App\Models\Product::find($itemId);
                if ($product) {
                    $totalAmount += $product->new_price * $quantity;
                    $orderItemsData[] = [
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'price_at_purchase' => $product->new_price,
                    ];
                }
            }
        }

        if (empty($orderItemsData)) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $order = \App\Models\Order::create([
            'user_id' => $user ? $user->id : null, 
            'shipping_address' => $request->shipping_address,
            'total_amount' => $totalAmount,
            'status' => 'pending',
            'payment_method' => $request->payment_method ?? 'card',
        ]);

        foreach ($orderItemsData as $item) {
            $order->items()->create($item);
        }

        return response()->json(['message' => 'Order placed successfully', 'order_id' => $order->id], 201);
    }

    public function index()
    {
        // User's order history
        $orders = \App\Models\Order::where('user_id', auth()->id())->with('items.product')->orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }

    // Admin: Get all orders
    public function indexAll()
    {
        $orders = \App\Models\Order::with('items.product', 'user')->orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }

    // Admin: Update status
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string'
        ]);
        
        $order = \App\Models\Order::find($id);
        if ($order) {
            $order->status = $request->status;
            $order->save();
            return response()->json(['message' => 'Order status updated']);
        }
        return response()->json(['message' => 'Order not found'], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
