<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function (Request $request) {
    return $request->user() 
            ? redirect()->route('dashboard') 
            : redirect()->route('login');
})->name('index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

include __DIR__."/auth.php";
include __DIR__."/management.php";
include __DIR__."/settings.php";
