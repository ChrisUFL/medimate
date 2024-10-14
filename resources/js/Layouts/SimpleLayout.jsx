import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import React from "react";

function SimpleLayout({ children, title }) {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <Head title={title} />
            <Navbar />
            <div className="content flex justify-center w-[1000px]">
                {children}
            </div>
        </div>
    );
}

export default SimpleLayout;