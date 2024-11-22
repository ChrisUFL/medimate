import { Link } from "@inertiajs/react";
import React from "react";

const Navlink = ({ name, routeName }) => {
    // Determine if the link is active
    const isActive = route().current(routeName);
    const linkClass = `navlink ${isActive ? "navlink-active" : ""}`;

    return (
        <Link href={route(routeName)} className={linkClass}>
            {name}
        </Link>
    );
};

export default Navlink;
