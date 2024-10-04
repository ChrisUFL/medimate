<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteRequest;
use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index()
    {
        $user = User::query()
            ->whereHas('notes')
            ->first();
        $notes = $user->notes()
            ->get(['note_id', 'title', 'content'])
            ->each(static function ($note) {
                if (strlen($note->content) > 50) {
                    $note->content = rtrim(substr($note->content, 0, 50)).'...';
                }
            });

        return Inertia::render('Notes/Index', [
            'notes' => $notes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Notes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NoteRequest $request)
    {
        return redirect(route('web.home'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $userId = $request->user()?->id;
        $note = Note::firstWhere('id', '=', $id);
        $allowedUserIds = $note->pluck('user_id')->toArray();

        /*if (! in_array($userId, $allowedUserIds)) {
            abort(403);
        }*/

        /** @var Note $note */
        return Inertia::render('Notes/Show', [
            'note_id' => $note->id,
            'note_title' => $note->title,
            'note_content' => $note->content,
            'note_owner' => $note->user_id,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
