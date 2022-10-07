import React from "react";
import { Error } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ErrorContainer } from "components";

export function InvalidInput({ term, suggestion }) {

    const history = useHistory();
    const theme = useTheme();

    return (

        <ErrorContainer>

            <Box className="flex flex-col font-bold">
                <Box className="flex flex-row items-center gap-3 text-5xl">
                    <Error className="text-5xl" />
                    <h2>OOPS!</h2>
                </Box>
                <h3 className="text-2xl">Invalid Input</h3>
            </Box>

            <Box className="flex flex-col">
                <span>
                    The search data you entered was: <span className="font-bold break-all">{term}</span>
                </span>
                <span>
                    Sorry! This is an invalid search entry.
                </span>
            </Box>

            {suggestion && (
                <Box className="flex flex-col">
                    <span>
                        Instead please try:
                    </span>
                    <Typography sx={{ color: theme.palette.primary.main }} variant={"span"}>
                        {suggestion}
                    </Typography>
                </Box>
            )}

            <Box>
                <Button
                    variant={"contained"}
                    className="px-8"
                    onClick={() => history.push('/')}
                >
                    Back to Monitor
                </Button>
            </Box>

        </ErrorContainer>

    );

}
