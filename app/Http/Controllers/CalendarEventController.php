<?php

namespace App\Http\Controllers;

use App\Http\Requests\CalendarEventRequest;
use App\Models\CalendarEvent;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CalendarEventController extends Controller
{
    private const WEEKS_TO_ADD = [
        'once' => 1,
        'weekly' => 1,
        'monthly' => 4,
    ];

    private const TOTAL_WEEKS = [
        'once' => 1,
        'weekly' => 52,
        'monthly' => 12,
    ];

    public function index(Request $request)
    {
        // Get the next 7 days and order them in ASC order
        $userId = $request->user()->id;
        $events = [];
        CalendarEvent::query()
            ->where('user_id', '=', $userId)
            ->where('datetime', '>=', Carbon::now())
            ->where('datetime', '<=', Carbon::now()->addWeek())
            ->orderBy('datetime')
            ->each(static function ($result) use (&$events) {
                $datetime = Carbon::parse($result['datetime']);
                $eventDate = $datetime->toDateString();
                $currentDateEvents = [];
                if (array_key_exists($eventDate, $events) && is_array($events[$eventDate])) {
                    $currentDateEvents = $events[$eventDate];
                }
                $events[$eventDate] = [
                    ...$currentDateEvents,
                    [
                        'id' => $result['id'],
                        'name' => $result['name'],
                        'description' => $result['description'],
                        'date' => $datetime->toDateString(),
                        'time' => $result['local_time'],
                    ]];
            });

        return Inertia::render('Reminders/MedicationReminderIndex', [
            'events' => $events,
        ]);
    }

    public function create()
    {
        return Inertia::render('Reminders/MedicationReminderCreate');
    }

    public function store(CalendarEventRequest $request)
    {
        $validated = $request->validated();

        // Create a new DB Entry for each event with the same UUID so they can be deleted later if necessary
        DB::transaction(static function () use ($request, $validated) {
            $event_uuid = Str::uuid();
            $time = Carbon::parse($validated['time']);
            $localTime = $time->subMinutes($validated['timezoneOffset']); //Get the local time
            for ($i = 0; $i < self::TOTAL_WEEKS[$request['frequency']]; $i++) {
                foreach ($request['days'] as $day) {
                    $dateTime = Carbon::now()->addDays(7 - Carbon::now()->getDaysFromStartOfWeek())
                        ->startOfDay()
                        ->addDays($day)
                        ->addWeeks($i * self::WEEKS_TO_ADD[$request['frequency']])
                        ->setHour($time->hour)
                        ->setMinute($time->minute);

                    DB::table('calendar_events')
                        ->insert([
                            'user_id' => $request->user()->id,
                            'name' => $validated['name'],
                            'description' => $validated['description'] ?? '',
                            'datetime' => $dateTime,
                            'event_uuid' => $event_uuid,
                            'local_time' => $localTime->hour.':'.$localTime->minute,
                        ]);
                }
            }
        });

        return redirect(route('reminder.index'));
    }

    public function show($id) {}

    public function edit($id) {}

    public function update(Request $request, $id) {}

    public function destroy(Request $request, $id)
    {
        $userId = $request->user()->id;
        $event = CalendarEvent::query()->firstWhere('id', '=', $id);

        if ($event->user_id !== $userId) {
            abort(403);
        }

        $event->delete();
    }
}
