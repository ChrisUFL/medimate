import React from "react";
import ProviderLayout from "@/Layouts/ProviderLayout";
import { useForm } from "@inertiajs/react";
import ShadowBox from "@/Components/ShadowBox";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

const Edit = ({
    id,
    patient,
    employees = [],
    dateTime,
    first_name,
    last_name,
    doctor,
}) => {
    const dateTimeString = dateTime.substring(0, 16);
    const { data, setData, patch, processing, errors, transform } = useForm({
        patientId: patient,
        doctorId: doctor,
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
        e.preventDefault(),
            patch(
                route("appointments.update", {
                    appointment: id,
                })
            );
    };

    const employeesOptions = employees.map((employee) => {
        const name = employee.first_name + " " + employee.last_name;
        return {
            value: employee.id,
            label: name,
        };
    });

    const currentDoctor = employeesOptions.find(
        (employee) => employee.value === doctor
    );

    return (
        <ProviderLayout pageTitle={"Create Appointment"}>
            <div className="w-96">
                <form onSubmit={submit}>
                    <ShadowBox styles={"h-[320px] py-8"}>
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
                            <Select
                                options={employeesOptions}
                                defaultValue={currentDoctor}
                                onChange={(e) => setData("doctorId", e?.value)}
                                isClearable={true}
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel value="Select Time" htmlFor="time" />
                            <TextInput
                                type="datetime-local"
                                name="time"
                                value={data.appointmentTime}
                                onChange={(e) =>
                                    setData("appointmentTime", e.target.value)
                                }
                                className="w-[100%]"
                            />
                            <InputError message={errors.appointmentTime} />
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

export default Edit;
