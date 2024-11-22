import { useState, useEffect } from "react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Set the theme preference on page load
    useEffect(() => {
        const theme = user.theme_preference || 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }, [user.theme_preference]);

    return (
        <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)]">
            <nav className="bg-[var(--navbar-bg-color)] border-b border-[var(--border-color)]">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <Navbar />

                        <div className="flex items-center -me-2 sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown((prev) => !prev)
                                }
                                className="inline-flex items-center justify-center p-2 text-[var(--navbar-text-color)] transition duration-150 ease-in-out rounded-md hover:text-[var(--link-hover-color)] hover:bg-[var(--hover-bg-color)] focus:outline-none focus:bg-[var(--hover-bg-color)] focus:text-[var(--link-hover-color)]"
                            >
                                <svg
                                    className="w-6 h-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown ? "inline-flex" : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown ? "inline-flex" : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route("web.home")} active={route().current("dashboard")}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-[var(--border-color)]">
                        <div className="px-4">
                            <div className="text-base font-medium text-[var(--text-color)]">{user.name}</div>
                            <div className="text-sm font-medium text-[var(--secondary-text-color)]">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route("logout")} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-[var(--navbar-bg-color)]">
                    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
