<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class NotesController extends Controller
{
    public function index()
    {
        return Inertia::render('Notes');
    }
}
