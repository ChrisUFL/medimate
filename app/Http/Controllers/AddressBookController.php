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

    public function delete(Request $request)
    {
        $deletedRows = Contact::where('user_pk', $request->user_pk)
                              ->where('name', $request->name)
                              ->where('email', $request->email)
                              ->where('address', $request->address)
                              ->where('phone', $request->phone)
                              ->delete();
    
        if ($deletedRows) {
            return response()->json(['message' => 'deleted successfully']);
        } else {
            return response()->json(['message' => 'did not delete']);
        }
    }
    

}
