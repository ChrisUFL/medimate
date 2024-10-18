<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientRequest;
use App\Http\Requests\PatientUpdateRequest;
use App\Models\Appointment;
use App\Models\ChartEntry;
use App\Models\Patient;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $searchTerm = $request->query('q');
        $companyId = $request->user()?->employee?->company_id;

        if (! $companyId) {
            abort(403);
        }
        $patients = Patient::query()
            ->select([
                'patients.id as user_id',
                'users.first_name', 'users.last_name', 'users.avatar_url', 'users.email',
            ])
            ->leftJoin('companies', 'patients.company_id', '=', 'companies.id')
            ->leftJoin('users', 'patients.user_id', '=', 'users.id')
            ->where('patients.company_id', '=', $companyId)
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

        $companyId = $request->user()?->employee?->company_id;
        if (! $companyId) {
            abort(403);
        }

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
        $companyId = $request->user()?->employee->company_id;
        $charts = ChartEntry::query()
            ->where('patient_id', '=', $id)
            ->get();
        $patient = Patient::firstWhere('id', '=', $id);
        if (! $companyId || ! $patient || $patient->company_id !== $companyId) {
            abort(403);
        }
        /** @var User $patientUser */
        $patientUser = $patient->user()->first();
        $appointments = Appointment::query()
            ->where('patient_id', '=', $id)
            ->where('appointment_time', '>=', Carbon::now())
            ->orderBy('appointment_time')
            ->limit(10)
            ->get();

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
            'appointments' => $appointments,
        ]);
    }

    public function edit($id) {}

    public function update(PatientUpdateRequest $request, $id)
    {
        $companyId = $request->user()?->employee->company_id;
        $validated = $request->validated();
        $patient = Patient::firstWhere('id', '=', $id);
        if (! $patient || ! $companyId || $patient->company_id !== $companyId) {
            abort(404);
        }

        $patient->user()->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'date_of_birth' => Carbon::createFromFormat('F j, Y', $validated['date_of_birth']),
            'phone_number' => $validated['phone_number'],
            'gender' => $validated['gender'],
            'language' => $validated['language'],
            'address' => $validated['address'] ?? null,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $companyId = $request->user()?->employee->company_id;
        $patient = Patient::firstWhere('id', '=', $id);
        if (! $patient || ! $companyId || $patient->company_id !== $companyId) {
            abort(404);
        }

        $patient->delete();
    }

    private function getPreviousRoute($previousUrl)
    {
        return match ($previousUrl) {
            route('patients.index') => 'patients.index',
            route('appointments.create') => 'appointments.create',
            default => null,
        };
    }
}
