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
                borderRadius={1}
                borderTop={2}
                borderColor={theme.palette.secondary.main}
            >
                {children}
            </Box>
        </Paper>

    );

}
