<?php

namespace App\Console\Commands;

use App\Mail\test;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class sendTestMailCommand extends Command
{
    protected $signature = 'send:test-mail';

    protected $description = 'Command description';

    public function handle(): void
    {
        Mail::to('')->send(new test);
    }
}
