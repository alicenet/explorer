import React from "react";
import { Page } from "components";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

export function LoadingBackdrop({ isLoading }) {
    return (
        <Page>
            <Backdrop open={isLoading}>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={3}>
                    <Typography className="text-3xl">Loading</Typography>
                    <CircularProgress />
                </Box>
            </Backdrop>
        </Page>
    );

}
