<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MembersController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('members', [MembersController::class, 'index']);
Route::post('members', [MembersController::class, 'store']);
Route::get('members/{id}', [MembersController::class, 'show']);
Route::get('members/{id}/edit', [MembersController::class, 'edit']);
Route::put('members/{id}/edit', [MembersController::class, 'update']);
Route::delete('members/{id}/delete', [MembersController::class, 'destroy']);