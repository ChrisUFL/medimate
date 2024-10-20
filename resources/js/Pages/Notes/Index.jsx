import Paginator from "@/Components/Paginator";
import PrimaryButton from "@/Components/PrimaryButton";
import SimpleLayout from "@/Layouts/SimpleLayout";
import { Link, usePage, router } from "@inertiajs/react";
import { React, useState } from "react";
import { FaLink, FaSearch } from "react-icons/fa";

const Notes = ({ notes, search_term }) => {
    const page = usePage();
    const [searchTerm, setSearchTerm] = useState(search_term ?? "");

    function goToNew() {
        router.get(route("notes.create"));
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            search();
        }
    }

    function search() {
        router.get(
            route("notes.index", {
                q: searchTerm,
            })
        );
    }

    const content = notes.data.map((note) => {
        let note_content = note.content.substring(0, 85).trim();
        note_content += note.content.length > 50 ? "..." : "";

        return (
            <tr key={note.id}>
                <td className="px-6 py-3">{note.title}</td>
                <td className="px-6 py-3">{note_content}</td>
                <td className="px-6 py-3 flex justify-center">
                    <Link href={route("notes.show", { note: note.id })}>
                        <FaLink />
                    </Link>
                </td>
            </tr>
        );
    });

    return (
        <SimpleLayout title="Notes">
            <div className="mt-3 flex-col w-[1000px]">
                <div className="flex justify-between drop-shadow-lg">
                    <div className="flex mb-1">
                        <input
                            type="text"
                            className="h-9 rounded"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="h-9 flex items-center absolute left-[170px]">
                            <FaSearch
                                onClick={search}
                                className="text-slate-300 cursor-pointer"
                            />
                        </div>
                    </div>
                    <PrimaryButton onClick={goToNew} className="mb-1">
                        Add Note
                    </PrimaryButton>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-md text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Content</th>
                                <th className="px-6 py-3 flex justify-center">
                                    View
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white border-b">{content}</tbody>
                    </table>
                    <Paginator
                        links={notes.links}
                        currentPage={notes.current_page}
                        lastPage={notes.last_page}
                    />
                </div>
            </div>
        </SimpleLayout>
    );
};

export default Notes;
