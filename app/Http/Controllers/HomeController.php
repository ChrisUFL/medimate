<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            //'user' => 'chris',
               'calendar' => [
                   '1' => [
                       'id' => '1',
                       'date' => '9/14/2024',
                       'title' => 'Dr Appt.'
                   ],
                   '2' => [
                       'id' => '2',
                       'date' => '9/10/2024',
                       'title' => 'MRI'
                   ],
                   '3' => [
                       'id' => '3',
                       'date' => '9/14/2025',
                       'title' => 'Death'
                   ],
                   '4' => [
                       'id' => '4',
                       'date' => '9/14/2024',
                       'title' => 'Blood test appointment'
                   ],
                   '5' => [
                       'id' => '5',
                       'date' => '7/11/2022',
                       'title' => 'Broke Leg'
                   ]
               ]
        ]);
    }
}
