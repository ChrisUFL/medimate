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
        if ($company) {
            $employeeIds = $company->employees()->pluck('id');
            $appointments = Appointment::query()
                ->whereIn('provider_id', $employeeIds)
                ->get(['appointment_time', 'patient_id', 'id'])
                ->each(static function ($appointment) {
                    $user = User::firstWhere('id', '=', $appointment['patient_id']);
                    $appointment['title'] = $user->first_name.' '.$user->last_name;

                    return $appointment;
                });
        }

        return Inertia::render('Provider/Appointments/Index', [
            'appointments' => $appointments ?? [],
        ]);
    }

    public function create(Request $request)
    {
        $dateStr = $request->query('dateTime');

        $users = User::all(['id', 'first_name', 'last_name', 'email']);
        $employees = Employee::all(['user_id', 'first_name', 'last_name']);

        return Inertia::render('Provider/Appointments/Create', [
            'patients' => $users,
            'employees' => $employees,
            'dateTime' => $dateStr,
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

    public function show(Request $request, $id)
    {
        $appointment = Appointment::firstWhere('id', '=', $id);
        $employeeIds = Employee::firstWhere('user_id', '=', $appointment?->provider_id)
            ?->company
            ?->employees
            ->pluck('user_id')
            ->toArray();

        if (! $employeeIds) {
            abort(404);
        }
        // TODO remove hardcoded id
        if (! in_array(12, $employeeIds)) {
            abort(401);
        }

        return Inertia::render('Provider/Appointments/Show', [
            'id' => $id,
            'dateTime' => $appointment->appointment_time,
            'first_name' => $appointment->patient->first_name,
            'last_name' => $appointment->patient->last_name,
            'doctor' => $appointment->provider->last_name,
        ]);
    }

    public function edit(Request $request, $id)
    {
        $appointment = Appointment::firstWhere('id', '=', $id);
        $employeeIds = Employee::firstWhere('user_id', '=', $appointment->provider_id)
            ->company
            ->employees()
            ->pluck('user_id')
            ->toArray();

        // TODO remove hardcoded id
        if (! in_array(12, $employeeIds)) {
            abort(401);
        }

        // TODO get employees for company
        $employees = Employee::all(['user_id', 'first_name', 'last_name']);

        return Inertia::render('Provider/Appointments/Edit', [
            'id' => $id,
            'patient' => $appointment->patient_id,
            'dateTime' => $appointment->appointment_time,
            'first_name' => $appointment->patient->first_name,
            'last_name' => $appointment->patient->last_name,
            'doctor' => $appointment->provider->id,
            'employees' => $employees,
        ]);
    }

    public function update(AppointmentRequest $request, $id)
    {
        $validated = $request->validated();

        $appointment = Appointment::firstWhere('id', '=', $id);
        if (! $appointment) {
            abort(404);
        }

        $appointment->update([
            'patient_id' => $validated['patientId'],
            'provider_id' => $validated['doctorId'],
            'appointment_time' => Carbon::createFromFormat('Y-m-d H:i', $validated['appointmentDate'].$validated['appointmentTime']),
        ]);

        return redirect(route('appointments.show', ['appointment' => $id]));
    }

    public function destroy(Request $request, $id)
    {
        // TODO Validate user can delete
        $appointment = Appointment::firstWhere('id', '=', $id);
        if (! $appointment) {
            abort(404);
        }

        $appointment->delete();

        return redirect(route('appointments.index'));
    }
}
