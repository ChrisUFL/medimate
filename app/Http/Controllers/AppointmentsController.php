<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AppointmentsController extends Controller
{
    public function index()
    {
        return Inertia::render('Appointments');
    }
}
