<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientRequest;
use App\Http\Requests\PatientUpdateRequest;
use App\Models\ChartEntry;
use App\Models\Company;
use App\Models\Patient;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $searchTerm = $request->query('q');
        $patients = Patient::query()
            ->select([
                'patients.id as user_id',
                'users.first_name', 'users.last_name', 'users.avatar_url', 'users.email',
            ])
            ->leftJoin('companies', 'patients.company_id', '=', 'companies.id')
            ->leftJoin('users', 'patients.user_id', '=', 'users.id')
            ->where('patients.company_id', '=', 1)
            ->when($searchTerm, static function (Builder $query) use ($searchTerm) {
                $query->where('users.first_name', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('users.last_name', '=', "%{$searchTerm}%");
            })
            ->paginate()
            ->withQueryString();

        return Inertia::render('Provider/Patients/Index', [
            'patients' => $patients,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Provider/Patients/Create', [
            'previousRoute' => $this->getPreviousRoute(url()->previous()),
        ]);
    }

    public function store(PatientRequest $request)
    {
        $validated = $request->validated();
        // TODO get company id from user making request
        $user = User::firstWhere('email', '=', $validated['email']);

        if (! $user) {
            $user = User::create($validated);
            // dispatch(new SendPasswordResetEmailJob($validated['email']));
        }

        Patient::create([
            'user_id' => $user->id,
            'company_id' => 1, ]);

        return redirect()->route('patients.index');
    }

    public function show(Request $request, $id)
    {
        $charts = ChartEntry::query()
            ->where('patient_id', '=', $id)
            ->get();

        /** @var User $patientUser */
        $patientUser = Patient::firstWhere('id', '=', $id)->user()->first();

        return Inertia::render('Provider/Patients/Show', [
            'charts' => $charts,
            'patient_id' => $id,
            'patient' => [
                'first_name' => $patientUser['first_name'],
                'last_name' => $patientUser['last_name'],
                'avatar_url' => $patientUser['avatar_url'],
                'language' => $patientUser['language'],
                'email' => $patientUser['email'],
                'phone_number' => $patientUser['phone_number'],
                'gender' => $patientUser['gender'],
                'date_of_birth' => Carbon::createFromFormat('Y-m-d', $patientUser['date_of_birth'])->format('F j, Y'),
                'address' => $patientUser['address'],
            ],
        ]);
    }

    public function edit($id) {}

    public function update(PatientUpdateRequest $request, $id)
    {
        Log::info("update");
        $validated = $request->validated();
        $patient = Patient::firstWhere('id', '=', $id);
        if (! $patient) {
            abort(404);
        }

        Log::info($validated);

        Log::info($patient->user()->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'date_of_birth' => Carbon::createFromFormat('F j, Y', $validated['date_of_birth']),
            'phone_number' => $validated['phone_number'],
            'gender' => $validated['gender'],
            'language' => $validated['language'],
            'address' => $validated['address'] ?? null,
        ]));
    }

    public function destroy($id) {}

    private function getPreviousRoute($previousUrl)
    {
        return match ($previousUrl) {
            route('patients.index') => 'patients.index',
            route('appointments.create') => 'appointments.create',
            default => null,
        };
    }
}
