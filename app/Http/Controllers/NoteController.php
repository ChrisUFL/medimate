<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoteRequest;
use App\Models\Note;
use App\Models\PatientDocument;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $searchTerm = $request->query('q');
        $user = $request->user();
        $notes = $user->notes()
            /** @phpstan-ignore-next-line  */
            ->when($searchTerm, static function (Builder $query) use ($searchTerm) {
                $query->where('title', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('content', 'LIKE', "%{$searchTerm}%");
            })
            ->where('notes.user_id', '=', $user->id)
            ->paginate(10, ['notes.id', 'title', 'content'])
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
        $files = $request->file('files');

        /** @var Note $note */
        $note = $request->user()->notes()->create($validated);
        if ($note && $files) {
            foreach ($files as $file) {
                $fileName = $file->getClientOriginalName();
                $fileType = $file->getClientOriginalExtension();
                $fileUUID = Str::uuid();
                $fileUpload = '';

                try {
                    $fileUpload = Storage::disk('r2')->putFileAs('/', $file, 'user_documents/'.$fileUUID.'.'.$fileType, 'public');
                } catch (\Exception $e) {
                    Log::info($e);
                }

                if ($fileUpload) {
                    PatientDocument::create([
                        'file_id' => $fileUUID,
                        'extension' => $fileType,
                        'mimetype' => $file->getMimeType(),
                        'original_name' => $fileName,
                        'note_id' => $note->id,
                        'user_id' => $user->id,
                    ]);
                }
            }
        }

        return redirect(route('notes.show', ['note' => $note->id]));
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

        if ($userId !== $note->user->id) {
            abort(403);
        }

        $documentUrls = [];
        PatientDocument::query()
            ->where('note_id', '=', $id)
            ->each(static function ($result) use (&$documentUrls) {
                /** @var PatientDocument $result */
                $documentUrls[] = [
                    //'/user_documents/'.$result->file_id.'.'.$result->extension
                    'url' => Storage::disk('r2')->url('user_documents/'.$result->file_id.'.'.$result->extension),
                    'file_name' => $result->original_name,
                ];
            });

        /** @var Note $note */
        return Inertia::render('Notes/Show', [
            'note_id' => $note->id,
            'note_title' => $note->title,
            'note_content' => $note->content,
            'note_owner' => $note->user_id,
            'documents' => $documentUrls,
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
        // Find the note and update it if it exists
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
        // If the note does not belong to the user attempting to delete it, throw a 403
        if (! $note || $note->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($note->delete()) {
            $attachments = $note->documents;
            foreach ($attachments as $attachment) {
                /** @var PatientDocument $attachment */
                Storage::disk('r2')->delete($this->getDocumentName($attachment));
            }

            return redirect(route('notes.index'));
        }

        return redirect()->back();
    }

    private function getDocumentName(PatientDocument $document): string
    {
        return 'user_documents/'.$document->file_id.'.'.$document->extension;
    }
}
