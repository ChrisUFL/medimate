import React from "react";
import { FaUserShield } from "react-icons/fa6";

const Topbar = () => {
    return (
        <div className="flex justify-between px-8 py-4 bg-gray-800 border-gray-700 border-b-[1px] text-white">
            <div>MediMate</div>
            <div>
                <FaUserShield className="inline h-5 w-5 mr-3" />
                <span className="leading-5 align-bottom">USER</span>
            </div>
        </div>
    );
};

export default Topbar;
