<?php

use App\Http\Controllers\Settings\AppearanceController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::prefix('/settings')->group(function () {
        Route::prefix('/profile')->name('profile.')->group(function () {
            Route::get('/', [ProfileController::class, 'edit'])->name('edit');
            Route::post('/', [ProfileController::class, 'update'])->name('update');
        });

        Route::prefix('/password')->name('password.')->group(function () {
            Route::get('/', [PasswordController::class, 'edit'])->name('edit');
            Route::patch('/', [PasswordController::class, 'update'])
                ->middleware('throttle:5,1')
                ->name('update');
        });

        Route::get('/appearance', AppearanceController::class)->name('appearance');
    });
});
