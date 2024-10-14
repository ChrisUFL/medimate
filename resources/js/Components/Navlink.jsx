import { Link } from "@inertiajs/react";
import React from "react";

const Navlink = ({ name, routeName }) => {
    let className = "";

    if (route().current(routeName)) {
        className = "text-indigo-600 font-extrabold border-indigo-400";
    }

    return (
        <Link href={route(`${routeName}`)} className={className}>
            {name}
        </Link>
    );
};

export default Navlink;
