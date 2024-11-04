<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FitnessData;
use Inertia\Inertia;

class FitnessDataController extends Controller
{
    // Display the fitness data
    public function index()
    {
        // Fetch the fitness data for the authenticated user
        $fitnessData = FitnessData::where('user_id', auth()->id())->get();

        // Pass data to the Fitness view
        return Inertia::render('Fitness', ['data' => $fitnessData]);
    }

    // Store new fitness data
    public function store(Request $request)
    {
        // Step 1: Ensure the user is authenticated
        if (!auth()->check()) {
            // Redirect to login if not authenticated
            return redirect()->route('login')->with('error', 'Please log in to log your activity.');
        }

        // Step 2: Validate incoming request data
        $validatedData = $request->validate([
            'steps' => 'required|integer',
            'calories' => 'required|integer',
            'duration' => 'required|integer',
        ]);

        // Step 3: Create a new FitnessData record in the database
        FitnessData::create([
            'user_id' => auth()->id(),
            'steps' => $validatedData['steps'],
            'calories' => $validatedData['calories'],
            'duration' => $validatedData['duration'],
        ]);

        // Redirect back to the fitness page with success message
        return redirect()->route('fitness.index')->with('success', 'Activity logged successfully.');
    }
}
