<?php

/** @noinspection ALL */

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppointmentRequest;
use App\Models\Appointment;
use App\Models\Company;
use App\Models\Employee;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $appointments = [];
        $companyId = $request->user()?->employee?->company_id;
        if (! $companyId) {
            abort(403);
        }

        /*
         * Get all appointments for the given employer and join the required tables to get the user name, and appt info
         */
        Company::query()
            ->select([
                'users.first_name', 'users.last_name',
                'appointments.appointment_time', 'appointments.id AS appointment_id',
                'companies.id',
            ])
            ->leftjoin('appointments', 'companies.id', '=', 'appointments.company_id')
            ->leftjoin('patients', 'appointments.patient_id', '=', 'patients.id')
            ->leftjoin('users', 'patients.user_id', '=', 'users.id')
            ->where('companies.id', '=', $companyId)
            ->each(static function ($result) use (&$appointments) {
                $appointments[] = [
                    'title' => $result->first_name.' '.$result->last_name,
                    'appointment_time' => $result->appointment_time,
                    'appointment_id' => $result->appointment_id,
                ];
            });

        return Inertia::render('Provider/Appointments/Index', [
            'appointments' => $appointments,
        ]);
    }

    public function create(Request $request)
    {
        $dateStr = $request->query('dateTime');
        $companyId = $request->user()->employee->company_id;
        $patients = [];
        Patient::query()
            ->where('company_id', '=', $companyId)
            ->each(static function ($result) use (&$patients) {
                /** @var Patient $result */
                $user = $result->user;
                $patients[] = [
                    'id' => $result->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                ];
            });
        $employees = Employee::all(['id', 'first_name', 'last_name']);

        return Inertia::render('Provider/Appointments/Create', [
            'patients' => $patients,
            'employees' => $employees,
            'dateTime' => $dateStr,
        ]);
    }

    public function store(AppointmentRequest $request)
    {
        $validated = $request->validated();
        $company_id = Employee::firstWhere('user_id', '=', $request->user()->id)->company_id;
        if (! $company_id) {
            abort(403);
        }

        $appointment = Appointment::create([
            'patient_id' => $validated['patientId'],
            'employee_id' => $validated['doctorId'],
            'company_id' => $company_id,
            'appointment_time' => $validated['isoTime'],
        ]);

        return redirect(route('appointments.index'));
    }

    public function show(Request $request, $id)
    {
        $appointment = Appointment::firstWhere('id', '=', $id);
        $employeeIds = Company::firstWhere('id', '=', $appointment->company_id)
            ->employees
            ->pluck('user_id')
            ->toArray();

        // Ensure the company has employees
        if (! $employeeIds) {
            abort(404);
        }

        // Ensure the user is authorized to see the resource.
        if (! in_array($request->user()?->id, $employeeIds)) {
            abort(403);
        }

        return Inertia::render('Provider/Appointments/Show', [
            'id' => $id,
            'dateTime' => $appointment->appointment_time,
            'first_name' => $appointment->patient->user->first_name,
            'last_name' => $appointment->patient->user->last_name,
            'doctor' => $appointment->employee->last_name,
        ]);
    }

    public function edit(Request $request, $id)
    {
        $appointment = Appointment::firstWhere('id', '=', $id);
        $employeeInfo = Company::query()
            ->select([
                'employees.id AS employee_id', 'employees.first_name', 'employees.last_name',
            ])
            ->join('appointments', 'companies.id', '=', 'appointments.company_id')
            ->join('employees', 'companies.id', '=', 'employees.company_id')
            ->groupBy('employees.id', 'employees.first_name', 'employees.last_name')
            ->get();

        if (! in_array(1, $employeeInfo->pluck('employee_id')->toArray())) {
            abort(403);
        }

        $patient = $appointment->patient->user;

        $employeesArray = [];
        $employeeInfo->each(static function ($result) use (&$employeesArray) {
            $employeesArray[] = [
                'id' => $result->employee_id,
                'first_name' => $result->first_name,
                'last_name' => $result->last_name,
            ];
        });

        return Inertia::render('Provider/Appointments/Edit', [
            'id' => $id,
            'patient' => $appointment->patient_id,
            'dateTime' => $appointment->appointment_time,
            'first_name' => $patient->first_name,
            'last_name' => $patient->last_name,
            'doctor' => $appointment->employee_id,
            'employees' => $employeesArray,
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
            'employee_id' => $validated['doctorId'],
            'appointment_time' => $validated['isoTime'],
        ]);

        return redirect(route('appointments.show', ['appointment' => $id]));
    }

    public function destroy(Request $request, $id)
    {
        $appointment = Appointment::firstWhere('id', '=', $id);
        if (! $appointment) {
            abort(404);
        }

        $appointment->delete();

        return redirect(route('appointments.index'));
    }
}
