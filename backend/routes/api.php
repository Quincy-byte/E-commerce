<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

use App\Http\Controllers\AuthController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

use App\Http\Controllers\OrderController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/placeorder', [OrderController::class, 'store']);
    Route::post('/userorders', [OrderController::class, 'index']);
    Route::post('/addproduct', [ProductController::class, 'store']);
    Route::post('/removeproduct', [ProductController::class, 'destroy']);
    Route::get('/allorders', [OrderController::class, 'indexAll']);
    Route::post('/status/{id}', [OrderController::class, 'updateStatus']);
});
