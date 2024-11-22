import React from "react";
import ContentTile from "./ContentTile";
import { BsCapsulePill, BsGraphUp } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";

const HomeContent = ({ user, data }) => {
    return (
        <section className="title flex-col m-auto justify-center px-10 max-w-[1280px]">
            <div className="title flex-col m-auto justify-center">
                <h1 className="header text-slate-800 font-semibold text-7xl">
                    Medimate
                </h1>
                <h3 className="footer text-slate-800 font-normal text-xl mt-1">
                    Simplifying the Healthcare Process
                </h3>
            </div>

            <div className="flex mt-[120px] justify-center">
                <ContentTile
                    data={
                        "Keep track of your prescriptions with ease. Our medication lookup tool provides detailed information about your medications, ensuring you're always informed. Set reminders to take your doses on time and never miss a step in managing your health."
                    }
                    title="Medications"
                    color="bg-indigo-300"
                >
                    <BsCapsulePill className="h-10 w-10" />
                </ContentTile>
                <ContentTile
                    data={
                        "Achieve your health goals with integrated fitness tracking. Log your activities, set milestones, and stay motivated with personalized insights. Whether you're walking, running, or exercising at home, we're here to help you stay on track."
                    }
                    color="bg-indigo-400"
                    title="Fitness"
                >
                    <BsGraphUp className="h-10 w-10" />
                </ContentTile>
                <ContentTile
                    data={
                        "Stay connected with your healthcare team and loved ones. Our contact book allows you to store and organize important numbers, from doctors to emergency contacts, all in one secure place."
                    }
                    title="Contacts"
                    color="bg-indigo-500"
                >
                    <GrNotes className="h-10 w-10" />
                </ContentTile>
            </div>
        </section>
    );
};

export default HomeContent;
