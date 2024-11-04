<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FitnessData;
use Inertia\Inertia;

class FitnessDataController extends Controller
{
    public function index()
    {
        $fitnessData = FitnessData::where('user_id', auth()->id())->orderBy('created_at', 'asc')->get();
        return Inertia::render('Fitness', ['data' => $fitnessData]);
    }

    public function dashboard()
    {
        $fitnessData = FitnessData::where('user_id', auth()->id())->orderBy('created_at', 'asc')->get();
        return Inertia::render('FitnessDashboard', ['data' => $fitnessData]);
    }

    public function store(Request $request)
    {
        if (!auth()->check()) {
            return redirect()->route('login')->with('error', 'Please log in to log your activity.');
        }

        $validatedData = $request->validate([
            'steps' => 'required|integer',
            'calories' => 'required|integer',
            'duration' => 'required|integer',
        ]);

        FitnessData::create([
            'user_id' => auth()->id(),
            'steps' => $validatedData['steps'],
            'calories' => $validatedData['calories'],
            'duration' => $validatedData['duration'],
        ]);

        return redirect()->route('fitness.index')->with('success', 'Activity logged successfully.');
    }
}
