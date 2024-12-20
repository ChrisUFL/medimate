import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SimpleLayout from "@/Layouts/SimpleLayout";
import { Textarea } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

function Create() {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: "",
        content: "",
        files: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("notes.store", {}, false));
    }

    return (
        <SimpleLayout>
            <div className="w-full mt-6 px-6 py-4 bg-[var(--submenu-bg-color)] shadow-md overflow-hidden sm:rounded-lg text-[var(--text-color)]">
                <Head title="Create Note" />
                <section>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput
                                placeholder="Title..."
                                name="title"
                                type="text"
                                className="mt-1 block w-full bg-[var(--background-color)] text-[var(--text-color)] placeholder-[var(--placeholder-text-color)]"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="content" value="Note" />
                            <Textarea
                                placeholder="Note..."
                                name="content"
                                className="mt-1 block w-full rounded bg-[var(--background-color)] text-[var(--text-color)] placeholder-[var(--placeholder-text-color)]"
                                rows={3}
                                value={data.content}
                                onChange={(e) => setData("content", e.target.value)}
                            ></Textarea>
                            <InputError
                                message={errors.content}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="upload" value="Upload" />
                            <TextInput
                                name="upload"
                                type="file"
                                className="mt-1 block"
                                multiple="multiple"
                                onChange={(e) => {
                                    if (
                                        e.target.value !== "" ||
                                        e.target.value !== undefined
                                    ) {
                                        setData("files", e.target.files);
                                        console.log(e.target.files);
                                    }
                                }}
                            />
                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <PrimaryButton
                                className="mt-2"
                                disabled={processing}
                            >
                                Submit
                            </PrimaryButton>
                        </div>
                    </form>
                </section>
            </div>
        </SimpleLayout>
    );
}

export default Create;
