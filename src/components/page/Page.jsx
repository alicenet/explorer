import React from "react";
import { Footer, Header } from "components";

export const Page = ({ children }) => {

    return (
        <div className="flex flex-col justify-between min-h-screen max-w-7xl px-4 mx-auto">

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