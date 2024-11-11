import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import logoLight from "../../../public/static/images/logo.svg";
import logoDark from "../../../public/static/images/logo-dark.svg";

export default function GuestLayout({ children }) {
    // State to hold the current theme
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Get the current theme from the data-theme attribute
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(currentTheme);
    }, []);

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[var(--background-color)] text-[var(--text-color)]">
            <div>
                <Link href="/">
                    <img
                        src={theme === 'dark' ? logoDark : logoLight}
                        className="w-20 h-20"
                        alt="Logo"
                    />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-[var(--submenu-bg-color)] shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
