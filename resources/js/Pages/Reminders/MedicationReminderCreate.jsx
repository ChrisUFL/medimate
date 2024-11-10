import ShadowBox from "@/Components/ShadowBox";
import SimpleLayout from "@/Layouts/SimpleLayout";
import React from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { Textarea } from "@headlessui/react";
import ToggleDays from "@/Components/ToggleDays";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

const MedicationReminderCreate = () => {
    const [days, setDays] = useState([]);
    const { data, setData, post, processing, errors, transform } = useForm({
        name: "",
        description: "",
        time: "",
        frequency: "once",
        timezoneOffset: new Date().getTimezoneOffset().toString(),
    });

    transform((data) => ({
        ...data,
        time: convertTime(data.time),
        days: days,
    }));

    const convertTime = (time) => {
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date.toISOString();
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data.days);
        post(route("reminder.store"));
    };

    const toggleDay = (index) => {
        setDays(
            (prevDays) =>
                prevDays.includes(index)
                    ? prevDays.filter((day) => day !== index) // Remove if already selected
                    : [...prevDays, index] // Add if not selected
        );
    };

    return (
        <div>
            <SimpleLayout title={"Medication Reminder"}>
                <ShadowBox styles={"flex justify-center"}>
                    <form onSubmit={submit}>
                        <div className="">
                            <InputLabel value="Medication Name" />
                            <TextInput
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-[100%]"
                            />
                            <InputError value={errors.name} />
                        </div>
                        <div className="mt-3">
                            <InputLabel value="Notes" />
                            <Textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="border-gray-300 rounded-md w-[100%]"
                                placeholder="1 Pill - 250mg"
                            />
                            <InputError value={errors.name} />
                        </div>
                        <div className="mt-3">
                            <InputLabel value="Days" />
                            <ToggleDays days={days} toggleFn={toggleDay} />
                            <InputError value={errors.days} />
                        </div>
                        <div className="mt-3">
                            <InputLabel value="Time" />
                            <TextInput
                                type="time"
                                value={data.time}
                                onChange={(e) =>
                                    setData("time", e.target.value)
                                }
                                className="w-[100%]"
                            />
                            <InputError value={errors.name} />
                        </div>
                        <div className="mt-3">
                            <InputLabel value="Frequency" />
                            <select
                                value={data.frequency}
                                onChange={(e) =>
                                    setData("frequency", e.target.value)
                                }
                                className="w-[100%] border-gray-300 rounded-md"
                            >
                                <option value="once">Once</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                            <InputError value={errors.name} />
                        </div>
                        <div className="mt-3 flex justify-end gap-3">
                            <PrimaryButton disabled={processing}>
                                Submit
                            </PrimaryButton>
                        </div>
                    </form>
                </ShadowBox>
            </SimpleLayout>
        </div>
    );
};

export default MedicationReminderCreate;
