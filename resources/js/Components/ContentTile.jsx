/* eslint-disable no-undef */
import React from "react";
import dbell from "../../../public/static/images/gym-dumbbell-icon.svg";
import { Link } from "@inertiajs/react";

const ContentTile = ({ image, title, data, color, dataType = "text" }) => {
    const placeHolder =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const listItems = [];

    if (dataType === "calendar") {
        for (const [k, v] of Object.entries(data.calendar)) {
            listItems.push(
                <Link href={route("web.home")}>
                    <li key={v.id}> {`${v.date} - ${v.title}`} </li>
                </Link>
            );
        }
    }

    if (dataType === "medication") {
        for (const [k, v] of Object.entries(data.medication)) {
            listItems.push(
                <Link href={route("web.home")}>
                    <li key={v.name}> {`${v.time} - ${v.name}`} </li>
                </Link>
            );
        }
    }

    return (
        <div
            className={`flex-col justify-center px-11 pb-10 text-white basis-3/12 h-[420px] ${color}`}
        >
            <img
                src={dbell}
                alt={title}
                className="flex h-[48px] mx-auto my-8"
            />

            <h1 className="flex justify-center text-3xl mb-3">
                This is a title
            </h1>

            <span className="flex text-left text-wrap">
                {dataType !== "text" ? <ul> {listItems} </ul> : placeHolder}
            </span>
        </div>
    );
};

export default ContentTile;
