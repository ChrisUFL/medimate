import React from "react";
import ContentTile from "./ContentTile";

const HomeContent = ({ user, data }) => {
    if (user !== undefined) {
        console.log(data);
        return (
            <section className="title flex-col m-auto justify-center px-10 max-w-[1280px]">
                <div className="title flex-col m-auto justify-center">
                    <h1 className="header text-slate-800 font-semibold text-7xl">
                        Medimate
                    </h1>
                    <h3 className="footer text-slate-800 font-normal text-xl mt-1">
                        Simplifying the Healthcare Process
                    </h3>
                </div>

                <div className="flex mt-[120px] justify-center">
                    <ContentTile
                        data={data}
                        dataType="calendar"
                        color="bg-indigo-300"
                    />
                    <ContentTile
                        data={data}
                        dataType="medication"
                        color="bg-indigo-400"
                    />
                    <ContentTile
                        data={data}
                        dataType="calendar"
                        color="bg-indigo-500"
                    />
                    <ContentTile
                        data={data}
                        dataType="calendar"
                        color="bg-indigo-600"
                    />
                </div>
            </section>
        );
    }

    return (
        <section className="title flex-col m-auto justify-center px-10 max-w-[1280px]">
            <div className="title flex-col m-auto justify-center">
                <h1 className="header text-slate-800 font-semibold text-7xl">
                    Medimate
                </h1>
                <h3 className="footer text-slate-800 font-normal text-xl mt-1">
                    Simplifying the Healthcare Process
                </h3>
            </div>

            <div className="flex mt-[120px] justify-center">
                <ContentTile color="bg-indigo-300" />
                <ContentTile color="bg-indigo-400" />
                <ContentTile color="bg-indigo-500" />
            </div>
        </section>
    );
};

export default HomeContent;
