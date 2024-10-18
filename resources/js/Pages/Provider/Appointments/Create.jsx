/* eslint-disable no-undef */
import React from "react";
import ProviderLayout from "@/Layouts/ProviderLayout";
import { useForm } from "@inertiajs/react";
import ShadowBox from "@/Components/ShadowBox";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";

const Create = ({ patients, employees }) => {
    let dateTimeString = "";
    if (route().params.dateTime) {
        dateTimeString = route().params.dateTime + "T00:00:00";
    }

    const { data, setData, post, processing, errors, transform } = useForm({
        patientId: null,
        doctorId: null,
        appointmentTime: dateTimeString ?? "",
    });

    transform((data) => {
        const appointmentTime = new Date(data.appointmentTime);
        appointmentTime.setHours(
            appointmentTime.getHours() -
                appointmentTime.getTimezoneOffset() / 60
        );

        return {
            ...data,
            isoTime: appointmentTime.toISOString(),
        };
    });

    const submit = (e) => {
        e.preventDefault(), post(route("appointments.store"));
    };

    const options = patients.map((patient) => {
        const name =
            patient.first_name +
            " " +
            patient.last_name +
            " - " +
            patient.email;
        return {
            value: patient.id,
            label: name,
        };
    });

    const employeesOptions = employees.map((employee) => {
        const name = employee.first_name + " " + employee.last_name;

        return {
            value: employee.id,
            label: name,
        };
    });

    return (
        <ProviderLayout pageTitle={"Create Appointment"}>
            <div className="w-96">
                <form onSubmit={submit}>
                    <ShadowBox styles={"h-[400px] py-8"}>
                        <div>
                            <InputLabel value="User" />
                            <Select
                                options={options}
                                onChange={(e) => setData("patientId", e?.value)}
                                isClearable={true}
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Doctor" />
                            <Select
                                options={employeesOptions}
                                onChange={(e) => setData("doctorId", e?.value)}
                                isClearable={true}
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Select Date" htmlFor="date" />
                            <TextInput
                                type="datetime-local"
                                name="date"
                                value={data.appointmentTime}
                                onChange={(e) =>
                                    setData("appointmentTime", e.target.value)
                                }
                                className="w-[100%]"
                            />
                        </div>
                        <div className="mt-4">
                            <PrimaryButton disabled={processing}>
                                Submit
                            </PrimaryButton>
                        </div>
                    </ShadowBox>
                </form>
            </div>
        </ProviderLayout>
    );
};

export default Create;
