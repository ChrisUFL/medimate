<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FitnessController extends Controller
{
    public function index()
    {
        return Inertia::render('Fitness');
    }
}
