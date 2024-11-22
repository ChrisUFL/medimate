import React from "react";
import { useState } from "react";

const DAYS = [
    {
        key: "monday",
        label: "Mo",
    },
    {
        key: "tuesday",
        label: "Tu",
    },
    {
        key: "wednesday",
        label: "We",
    },
    {
        key: "thursday",
        label: "Th",
    },
    {
        key: "friday",
        label: "Fr",
    },
    {
        key: "saturday",
        label: "Sa",
    },
    {
        key: "sunday",
        label: "Su",
    },
];

const ToggleDays = ({ days, toggleFn }) => {
    return (
        <div className="flex">
            {DAYS.map((day, index) => {
                return (
                    <div
                        value={index}
                        key={day.key}
                        onClick={() => toggleFn(index)} // Toggle selection on click
                        className={
                            "m-2 bg-indigo-300 p-2 rounded-[50%] w-10 h-10 leading-6 text-white font-bold hover:cursor-pointer text-center " +
                            (days.includes(index) && "bg-indigo-500")
                        }
                    >
                        {day.label}
                    </div>
                );
            })}
        </div>
    );
};

export default ToggleDays;
