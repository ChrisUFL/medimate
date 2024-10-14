import { Link, usePage } from "@inertiajs/react";
import React from "react";
import Navlink from "./Navlink";
import logo from "../../../public/static/images/logo.svg";
import Dropdown from "./Dropdown";

const Navbar = () => {
    const user = usePage().props.auth.user;

    let loginText = "Login";
    let routeName = "login";

    if (user) {
        loginText =
            user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
        routeName = "profile.edit";
    }

    return (
        <div className="font-medium text-center text-l leading-8 py-7 bg-white w-screen">
            <div className="content flex align-middle justify-between px-10 max-w-[1280px] m-auto">
                <div className="logo flex">
                    <Link href={route("web.home")}>
                        <div className="flex">
                            <img
                                src={logo}
                                alt={"logo"}
                                width={32}
                                height={32}
                            />
                            <span className="ml-2">MediMate</span>
                        </div>
                    </Link>
                </div>

                <div className="links flex gap-5">
                    <Navlink name="Home" routeName="web.home" />
                    <Navlink name="Medications" routeName="web.medications" />
                    <Navlink name="Notes" routeName="notes.index" />
                    <Navlink name="Appointments" routeName="web.appointments" />
                    <Navlink name="Fitness" routeName="web.fitness" />
                </div>

                <div className="flex gap-5 account">
                    <Link href={route(routeName)}>{loginText}</Link>
                    {user ? (
                        <></>
                    ) : (
                        <Link href={route(`register`)}> Register </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
