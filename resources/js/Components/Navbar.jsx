import { Link, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Navlink from "./Navlink";
import logoLight from "../../../public/static/images/logo.svg";
import logoDark from "../../../public/static/images/logo-dark.svg";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
    const { auth } = usePage().props;
    const user = auth?.user;


    let loginText = "Login";
    let routeName = "login";

    if (user) {
        loginText = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
        routeName = "profile.edit";
    }

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            setTheme(localTheme);
            document.documentElement.setAttribute('data-theme', localTheme);
        } else if (user && user.theme_preference) {
            setTheme(user.theme_preference);
            document.documentElement.setAttribute('data-theme', user.theme_preference);
            localStorage.setItem('theme', user.theme_preference);
        } else {
            setTheme('light');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

    
    };

    return (
        <div className="w-screen font-medium leading-8 text-center navbar py-7">
            <div className="content flex align-middle justify-between px-10 max-w-[1280px] m-auto">
                <div className="flex logo">
                    <Link href={route("web.home")}>
                        <div className="flex items-center">
                            <img 
                                src={theme === 'dark' ? logoDark : logoLight}
                                alt="MediMate logo" 
                                width={32} 
                                height={32} 
                            />
                            <span className="ml-2 text-[var(--medimate-text-color)]">MediMate</span>
                        </div>
                    </Link>
                </div>

                <div className="flex gap-5 links">
                    <Navlink name="Home" routeName="web.home" />
                    <Navlink name="Medications" routeName="web.medications" />
                    <Navlink name="Medication Reminders" routeName="reminder.index"/>
                    <Navlink name="Notes" routeName="notes.index" />
                    <Navlink name="Fitness" routeName="web.fitness" />
                    <Navlink name="Contact Book" routeName="web.addressbook" />
                </div>

                <div className="flex items-center gap-5 account">
                    <Link href={route(routeName)} className="navlink">{loginText}</Link>
                    {user ? null : <Link href={route('register')} className="navlink">Register</Link>}

                    <div
                        onClick={toggleTheme}
                        className="flex items-center p-1 transition-all duration-300 bg-gray-200 rounded-full cursor-pointer dark:bg-gray-600"
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
