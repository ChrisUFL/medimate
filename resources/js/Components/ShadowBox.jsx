import React from "react";

const ShadowBox = ({ children, styles }) => {
    return (
        <div
            className={`mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg ${styles} w-full`}
        >
            {children}
        </div>
    );
};

export default ShadowBox;
