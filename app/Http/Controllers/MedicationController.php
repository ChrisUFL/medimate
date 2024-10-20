<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class MedicationController extends Controller
{
    public function index()
    {
        return Inertia::render('Medications');
    }
}
