import React from "react";
import { Box, Paper, useTheme } from "@mui/material";

export function ErrorContainer({ children }) {

    const theme = useTheme();

    return (
        <Paper>
            <Box
                display="flex"
                flexDirection="column"
                textAlign="left"
                paddingY={4}
                paddingX={6}
                gap={3}
                borderRadius={2}
                borderTop={`4px solid ${theme.palette.secondary.main}`}
            >
                {children}
            </Box>
        </Paper>

    );

}
