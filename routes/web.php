<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\FitnessController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MedicationController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProviderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('web.home');

Route::middleware('auth')->group(static function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/appointments', [AppointmentController::class, 'index'])->name('web.appointments');
    Route::get('/medications', [MedicationController::class, 'index'])->name('web.medications');
    Route::get('/fitness', [FitnessController::class, 'index'])->name('web.fitness');
    Route::resource('notes', NoteController::class);
});

require __DIR__.'/auth.php';

Route::get('/provider', [ProviderController::class, 'index'])->name('web.provider');
