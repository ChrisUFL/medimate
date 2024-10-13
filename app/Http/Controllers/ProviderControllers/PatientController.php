<?php

namespace App\Http\Controllers\ProviderControllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientRequest;
use App\Jobs\SendPasswordResetEmailJob;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        return Inertia::render('Patients/Index', [
            'patients' => [
                [
                    'avatar_url' => 'https://placehold.co/32',
                    'first_name' => 'First',
                    'last_name' => 'Last',
                    'email' => 'email@email.com',
                    'user_id' => 1,
                ],
                [
                    'avatar_url' => 'https://placehold.co/32',
                    'first_name' => 'First',
                    'last_name' => 'Last',
                    'email' => 'email@email.com',
                    'user_id' => 2,
                ],
                [
                    'avatar_url' => 'https://placehold.co/32',
                    'first_name' => 'First',
                    'last_name' => 'Last',
                    'email' => 'email@email.com',
                    'user_id' => 3,
                ],
                [
                    'avatar_url' => 'https://placehold.co/32',
                    'first_name' => 'First',
                    'last_name' => 'Last',
                    'email' => 'email@email.com',
                    'user_id' => 4,
                ],
                [
                    'avatar_url' => 'https://placehold.co/32',
                    'first_name' => 'First',
                    'last_name' => 'Last',
                    'email' => 'email@email.com',
                    'user_id' => 5,
                ],
                [
                    'avatar_url' => 'https://placehold.co/32',
                    'first_name' => 'First',
                    'last_name' => 'Last',
                    'email' => 'email@email.com',
                    'user_id' => 6,
                ],
            ],
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Patients/Create', [
            'previousRoute' => $this->getPreviousRoute(url()->previous()),
        ]);
    }

    public function store(PatientRequest $request)
    {
        $validated = $request->validated();
        if (User::create($validated)) {
            dispatch(new SendPasswordResetEmailJob($validated['email']));
        }

        return redirect()->route('patients.index');
    }

    public function show($id)
    {
        return Inertia::render('Patients/Show');
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
