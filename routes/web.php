<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return inertia('Home');
})->name('web.home');

Route::get('/notes', function () { return inertia('Notes'); })->name('web.notes');
Route::get('/appointments', function () { return inertia('Appointments'); })->name('web.appointments');
Route::get('/medications', function () { return inertia('Medications'); })->name('web.medications');
Route::get('/fitness', function () { return inertia('Fitness'); })->name('web.fitness');