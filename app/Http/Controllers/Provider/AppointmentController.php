<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppointmentRequest;
use App\Models\Appointment;
use App\Models\Employee;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        //todo Get user id from $request
        $user = User::firstWhere('id', '=', 1);
        $company = $user?->companies()?->first();
        $employeeIds = $company->employees()->pluck('id');
        $appointments = Appointment::query()
            ->whereIn('provider_id', $employeeIds)
            ->get(['appointment_time', 'patient_id', 'id'])
            ->each(static function ($appointment) {
                $user = User::firstWhere('id', '=', $appointment['patient_id']);
                $appointment['title'] = $user->first_name.' '.$user->last_name;

                return $appointment;
            });

        return Inertia::render('Provider/Appointments/Index', [
            'appointments' => $appointments,
        ]);
    }

    public function create()
    {
        $users = User::all(['id', 'first_name', 'last_name', 'email']);
        $employees = Employee::all(['user_id', 'first_name', 'last_name']);

        return Inertia::render('Provider/Appointments/Create', [
            'patients' => $users,
            'employees' => $employees,
        ]);
    }

    public function store(AppointmentRequest $request)
    {
        $validated = $request->validated();
        $appointment = Appointment::create([
            'patient_id' => $validated['patientId'],
            'provider_id' => $validated['doctorId'],
            'appointment_time' => Carbon::createFromFormat('Y-m-d H:i', $validated['appointmentDate'].$validated['appointmentTime']),
        ]);

        return redirect(route('appointments.index'));
    }

    public function show($id)
    {
        return Inertia::render('Provider/Appointments/Show');
    }

    public function edit($id)
    {
        return Inertia::render('Provider/Appointments/Edit');
    }

    public function update(AppointmentRequest $request, $id) {}

    public function destroy($id) {}
}
