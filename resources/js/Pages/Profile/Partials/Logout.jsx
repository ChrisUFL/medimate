import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

function Logout({ className }) {
    const page = usePage();

    const logout = () => {
        router.post(route("logout"), {
            _token: page.props.csrf_token,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Log out</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Protect your privacy by logging out when you're done.
                </p>
            </header>

            <PrimaryButton onClick={logout} className="mt-3">
                Log out
            </PrimaryButton>
        </section>
    );
}

export default Logout;
