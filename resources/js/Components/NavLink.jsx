import React from "react";
import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    const baseClasses = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ";
    const activeClasses = "border-indigo-400 focus:border-indigo-700 ";
    const inactiveClasses = "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300";

    // If the link is active, render a <span> instead to make it non-clickable
    if (active) {
        return (
            <span className={`${baseClasses} ${activeClasses} ${className}`}>
                {children}
            </span>
        );
    }

    // Otherwise, render the link as usual
    return (
        <Link
            {...props}
            className={`${baseClasses} ${inactiveClasses} ${className}`}
        >
            {children}
        </Link>
    );
}
