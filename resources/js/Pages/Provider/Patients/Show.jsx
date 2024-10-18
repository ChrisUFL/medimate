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
import Profile from "./Components/Profile";
import Charts from "./Components/Charts";
import Appointments from "./Components/Appointments";

const Show = ({ paginatorData, patient_id, charts, appointments, patient }) => {
    const [tabName, setTabName] = useState("profile");
    const params = route().params;

    return (
        <>
            <ProviderLayout
                pageTitle={patient.first_name + " " + patient.last_name}
            >
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
                    <Profile
                        patientData={patient}
                        isActive={tabName === "profile"}
                        patientId={params.patient}
                    />
                    <Charts
                        charts={charts}
                        patientId={patient_id}
                        isActive={tabName === "chart"}
                    />
                    <Appointments
                        isActive={tabName === "appointments"}
                        appointments={appointments}
                    />
                </ShadowBox>
            </ProviderLayout>
        </>
    );
};

export default Show;
