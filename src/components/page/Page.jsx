import React from "react";
import { Header, Footer } from "components";

export const Page = ({ children }) => {

    return (
        <div className="flex flex-col justify-between min-h-screen max-w-screen-lg px-4 mx-auto">

            <div>

                <Header />

                <div>

                    {children}

                </div>

            </div>

            <Footer />

        </div>
    );
};