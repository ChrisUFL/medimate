<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AddressBookController extends Controller
{
    //Get all the entries from the database with proper logged in user
    public function index()
    {
        $contacts = Contact::where('user_pk', Auth::id())->get();

        return Inertia::render('AddressBook', [
            'contacts' => $contacts,
        ]);
    }

    //Store new value contact into the databsae
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);
        $validatedData['user_pk'] = Auth::id();
        Contact::create($validatedData);

        return redirect(route('web.addressbook'));
    }

    //Delete a contact from the databsae
    public function delete(Request $request)
    {
        $deletedRows = Contact::query()
            ->where('user_pk', Auth::id())
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
