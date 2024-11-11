import React from "react";
import Navbar from "../Components/Navbar";
import Topbar from "../Components/Topbar";
import { Head } from "@inertiajs/react";

const Layout = ({ title, users }) => {
    const noUsers = (
        <div className="flex justify-center m-8">No Users Found</div>
    );

    return (
        <>
            <Head title={title} />
            <div className="bg-slate-900 h-screen text-gray-400">
                <Topbar />
                <div className="flex">
                    <Navbar />
                    <div className="content w-3/5 bg-gray-800 h-full mt-8 rounded-md">
                        {noUsers}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
