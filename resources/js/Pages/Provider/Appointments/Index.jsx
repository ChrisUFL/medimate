import React from "react";
import ProviderLayout from "@/Layouts/ProviderLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { router } from "@inertiajs/react";

const headerToolBar = {
    left: "prev,next",
    center: "title",
    right: "timeGridDay,timeGridWeek,dayGridMonth",
};

const businessHours = [
    {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: "08:00",
        endTime: "12:00",
    },
    {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: "13:00",
        endTime: "17:00",
    },
];

const dateClick = (e) => {
    router.get(
        route(
            "appointments.create",
            {
                dateTime: e.dateStr,
            },
            false
        )
    );
};

const Index = ({ appointments }) => {
    const appointmentTimes = appointments.map((appointment) => {
        let datestring = new Date(appointment.appointment_time);
        const endTime = datestring.setMinutes(datestring.getMinutes() + 30);

        return {
            title: appointment.title,
            start: appointment.appointment_time,
            end: endTime,
            url: route("appointments.show", {
                appointment: appointment.id,
            }),
        };
    });

    return (
        <ProviderLayout pageTitle={"Appointments"}>
            <div className="flex w-[100%]">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    dateClick={dateClick}
                    initialView="timeGridDay"
                    viewClassNames={"w-[1000px]"}
                    headerToolbar={headerToolBar}
                    businessHours={businessHours}
                    slotDuration={"00:15:00"}
                    nowIndicator={true}
                    allDaySlot={false}
                    events={appointmentTimes}
                />
            </div>
        </ProviderLayout>
    );
};

export default Index;
