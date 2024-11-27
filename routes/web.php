<?php

use App\Http\Controllers\AddressBookController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\CalendarEventController;
use App\Http\Controllers\Company\ChartsController;
use App\Http\Controllers\Company\PatientController;
use App\Http\Controllers\FitnessController;
use App\Http\Controllers\FitnessDataController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MedicationController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Provider\AppointmentController as ProviderAppointments;
use App\Http\Controllers\Provider\DashboardController;
use App\Http\Middleware\EmployeeMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('web.home');
Route::middleware('auth')->group(static function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/appointments', [AppointmentController::class, 'index'])->name('web.appointments');
    Route::get('/medications', [MedicationController::class, 'index'])->name('web.medications');
    Route::get('/fitness', [FitnessController::class, 'index'])->name('web.fitness');

    // Routes for handling fitness data (fetch and store)
    Route::get('/fitness-data', [FitnessDataController::class, 'index'])->name('fitness.index');
    Route::post('/fitness-data', [FitnessDataController::class, 'store'])->name('fitness.store');
    Route::get('/fitness-dashboard', [FitnessDataController::class, 'dashboard'])->name('fitness.dashboard');
    Route::resource('notes', NoteController::class);
    Route::resource('reminder', CalendarEventController::class);
    Route::get('/addressbook', [AddressBookController::class, 'index'])->name('web.addressbook');
    Route::post('/addressbook', [AddressBookController::class, 'store'])->name('store.addressbook');
    Route::delete('/addressbook', [AddressBookController::class, 'delete']);
});

Route::middleware([
    'auth',
    EmployeeMiddleware::class,
])->group(static function () {
    Route::get('/provider', [DashboardController::class, 'index'])->name('web.provider');
    Route::resource('/provider/appointments', ProviderAppointments::class);
    Route::resource('/provider/patients', PatientController::class);
    Route::post('/chart', [ChartsController::class, 'store'])->name('chart-entry.store');
    Route::patch('/chart/{id}', [ChartsController::class, 'update'])->name('chart-entry.update');
});

//Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');

require __DIR__.'/auth.php';
