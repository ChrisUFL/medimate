<?php

use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\FitnessController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MedicationsController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('web.home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/notes', [NotesController::class, 'index'])->name('web.notes');
Route::get('/appointments', [AppointmentsController::class, 'index'])->name('web.appointments');
Route::get('/medications', [MedicationsController::class, 'index'])->name('web.medications');
Route::get('/fitness', [FitnessController::class, 'index'])->name('web.fitness');

require __DIR__.'/auth.php';
