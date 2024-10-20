import React from "react";
import { Link } from "@inertiajs/react";
import logo from "../../../public/static/images/logo.svg";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-10">
            <div>
                <Link href="/">
                    <img
                        src={logo}
                        className="w-20 h-20 fill-current text-slate-500"
                    />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
