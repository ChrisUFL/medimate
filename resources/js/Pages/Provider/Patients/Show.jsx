/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import ProviderLayout from "@/Layouts/ProviderLayout";
import { FaNotesMedical } from "react-icons/fa";
import { FaUser, FaCalendarDays } from "react-icons/fa6";
import ShadowBox from "@/Components/ShadowBox";
import TextInput from "@/Components/TextInput";
import ReadTextArea from "@/Components/ReadTextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
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
import { useForm, router } from "@inertiajs/react";

const Show = ({ paginatorData, patient_id, charts, appointments }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [tabName, setTabName] = useState("profile");
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        patientId: patient_id,
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
            respRate: entry.respirator_rate,
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
                                    value={patient_id}
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

            <ProviderLayout>
                <ShadowBox styles="w-max-[750px]">
                    <div className="flex justify-start w-[100%]">
                        <div
                            className={
                                "border-2 rounded-l-md p-1 flex items-center hover:cursor-pointer " +
                                (tabName === "profile"
                                    ? "border-indigo-400 border-4"
                                    : "border-indigo-200 border-r-0")
                            }
                            onClick={() => setTabName("profile")}
                        >
                            <FaUser className="h-5 w-5 inline mr-2" />
                            <span className="text-lg font-semibold">
                                Profile
                            </span>
                        </div>
                        <div
                            className={
                                "border-2 p-1 flex items-center hover:cursor-pointer " +
                                (tabName === "profile"
                                    ? "border-l-0 "
                                    : "border-l-2 ") +
                                (tabName === "chart"
                                    ? "border-indigo-400 border-4 border-l-4"
                                    : "border-indigo-200 border-r-0")
                            }
                            onClick={() => setTabName("chart")}
                        >
                            <FaNotesMedical className="h-5 w-5 inline mr-2" />
                            <span className="text-lg font-semibold">
                                Charts
                            </span>
                        </div>
                        <div
                            className={
                                "border-2 p-1 flex items-center rounded-r-md hover:cursor-pointer " +
                                (tabName === "chart"
                                    ? "border-l-0 "
                                    : "border-l-2 ") +
                                (tabName === "appointments"
                                    ? "border-indigo-400 border-4 border-l-4"
                                    : "border-indigo-200")
                            }
                            onClick={() => setTabName("appointments")}
                        >
                            <FaCalendarDays className="h-5 w-5 inline mr-2" />
                            <span className="text-lg font-semibold">
                                Appointments
                            </span>
                        </div>
                    </div>
                    <ShadowBox
                        styles={tabName === "profile" ? "block" : "hidden"}
                    >
                        <div className="flex justify-center mb-6">
                            <img
                                src="https://placehold.co/100"
                                alt="Profile Picture"
                                className="rounded-[50%]"
                            />
                        </div>
                        <div className="flex gap-10">
                            <div className="w-1/2">
                                <div className="flex flex-col items-center w-[100%] gap-6">
                                    <div className="flex w-[100%] justify-center">
                                        <ReadTextArea
                                            label="First Name"
                                            text="Chris"
                                            className="w-1/2"
                                        />
                                        <ReadTextArea
                                            label="Last Name"
                                            text="Smiley"
                                            className="ml-10 w-1/2"
                                        />
                                    </div>
                                    <div className="flex w-[100%]">
                                        <ReadTextArea
                                            label="Email"
                                            text="chris@medimate.xyz"
                                            className="w-[100%]"
                                        />
                                    </div>
                                    <div className="flex w-[100%]">
                                        <ReadTextArea
                                            label="Phone"
                                            text="123-456-7890"
                                            className="w-[100%]"
                                        />
                                    </div>
                                    <div className="flex w-[100%]">
                                        <ReadTextArea
                                            label="Address"
                                            text="123 A Street Gainesville, FL"
                                            className="w-[100%]"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="flex flex-col items-center w-[100%] gap-6">
                                    <div className="flex w-[100%] justify-center">
                                        <ReadTextArea
                                            label="Gender"
                                            text="Male"
                                            className="w-1/2"
                                        />
                                        <ReadTextArea
                                            label="Language"
                                            text="English"
                                            className="ml-10 w-1/2"
                                        />
                                    </div>
                                    <div className="flex w-[100%]">
                                        <ReadTextArea
                                            label="Date of Birth"
                                            text="January 1, 1970"
                                            className="w-[100%]"
                                        />
                                    </div>
                                    <div className="flex w-[100%]">
                                        <ReadTextArea
                                            label="PlaceHolder"
                                            text="PlaceHolder"
                                            className="w-[100%]"
                                        />
                                    </div>
                                    <div className="flex w-[100%]">
                                        <ReadTextArea
                                            label="PlaceHolder"
                                            text="PlaceHolder"
                                            className="w-[100%]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-3">
                            <PrimaryButton>Edit</PrimaryButton>
                            <DangerButton>Delete</DangerButton>
                        </div>
                    </ShadowBox>

                    <div className={tabName === "chart" ? "block" : "hidden"}>
                        <div className="flex justify-end mb-2">
                            <PrimaryButton onClick={open}>
                                Add Entry
                            </PrimaryButton>
                        </div>
                        <div className="relative overflow-x-auto drop-shadow-md">
                            <table className="w-full text-md text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3">
                                            Visit Date
                                        </th>
                                        <th className="px-6 py-3">
                                            Visit Reason
                                        </th>
                                        <th className="px-6 py-3">Summary</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white border-b">
                                    {tbodyData}
                                </tbody>
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
                </ShadowBox>
            </ProviderLayout>
        </>
    );
};

export default Show;
