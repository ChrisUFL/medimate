/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import ProviderLayout from "@/Layouts/ProviderLayout";
import {
    FaHouseUser,
    FaHome,
    FaClipboard,
    FaNotesMedical,
} from "react-icons/fa";
import { FaHeartPulse, FaUser, FaCalendarDays } from "react-icons/fa6";
import ShadowBox from "@/Components/ShadowBox";
import TextInput from "@/Components/TextInput";
import ReadTextArea from "@/Components/ReadTextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import Paginator from "@/Components/Paginator";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const Show = ({ paginatorData }) => {
    const [isOpen, setIsOpen] = useState(true);

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    const tbodyData = [
        <tr key>
            <td className="px-6 py-3">1/1/1970</td>
            <td className="px-6 py-3">1/1/1970</td>
            <td className="px-6 py-3">Lorem ipsum dolor sit amet</td>
            <td className="px-6 py-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </td>
        </tr>,
        <tr key>
            <td className="px-6 py-3">1/1/1970</td>
            <td className="px-6 py-3">1/1/1970</td>
            <td className="px-6 py-3">Lorem ipsum dolor sit amet</td>
            <td className="px-6 py-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </td>
        </tr>,
        <tr key>
            <td className="px-6 py-3">1/1/1970</td>
            <td className="px-6 py-3">1/1/1970</td>
            <td className="px-6 py-3">Lorem ipsum dolor sit amet</td>
            <td className="px-6 py-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </td>
        </tr>,
        <tr key>
            <td className="px-6 py-3">1/1/1970</td>
            <td className="px-6 py-3">1/1/1970</td>
            <td className="px-6 py-3">Lorem ipsum dolor sit amet</td>
            <td className="px-6 py-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </td>
        </tr>,
    ];
    return (
        <ProviderLayout>
            <ShadowBox styles="w-max-[750px]">
                <div className="flex justify-start w-[100%]">
                    <div className="border-2 border-indigo-400 rounded-md p-1 flex items-center border-r-[1px] rounded-r-none hover:cursor-pointer">
                        <FaUser className="h-5 w-5 inline mr-2" />
                        <span className="text-lg font-semibold">User</span>
                    </div>
                    <div className="border-2 border-indigo-200 rounded-md p-1 flex items-center border-l-[1px] border-r-[1px] rounded-l-none rounded-r-none hover:cursor-pointer">
                        <FaNotesMedical className="h-5 w-5 inline mr-2" />
                        <span className="text-lg font-semibold">Chart</span>
                    </div>
                    <div className="border-2 border-indigo-200 rounded-md p-1 flex items-center border-l-[1px] rounded-l-none hover:cursor-pointer">
                        <FaCalendarDays className="h-5 w-5 inline mr-2" />
                        <span className="text-lg font-semibold">
                            Appointments
                        </span>
                    </div>
                </div>
                <ShadowBox styles="user hidden">
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

                <div className="chart">
                    <div className="flex justify-end mb-2">
                        <PrimaryButton>Add Entry</PrimaryButton>
                    </div>
                    <div className="relative overflow-x-auto drop-shadow-md">
                        <table className="w-full text-md text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Visit Date</th>
                                    <th className="px-6 py-3">Visit Reason</th>
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
    );
};

export default Show;
