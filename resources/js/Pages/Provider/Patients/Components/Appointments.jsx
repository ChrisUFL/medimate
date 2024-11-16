import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";

const Appointments = ({ appointments, isActive }) => {
    const goToAppointment = (id) => {
        router.get(
            route(
                "appointments.show",
                {
                    appointment: id,
                },
                false
            )
        );
    };

    const tbodyData = appointments.map((appointment) => {
        const date = new Date(appointment.appointment_time);
        const hour = date.getHours() + date.getTimezoneOffset() / 60;
        const minutes = date.getMinutes();
        const localTime = new Date();
        localTime.setHours(hour);
        localTime.setMinutes(minutes);
        return (
            <tr
                key={appointment.id}
                className="hover:bg-indigo-300 hover:cursor-pointer"
                onClick={() => goToAppointment(appointment.id)}
                id={appointment.id}
            >
                <td className="px-6 py-3">{date.toLocaleDateString()}</td>
                <td className="px-6 py-3">
                    {localTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </td>
            </tr>
        );
    });

    return (
        <div className={isActive ? "block" : "hidden"}>
            <div className="flex justify-end mb-2">
                <PrimaryButton
                    onClick={() => open(route("appointments.create"))}
                >
                    Add Appointment
                </PrimaryButton>
            </div>
            <div className="relative overflow-x-auto drop-shadow-md">
                <table className="w-full text-md text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Visit Date</th>
                            <th className="px-6 py-3">Visit Time</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white border-b">{tbodyData}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;
