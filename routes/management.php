<?php

use App\Http\Controllers\Management\PermissionController;
use App\Http\Controllers\Management\RoleController;
use App\Http\Controllers\Management\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('/roles')->name('roles.')->group(function () {
        Route::get('/', [RoleController::class, 'index'])->name('index');
        Route::post('/', [RoleController::class, 'store'])->name('store');

        Route::get('/datatable', [RoleController::class, 'datatable'])->name('datatable');
        
        Route::prefix('/{role}')->group(function () {
            Route::get('/', [RoleController::class, 'show'])->name('show');
            Route::patch('/', [RoleController::class, 'update'])->name('update');
            Route::delete('/', [RoleController::class, 'destroy'])->name('destroy');
        });
    });

    Route::prefix('/permissions')->name('permissions.')->group(function () {
        Route::get('/', [PermissionController::class, 'index'])->name('index');
        Route::post('/', [PermissionController::class, 'store'])->name('store');
        
        Route::get('/datatable', [PermissionController::class, 'datatable'])->name('datatable');

        Route::prefix('/{permission}')->group(function () {
            Route::get('/', [PermissionController::class, 'show'])->name('show');
            Route::patch('/', [PermissionController::class, 'update'])->name('update');
            Route::delete('/', [PermissionController::class, 'destroy'])->name('destroy');
        });
    });

    Route::prefix('/users')->name('users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');

        Route::get('/datatable', [UserController::class, 'datatable'])->name('datatable');
        
        Route::prefix('/{user}')->group(function () {
            Route::get('/', [UserController::class, 'show'])->name('show');
            Route::patch('/', [UserController::class, 'update'])->name('update');
        });
    });
});
