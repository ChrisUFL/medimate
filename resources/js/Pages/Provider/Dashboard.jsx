import React from "react";
import ProviderLayout from "@/Layouts/ProviderLayout";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const headerToolBar = {
    left: "",
    center: "title",
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

function Home() {
    return (
        <ProviderLayout pageTitle={"Provider"}>
            <div className="flex w-[100%]">
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridDay"
                    viewClassNames={"w-[1000px]"}
                    headerToolbar={headerToolBar}
                    businessHours={businessHours}
                    slotDuration={"00:15:00"}
                    nowIndicator={true}
                    allDaySlot={false}
                />
            </div>
        </ProviderLayout>
    );
}

export default Home;
