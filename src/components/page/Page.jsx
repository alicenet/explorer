import React from "react";
import { Footer, Header } from "components";
import { Box } from "@mui/material";

export const Page = ({ children }) => {

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            className="min-h-screen max-w-7xl px-4 mx-auto"
        >

            <div>

                <Header />

                {children}

            </div>

            <Footer />

        </Box>
    );
};