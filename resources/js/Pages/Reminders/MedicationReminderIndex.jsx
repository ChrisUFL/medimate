import ShadowBox from "@/Components/ShadowBox";
import SimpleLayout from "@/Layouts/ProviderLayout";
import { router } from "@inertiajs/react";
import React from "react";
import { MdCancel } from "react-icons/md";

const MedicationReminderIndex = ({ events }) => {
    const convTime = (time) => {
        let localTime = new Date();
        const [hr, min] = time.split(":");
        localTime.setHours(hr);
        localTime.setMinutes(min);
        const options = {
            hour: "2-digit",
            minute: "2-digit",
        };
        return localTime.toLocaleTimeString([], options);
    };

    const removeEvent = (eventId) => {
        router.delete(
            route(
                "reminder.destroy",
                {
                    reminder: eventId,
                },
                false
            )
        );
    };

    return (
        <div>
            <SimpleLayout>
                <ShadowBox>
                    <div className="flex flex-col flex-wrap content-center">
                        {Object.entries(events).map(([date, eventData]) => (
                            <div key={date} className="date-section w-2/5 mb-5">
                                <h2>{date}</h2>
                                {eventData.map((event) => (
                                    <ShadowBox styles="mt-2 bg-indigo-200/55">
                                        <div
                                            key={event.id}
                                            className="event-card"
                                        >
                                            <div className="flex justify-between">
                                                <span>{event.name}</span>
                                                <span>
                                                    {convTime(event.time)}
                                                </span>
                                                <span className="align-middle my-auto">
                                                    <MdCancel
                                                        className="h-6 w-6 hover:cursor-pointer"
                                                        onClick={() =>
                                                            removeEvent(
                                                                event.id
                                                            )
                                                        }
                                                    />
                                                </span>
                                            </div>
                                            <span>{event.description}</span>
                                        </div>
                                    </ShadowBox>
                                ))}
                            </div>
                        ))}
                    </div>
                </ShadowBox>
            </SimpleLayout>
        </div>
    );
};

export default MedicationReminderIndex;
