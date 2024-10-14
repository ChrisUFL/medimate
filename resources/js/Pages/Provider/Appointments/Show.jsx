import React from "react";
import ProviderLayout from "@/Layouts/ProviderLayout";
import { useForm, router } from "@inertiajs/react";
import ShadowBox from "@/Components/ShadowBox";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";

const Show = ({ id, first_name, last_name, doctor, dateTime }) => {
    let time = "";
    let date = "";

    console.log(dateTime);
    if (dateTime !== undefined) {
        const [datePart, timePart] = dateTime.split("T");
        time = timePart?.substring(0, 5);
        date = datePart;
    }

    const edit = () => {
        router.get(
            route(
                "appointments.edit",
                {
                    appointment: id,
                },
                false
            )
        );
    };

    const destroy = () => {
        router.delete(
            route(
                "appointments.destroy",
                {
                    appointment: id,
                },
                false
            )
        );
    };

    return (
        <ProviderLayout pageTitle={"Create Appointment"}>
            <div className="w-96">
                <ShadowBox styles={"h-[400px] py-8"}>
                    <div>
                        <InputLabel value="User" />
                        <TextInput
                            value={first_name + " " + last_name}
                            readOnly={true}
                            className="w-[100%]"
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel value="Doctor" />
                        <TextInput
                            value={doctor}
                            readOnly={true}
                            className="w-[100%]"
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel value="Date" htmlFor="date" />
                        <TextInput
                            type="date"
                            name="date"
                            value={date}
                            readOnly={true}
                            className="w-[100%]"
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel value="Appointment Time" htmlFor="time" />
                        <TextInput
                            type="time"
                            name="time"
                            value={time}
                            readOnly={true}
                            className="w-[100%]"
                        />
                    </div>
                    <div className="flex justify-end mt-4 gap-2">
                        <PrimaryButton onClick={edit}>Edit</PrimaryButton>
                        <DangerButton onClick={destroy}>Delete</DangerButton>
                    </div>
                </ShadowBox>
            </div>
        </ProviderLayout>
    );
};

export default Show;
