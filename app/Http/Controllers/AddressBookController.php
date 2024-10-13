<?php

namespace App\Http\Controllers;
use App\Models\Contact;

use Inertia\Inertia;

class AddressBookController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return Inertia::render('AddressBook', [
            'contacts' => $contacts,
        ]);
    }
}
