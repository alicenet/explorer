import React from "react";
import { Footer, Header } from "components";
import { Box } from "@mui/material";

export const Page = ({ children }) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            maxWidth="80rem"
            paddingX={2}
            marginX="auto"
            minHeight="100vh"
        >

            <Box>

                <Header />

                {children}

            </Box>

            <Footer />

        </Box>
    );
};