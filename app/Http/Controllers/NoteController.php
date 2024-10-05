<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteRequest;
use App\Models\Note;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $searchTerm = $request->query('q');
        $user = $request->user();
        $notes = $user->notes()
            ->when($searchTerm, static function (Builder $query) use ($searchTerm) {
                $query->where('title', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('content', 'LIKE', "%{$searchTerm}%");
            })
            ->where('notes.user_id', '=', $user->id)
            ->paginate(10, ['note_id', 'title', 'content'])
            ->appends(['q' => $searchTerm]);

        return Inertia::render('Notes/Index', [
            'notes' => $notes,
            'search_term' => $searchTerm,
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
        $validated = $request->validated();
        $user = $request->user();
        $validated['user_id'] = $user->id;

        if ($validated) {
            /** @var Note $note */
            $note = $request->user()->notes()->create($validated);

            return redirect(route('notes.show', ['note' => $note->id]));
        }

        return redirect(route('web.home'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $userId = $request->user()?->id;
        $note = Note::firstWhere('id', '=', $id);

        if (! $note) {
            abort(404);
        }

        $allowedUserIds = $note->users()->pluck('user_id')->toArray();
        if (! in_array($userId, $allowedUserIds)) {
            abort(403);
        }

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
    public function edit(Request $request, string $id)
    {
        $userId = $request->user()?->id;
        $note = Note::firstWhere('id', '=', $id);

        if (! $note) {
            abort(404);
        }

        if ($userId !== $note->user_id) {
            abort(401);
        }

        return Inertia::render('Notes/Edit', [
            'note_id' => $note->id,
            'note_title' => $note->title,
            'note_content' => $note->content,
            'note_owner' => $note->user_id,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(NoteRequest $request, string $id)
    {
        $note = Note::firstWhere('id', '=', $id);
        $userId = $request->user()->id;
        $validated = $request->validated();

        if (! $validated || ! $note || ! $userId) {
            abort(404);
        }

        if ($note->update($validated)) {
            return redirect(route('notes.show', ['note' => $note->id], false));
        }

        return redirect(route('notes.index', [], false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $note = Note::firstWhere('id', '=', $id);
        if (! $note || $note->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($note->delete()) {
            return redirect(route('notes.index'));
        }

        return redirect()->back();
    }
}
