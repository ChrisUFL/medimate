<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Appointments');
    }
}
