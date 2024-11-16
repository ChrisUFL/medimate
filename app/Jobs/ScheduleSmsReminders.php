<?php

namespace App\Jobs;

use App\Models\CalendarEvent;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Twilio\Rest\Client;

class ScheduleSmsReminders implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct() {}

    public function handle(): void
    {
        CalendarEvent::query()
            ->where('datetime', '>', Carbon::now())
            ->where('datetime', '<=', Carbon::now()->addMinute())
            ->each(static function ($result) {
                /** @var CalendarEvent $result */
                $phoneNumber = $result->user->phone_number;
                $twilioClient = new Client(config('services.twilio.sid'), config('services.twilio.token'));
                $twilioClient->messages->create($phoneNumber, [
                    'from' => config('services.twilio.number'),
                    'body' => "MEDIMATE REMINDER: It's time to take {$result->name}.",
                ]);
            });
    }
}
