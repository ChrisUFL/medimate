<?php

namespace App\Http\Controllers\ProviderControllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Provider/Appointments/Index');
    }

    public function create()
    {
        return Inertia::render('Provider/Appointments/Create');
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
        return Inertia::render('Provider/Appointments/Show');
    }

    public function edit($id)
    {
        return Inertia::render('Provider/Appointments/Edit');
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }
}
