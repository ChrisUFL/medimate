<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChartEntryRequest;
use App\Models\ChartEntry;
use App\Models\Patient;

class ChartsController extends Controller
{
    public function store(ChartEntryRequest $request)
    {
        $validated = $request->validated();
        $chart = ChartEntry::create([
            'patient_id' => $validated['patientId'],
            'content' => $validated['summary'],
            'visit_reason' => $validated['reason'],
            'visit_date' => $validated['date'],
            'blood_pressure' => $validated['bloodPressure'],
            'temperature' => $validated['bodyTemp'],
            'pulse' => $validated['pulse'],
            'respiratory_rate' => $validated['respRate'],
        ]);
    }

    public function update(ChartEntryRequest $request, $id)
    {
        $chart = ChartEntry::firstWhere('id', '=', $id);
        $validated = $request->validated();

        $chart->update([
            'content' => $validated['summary'],
            'visit_reason' => $validated['reason'],
            'visit_date' => $validated['date'],
            'blood_pressure' => $validated['bloodPressure'],
            'temperature' => $validated['bodyTemp'],
            'pulse' => $validated['pulse'],
            'respiratory_rate' => $validated['respRate'],
        ]);
    }
}
