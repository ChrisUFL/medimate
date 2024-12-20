// Edit.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, usePage } from "@inertiajs/react";
import Logout from "./Partials/Logout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [theme, setTheme] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const initialTheme = localStorage.getItem("theme") || user?.theme_preference || "light";
        setTheme(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
        setMounted(true);
    }, [user]);

    const toggleTheme = async () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        if (user) {
            try {
                await axios.patch("/user/theme", { theme_preference: newTheme });
            } catch (error) {
                console.error("Failed to save theme preference", error);
            }
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-[var(--text-color)] leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-[var(--submenu-bg-color)] shadow sm:rounded-lg">
                        <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
                    </div>
                    <div className="p-4 sm:p-8 bg-[var(--submenu-bg-color)] shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    <div className="p-4 sm:p-8 bg-[var(--submenu-bg-color)] shadow sm:rounded-lg">
                        <Logout />
                    </div>
                    <div className="p-4 sm:p-8 bg-[var(--submenu-bg-color)] shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                 
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
