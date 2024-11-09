import { Link } from "@inertiajs/react";
import React from "react";
import { FaUserLarge, FaBuilding } from "react-icons/fa6";

const Navbar = () => {
    return (
        <div className="px-4 py-4 content-center w-1/5 text-start left-0">
            <div className="content-center">
                <Link href="/">
                    <FaUserLarge className="h-4 w-4 leading-10 inline mr-3" />
                    <span className="leading-10 align-middle">Users</span>
                </Link>
            </div>
            <div className="content-start inline">
                <Link href="/">
                    <FaBuilding className="h-4 w-4 leading-10 inline mr-3" />
                    <span className="leading-10 align-middle">Copmanies</span>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
