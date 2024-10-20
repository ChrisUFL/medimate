import React from "react";
import Paginator from "./Paginator";

const Table = ({ tbodyData, paginatorData }) => {
    return (
        <div className="relative overflow-x-auto drop-shadow-md">
            <table className="w-full text-md text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Avatar</th>
                        <th className="px-6 py-3">First Name</th>
                        <th className="px-6 py-3">Last Name</th>
                        <th className="px-6 py-3">Email Address</th>
                    </tr>
                </thead>
                <tbody className="bg-white border-b">{tbodyData}</tbody>
            </table>
            {paginatorData && (
                <Paginator
                    links={paginatorData.links}
                    currentPage={paginatorData.current_page}
                    lastPage={paginatorData.last_page}
                />
            )}
        </div>
    );
};

export default Table;
