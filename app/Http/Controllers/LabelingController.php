<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class LabelingController extends Controller
{
    public function index(Request $request)
    {
        $medicationName = $request->input('medicationName', '');
        $labelingInfo = null;
        $error = null;

        // Fetch data from FDA API if medication name is provided
        if ($medicationName) {
            $url = 'https://api.fda.gov/drug/label.json';
            $response = Http::get($url, [
                'search' => 'spl_product_data_elements:' . urlencode($medicationName),
                'limit' => 1,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['results'][0])) {
                    $labelingInfo = $data['results'][0];
                } else {
                    $error = 'No results found.';
                }
            } else {
                $error = 'Error fetching data from FDA API.';
            }
        }

        // Pass the data to the Inertia view
        return Inertia::render('Medications', [
            'labelingInfo' => $labelingInfo,
            'error' => $error,
            'medicationName' => $medicationName,  // Pass the medication name back to the frontend
        ]);
    }

    // You could also create a method to handle generating a summary using OpenAI
    public function generateSummary(Request $request)
    {
        $indications_and_usage = $request->input('indications_and_usage');
        $adverse_reactions = $request->input('adverse_reactions');

        $prompt = "
        Create a brief patient summary in the form of a paragraph for the following information:
        Indications and Usage: {$indications_and_usage ?? 'None'}
        Also create a brief paragraph about the Side Effects: {$adverse_reactions ?? 'None'}
        ";

        // Call OpenAI API (assuming you've configured a service for it in Laravel)
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            'OpenAI-Organization' => env('OPENAI_ORG_ID'),
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4',
            'messages' => [['role' => 'user', 'content' => $prompt]],
            'max_tokens' => 400,
        ]);

        if ($response->successful()) {
            $summary = $response->json()['choices'][0]['message']['content'];
            return response()->json(['summary' => $summary]);
        } else {
            return response()->json(['error' => 'Error generating summary from OpenAI.'], 500);
        }
    }
}
