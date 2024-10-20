import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SimpleLayout from "@/Layouts/SimpleLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { Head, usePage, router } from "@inertiajs/react";
import { React, useState } from "react";

function Show({ ...note }) {
    const page = usePage();
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    function goToEdit() {
        router.get(
            route("notes.edit", {
                note: note.note_id,
            })
        );
    }

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteNote = (e) => {
        e.preventDefault();
        router.delete(
            route(
                "notes.destroy",
                {
                    note: note.note_id,
                },
                false
            )
        );
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };

    return (
        <SimpleLayout>
            <Head title={note.note_title} />
            <div className="mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <h3 className="text-2xl font-semibold my-3">
                    {note.note_title}
                </h3>
                <pre className="max-h-screen text-slate-700 text-wrap overflow-auto font-serif">
                    {note.note_content}
                </pre>
                <div className="flex justify-end gap-2">
                    {page.props.auth.user &&
                        page.props.auth.user.id === note.note_owner && (
                            <PrimaryButton onClick={goToEdit}>
                                Edit
                            </PrimaryButton>
                        )}
                    {page.props.auth.user &&
                        page.props.auth.user.id === note.note_owner && (
                            <DangerButton onClick={confirmUserDeletion}>
                                Delete
                            </DangerButton>
                        )}
                    <Modal show={confirmingUserDeletion} onClose={closeModal}>
                        <form onSubmit={deleteNote} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Are you sure you want to delete this note?
                            </h2>
                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>
                                    Cancel
                                </SecondaryButton>

                                <DangerButton className="ms-3">
                                    Delete Note
                                </DangerButton>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </SimpleLayout>
    );
}

export default Show;
