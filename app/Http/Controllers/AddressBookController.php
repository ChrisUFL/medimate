<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
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
    public function store(Request $request){
        $validatedData = $request->validate([
            'user_pk' => 'required|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);
        Contact::create($validatedData);
    }
}
