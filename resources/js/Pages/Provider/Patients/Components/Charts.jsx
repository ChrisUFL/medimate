import { React, useState } from "react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Paginator from "@/Components/Paginator";
import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
    Textarea,
} from "@headlessui/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";

const Charts = ({ charts, patientId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        patientId: patientId,
        reason: "",
        summary: "",
        date: "",
        bodyTemp: "",
        bloodPressure: "",
        pulse: "",
        respRate: "",
        chartId: "",
    });
    function open() {
        setIsOpen(true);
    }

    function addEntry() {
        submit();
        setIsOpen(false);
    }

    function close() {
        setIsOpen(false);
        setIsEditing(false);
        reset();
    }

    const submit = () => {
        post(route("chart-entry.store", {}, false));
    };

    const edit = (id) => {
        const entry = charts.find((chart) => id === chart.id);
        const date = entry.visit_date.split("T");
        setIsEditing(true);
        setData((prevData) => ({
            ...prevData,
            reason: entry.visit_reason,
            summary: entry.content,
            date: date[0],
            bloodPressure: entry.blood_pressure,
            bodyTemp: entry.temperature,
            pulse: entry.pulse,
            respRate: entry.respiratory_rate,
            chartId: entry.id,
        }));
        open();
    };

    const update = (e) => {
        e.preventDefault();
        patch(
            route(
                "chart-entry.update",
                {
                    id: data.chartId,
                },
                false
            )
        );
        close();
    };

    const tbodyData = charts.map((chart) => {
        const date = chart.visit_date.split("T");
        return (
            <tr key={chart.id} onClick={() => edit(chart.id)}>
                <td className="px-6 py-3">{date[0]}</td>
                <td className="px-6 py-3">{chart.visit_reason}</td>
                <td className="px-6 py-3">{chart.content}</td>
            </tr>
        );
    });
    return (
        <>
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={close}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-gray-700 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle
                                as="h3"
                                className="text-base/7 font-medium text-white"
                            >
                                Add a New Chart Entry
                            </DialogTitle>
                            <form onSubmit={isEditing ? update : submit}>
                                <TextInput
                                    value={patientId}
                                    className="hidden"
                                    readOnly={true}
                                />
                                <TextInput
                                    value={data.chartId}
                                    className="hidden"
                                    readOnly={true}
                                />
                                <div className="mt-4">
                                    <InputLabel
                                        value="Visit Reason"
                                        className="text-white"
                                    />
                                    <TextInput
                                        value={data.reason}
                                        onChange={(e) =>
                                            setData("reason", e.target.value)
                                        }
                                        className="w-[100%]"
                                    />
                                    <InputError value={errors.reason} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        value="Summary"
                                        className="text-white"
                                    />
                                    <Textarea
                                        value={data.summary}
                                        onChange={(e) =>
                                            setData("summary", e.target.value)
                                        }
                                        className="w-[100%]"
                                    />
                                    <InputError value={errors.summary} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        value="Blood Pressure"
                                        className="text-white"
                                    />
                                    <TextInput
                                        value={data.bloodPressure}
                                        onChange={(e) =>
                                            setData(
                                                "bloodPressure",
                                                e.target.value
                                            )
                                        }
                                        className="w-[100%]"
                                    />
                                    <InputError value={errors.summary} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        value="Temperature"
                                        className="text-white"
                                    />
                                    <TextInput
                                        value={data.bodyTemp}
                                        onChange={(e) =>
                                            setData("bodyTemp", e.target.value)
                                        }
                                        className="w-[100%]"
                                    />
                                    <InputError value={errors.summary} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        value="Pluse"
                                        className="text-white"
                                    />
                                    <TextInput
                                        value={data.pulse}
                                        onChange={(e) =>
                                            setData("pulse", e.target.value)
                                        }
                                        className="w-[100%]"
                                    />
                                    <InputError value={errors.summary} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        value="Respiratory Rate"
                                        className="text-white"
                                    />
                                    <TextInput
                                        value={data.respRate}
                                        onChange={(e) =>
                                            setData("respRate", e.target.value)
                                        }
                                        className="w-[100%]"
                                    />
                                    <InputError value={errors.summary} />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        value="Visit Date"
                                        className="text-white"
                                    />
                                    <TextInput
                                        value={data.date}
                                        type="date"
                                        onChange={(e) =>
                                            setData("date", e.target.value)
                                        }
                                        className="w-[100%]"
                                    />
                                    <InputError value={errors.reason} />
                                </div>
                                <div className="mt-4 flex justify-end gap-3">
                                    <Button
                                        className="inline-flex items-center gap-2 rounded-md bg-indigo-300 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                        onClick={isEditing ? update : addEntry}
                                    >
                                        {isEditing ? "Update" : "Add Note"}
                                    </Button>
                                    <Button
                                        className="inline-flex items-center gap-2 rounded-md bg-red-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                        onClick={close}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <div className={tabName === "chart" ? "block" : "hidden"}>
                <div className="flex justify-end mb-2">
                    <PrimaryButton onClick={open}>Add Entry</PrimaryButton>
                </div>
                <div className="relative overflow-x-auto drop-shadow-md">
                    <table className="w-full text-md text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Visit Date</th>
                                <th className="px-6 py-3">Visit Reason</th>
                                <th className="px-6 py-3">Summary</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white border-b">{tbodyData}</tbody>
                    </table>
                    {paginatorData && (
                        <Paginator
                            links={paginatorData.links}
                            currentPage={paginatorData.current_page}
                            lastPage={paginatorData.last_page}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Charts;
