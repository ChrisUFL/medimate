<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\FitnessController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MedicationController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProviderControllers\DashboardController;
use App\Http\Controllers\ProviderControllers\PatientController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProviderControllers\AppointmentController as ProviderAppointments;

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

Route::get('/provider', [DashboardController::class, 'index'])->name('web.provider');
Route::resource('/provider/appointments', ProviderAppointments::class);
Route::resource('/provider/patients', PatientController::class);

require __DIR__.'/auth.php';
