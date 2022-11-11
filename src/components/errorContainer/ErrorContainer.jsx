import React from "react";
import { Box, useTheme } from "@mui/material";

export function ErrorContainer({ children }) {

    const theme = useTheme();

    return (

        <Box
            display="flex"
            flexDirection="column"
            textAlign="left"
            paddingY={4}
            paddingX={6}
            gap={3}
            borderRadius={2}
            sx={{
                borderTop: `4px solid ${theme.palette.secondary.main}`,
                background: theme.palette.secondary.dark
            }}
        >

            {children}

        </Box>

    );

}
