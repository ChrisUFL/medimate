import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SimpleLayout from "@/Layouts/SimpleLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { usePage, router, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

function Show({ documents, ...note }) {
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

    const openLink = (link) => {
        window.open(link, "_blank").focus();
    };

    // Create new elements for each document
    const attachemnts = documents.map((document) => {
        return (
            <Link onClick={() => openLink(document.url)}>
                <li key={document.file_name} className="my-2 mr-2">
                    <span>
                        {document.file_name}
                        <FaExternalLinkAlt className="ml-3 size-3 inline" />
                    </span>
                </li>
            </Link>
        );
    });

    return (
        <SimpleLayout title={note.note_title}>
            <div className="mt-6 px-6 py-4 bg-[var(--submenu-bg-color)] shadow-md overflow-hidden sm:rounded-lg text-[var(--text-color)]">
                <h3 className="my-3 text-2xl font-semibold">
                    {note.note_title}
                </h3>
                <pre className="max-h-screen text-[var(--text-color)] text-wrap overflow-auto font-serif">
                    {note.note_content}
                </pre>
                <div className="mt-8">
                    <h3 className="font-semibold">
                        {documents.length > 0 && "Attachments"}
                    </h3>
                    <ul>{attachemnts}</ul>
                </div>
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
                            <h2 className="text-lg font-medium text-[var(--text-color)]">
                                Are you sure you want to delete this note?
                            </h2>
                            <div className="flex justify-end mt-6">
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
