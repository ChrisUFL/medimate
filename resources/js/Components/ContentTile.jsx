/* eslint-disable no-undef */
import React from "react";
import dbell from "../../../public/static/images/gym-dumbbell-icon.svg";
import { Link } from "@inertiajs/react";

const ContentTile = ({ title, data, color, children }) => {
    return (
        <div
            className={`flex-col justify-center px-11 pb-10 text-white basis-3/12 h-[420px] ${color}`}
        >
            <div className="flex justify-center my-4">{children}</div>

            <h1 className="flex justify-center text-3xl mb-3">{title}</h1>

            <span className="flex text-left text-wrap">
                <ul> {data} </ul>
            </span>
        </div>
    );
};

export default ContentTile;
