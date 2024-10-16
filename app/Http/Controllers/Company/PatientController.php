<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientRequest;
use App\Models\ChartEntry;
use App\Models\Company;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
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
        if ($user = User::create($validated)) {
            Patient::create([
                'user_id' => $user->id,
                'company_id' => 1,
            ]);
            //dispatch(new SendPasswordResetEmailJob($validated['email']));
        }

        return redirect()->route('patients.index');
    }

    public function show(Request $request, $id)
    {
        $charts = ChartEntry::query()
            ->where('patient_id', '=', $id)
            ->get();

        return Inertia::render('Provider/Patients/Show', [
            'charts' => $charts,
            'patient_id' => $id,
        ]);
    }

    public function edit($id) {}

    public function update(Request $request, $id) {}

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
