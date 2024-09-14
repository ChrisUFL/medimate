<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class MedicationsController extends Controller
{
    public function index()
    {
        return Inertia::render('Medications');
    }
}
