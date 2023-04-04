<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticlesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
});
Route::get(
    '/find-by-name',
    [App\Http\Controllers\ArticlesController::class, 'findByName']
    )->name('findByName');
Route::get('index', [ArticlesController::class, 'index'])->name('index');
Route::get('create', [ArticlesController::class, 'create'])->name('create');
Route::post('store', [ArticlesController::class, 'store'])->name('store');
Route::get('detail', [ArticlesController::class, 'detail'])->name('detail');
Route::get('back', [ArticlesController::class, 'back'])->name('back');