import React from "react";
import { Box } from "@mui/material";

export function ErrorContainer({ children }) {

    return (

        <Box
            display="flex"
            flexDirection="column"
            textAlign="left"
            paddingY={4}
            paddingX={6}
            gap={3}
            className="border-0 border-t-4 border-neonred rounded-md bg-deeppurple"
        >

            {children}

        </Box>

    );

}
