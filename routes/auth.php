<?php

use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::prefix('/login')->group(function () {
        Route::get('/', [AuthenticationController::class, 'index'])->name('login');
        Route::post('/', [AuthenticationController::class, 'store']);
    });

    Route::prefix('/register')->group(function() {
        Route::get('/', [RegistrationController::class, 'index'])->name('register');
        Route::post('/', [RegistrationController::class, 'store']);
    });

    Route::name('password.')->group(function () {
        Route::prefix('/forgot-password')->group(function () {
            Route::get('/', [ForgotPasswordController::class, 'index'])->name('request');
            Route::post('/', [ForgotPasswordController::class, 'store'])->name('email');
        });

        Route::prefix('/reset-password')->group(function () {
            Route::get('/{token}', [PasswordResetController::class, 'create'])->name('reset');
            Route::post('/', [PasswordResetController::class, 'store'])->name('store');
        });
    });
});

Route::middleware('auth')->group(function () {
    Route::prefix('/email/verify')->name('verification.')->group(function () {
        Route::get('/', [EmailVerificationController::class, 'index'])->name('notice');

        Route::post('/', [EmailVerificationController::class, 'store'])
            ->middleware(['throttle:5,1'])
            ->name('send');

        Route::get('/{id}/{hash}', [EmailVerificationController::class, 'update'])
            ->middleware(['signed', 'throttle:5,1'])
            ->name('verify');
    });

    Route::post('/logout', [AuthenticationController::class, 'destroy'])->name('logout');
});
