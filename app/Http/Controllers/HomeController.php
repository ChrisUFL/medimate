<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'user' => 'chris',
            'data' => [
                'calendar' => [
                    [
                        'id' => '1',
                        'date' => '9/14/2024',
                        'title' => 'Dr Appt.',
                    ],
                    [
                        'id' => '2',
                        'date' => '9/10/2024',
                        'title' => 'MRI',
                    ],
                    [
                        'id' => '3',
                        'date' => '9/14/2025',
                        'title' => 'Death',
                    ],
                    [
                        'id' => '4',
                        'date' => '9/14/2024',
                        'title' => 'Blood test',
                    ],
                    [
                        'id' => '5',
                        'date' => '7/11/2022',
                        'title' => 'Broke Leg',
                    ],
                ],
                'medication' => [
                    [
                        'name' => 'a',
                        'time' => '8:00 am',
                    ],
                    [
                        'name' => 'b',
                        'time' => '4:00 am',
                    ],
                    [
                        'name' => 'c',
                        'time' => '8:00 pm',
                    ],
                    [
                        'name' => 'd',
                        'time' => '3:00 am',
                    ],
                ],
            ],
        ]);
    }
}
