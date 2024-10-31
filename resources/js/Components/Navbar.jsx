import { Link, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Navlink from "./Navlink";
import logo from "../../../public/static/images/logo.svg";
import { FaSun, FaMoon } from "react-icons/fa"; // Sun and moon icons
import axios from "axios"; // For backend updates

const Navbar = () => {
    const user = usePage().props.auth.user;

    // Determine login text and route based on authentication status
    let loginText = "Login";
    let routeName = "login";

    if (user) {
        loginText = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
        routeName = "profile.edit";
    }

    // Theme toggle logic: state for theme and effect to apply it
    const [theme, setTheme] = useState(user.theme_preference || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Toggle theme function: update state, backend, and document attribute
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        axios.patch('/user/theme', { theme_preference: newTheme });
    };

    return (
        <div className="w-screen font-medium leading-8 text-center bg-white text-l py-7">
            <div className="content flex align-middle justify-between px-10 max-w-[1280px] m-auto">
                <div className="flex logo">
                    <Link href={route("web.home")}>
                        <div className="flex">
                            <img src={logo} alt={"logo"} width={32} height={32} />
                            <span className="ml-2">MediMate</span>
                        </div>
                    </Link>
                </div>

                <div className="flex gap-5 links">
                    <Navlink name="Home" routeName="web.home" />
                    <Navlink name="Medications" routeName="web.medications" />
                    <Navlink name="Notes" routeName="notes.index" />
                    <Navlink name="Appointments" routeName="web.appointments" />
                    <Navlink name="Fitness" routeName="web.fitness" />
                </div>

                <div className="flex items-center gap-5 account">
                    <Link href={route(routeName)}>{loginText}</Link>
                    {user ? (
                        <></>
                    ) : (
                        <Link href={route(`register`)}> Register </Link>
                    )}

                    {/* Theme Toggle Switch */}
                    <div
                        onClick={toggleTheme}
                        className={`cursor-pointer flex items-center rounded-full p-1 bg-gray-200 dark:bg-gray-600 transition-all duration-300`}
                        style={{ width: '50px', height: '24px', position: 'relative' }}
                    >
                        <div
                            className={`flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                                theme === 'dark' ? 'translate-x-6' : ''
                            }`}
                        >
                            {theme === 'light' ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-500" />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
