import { React, useState } from "react";
import ShadowBox from "@/Components/ShadowBox";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";

const Profile = ({ isActive, patientData, patientId }) => {
    const { data, setData, patch, processing, errors, reset } = useForm({
        ...patientData,
    });

    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const editProfile = () => {
        if (isEditingProfile) {
            patch(
                route(
                    "patients.update",
                    {
                        patient: patientId,
                    },
                    false
                )
            );
        }

        setIsEditingProfile(true);
    };

    return (
        <ShadowBox styles={isActive ? "block" : "hidden"}>
            <div className="flex justify-center mb-6">
                <img
                    src="https://placehold.co/100"
                    alt="Profile Picture"
                    className="rounded-[50%]"
                />
            </div>
            <form onSubmit={editProfile}>
                <div className="flex gap-10">
                    <div className="w-1/2">
                        <div className="flex flex-col items-center w-[100%] gap-6">
                            <div className="flex w-[100%] justify-between">
                                <div className="w-1/2">
                                    <InputLabel value="First Name" />
                                    <TextInput
                                        value={data.first_name}
                                        readOnly={
                                            isEditingProfile ? false : true
                                        }
                                        onChange={(e) => {
                                            setData(
                                                "first_name",
                                                e.target.value
                                            );
                                        }}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputLabel value="Last Name" />
                                    <TextInput
                                        value={patientData.last_name}
                                        readOnly={
                                            isEditingProfile ? false : true
                                        }
                                        className="w-[100%]"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-[100%]">
                                <InputLabel value="Email" />
                                <TextInput value={data.email} readOnly={true} />
                            </div>
                            <div className="flex flex-col w-[100%]">
                                <InputLabel value="Phone" />
                                <TextInput
                                    value={data.phone_number}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex flex-col w-[100%]">
                                <InputLabel value="Address" />
                                <TextInput
                                    value={data.address}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex flex-col items-center w-[100%] gap-6">
                            <div className="flex w-[100%] justify-center">
                                <div className="w-1/2">
                                    <InputLabel value="Gender" />
                                    <TextInput
                                        value={data.gender}
                                        readOnly={true}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputLabel value="Language" />
                                    <TextInput
                                        value={data.language}
                                        readOnly={true}
                                        className="w-[100%]"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-[100%]">
                                <InputLabel value="Date of Birth" />
                                <TextInput
                                    value={data.date_of_birth}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex flex-col w-[100%]">
                                <InputLabel value="Place Holder" />
                                <TextInput
                                    value={"Place Holder"}
                                    readOnly={true}
                                />
                            </div>
                            <div className="flex flex-col w-[100%]">
                                <InputLabel value="Place Holder" />
                                <TextInput
                                    value={"Place Holder"}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-3">
                    {!isEditingProfile && (
                        <PrimaryButton
                            onClick={() => setIsEditingProfile(true)}
                        >
                            Edit
                        </PrimaryButton>
                    )}
                    {isEditingProfile && (
                        <PrimaryButton onClick={editProfile}>
                            Save
                        </PrimaryButton>
                    )}
                    {!isEditingProfile && (
                        <DangerButton onClick={() => console.log("Clicked")}>
                            Delete
                        </DangerButton>
                    )}
                    {isEditingProfile && (
                        <DangerButton
                            onClick={() => setIsEditingProfile(false)}
                        >
                            Cancel
                        </DangerButton>
                    )}
                </div>
            </form>
        </ShadowBox>
    );
};

export default Profile;
