<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProviderController extends Controller
{
    public function index()
    {
        return Inertia::render('Provider/Home');
    }
}
