<?php

declare(strict_types=1);

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\Locale;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('{lang?}')->middleware(Locale::class)->group(function () {
    Route::get('/', function () {
        return Inertia::render('Index');
    })->name('home');

    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->middleware(['auth', 'verified'])->name('profile.view');

    Route::middleware('auth')->group(function () {
        Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile/edit', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile/edit', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__.'/auth.php';
