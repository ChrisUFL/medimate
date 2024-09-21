<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AddressBookController extends Controller
{
    public function index()
    {
        return Inertia::render('AddressBook');
    }
}
