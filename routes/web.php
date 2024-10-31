<?php

use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\FitnessController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MedicationsController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\AddressBookController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('web.home');
Route::get('/notes', [NotesController::class, 'index'])->name('web.notes');
Route::get('/appointments', [AppointmentsController::class, 'index'])->name('web.appointments');
Route::get('/medications', [MedicationsController::class, 'index'])->name('web.medications');
Route::get('/fitness', [FitnessController::class, 'index'])->name('web.fitness');
Route::get('/addressbook', [AddressBookController::class, 'index'])->name('web.addressbook');
Route::post('/addressbook', [AddressBookController::class, 'store'])->name('store.addressbook');
