<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $appointments = [];
        $companyId = $request->user()?->employee?->company_id;
        if (! $companyId) {
            abort(403);
        }

        Company::query()
            ->select([
                'users.first_name', 'users.last_name',
                'appointments.appointment_time', 'appointments.id AS appointment_id',
                'companies.id',
            ])
            ->join('appointments', 'companies.id', '=', 'appointments.company_id')
            ->join('patients', 'appointments.patient_id', '=', 'patients.id')
            ->join('users', 'patients.user_id', '=', 'users.id')
            ->where('companies.id', '=', $companyId)
            ->each(static function ($result) use (&$appointments) {
                $appointments[] = [
                    'title' => $result->first_name.' '.$result->last_name,
                    'appointment_time' => $result->appointment_time,
                    'appointment_id' => $result->appointment_id,
                ];
            });

        return Inertia::render('Provider/Dashboard', [
            'appointments' => $appointments,
        ]);
    }
}
