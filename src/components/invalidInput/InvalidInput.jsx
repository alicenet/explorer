import React from "react";
import { Error } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

export function InvalidInput({ term, suggestion }) {

    const history = useHistory();

    return (

        <Box className="border-0 border-t-4 border-neonred rounded-md bg-deeppurple py-10 px-14 flex flex-col gap-7">

            <Box className="flex flex-col font-bold text-left">
                <Box className="flex flex-row items-center gap-3 text-5xl">
                    <Error className="text-5xl" />
                    <h2>OOPS!</h2>
                </Box>
                <h3 className="text-2xl">Invalid Input</h3>
            </Box>

            <Box className="flex flex-col break-all text-left">
                <span>
                    The search data you entered was: <span className="font-bold">{term}</span>
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
                    <span className="text-neongreen">
                    {suggestion}
                </span>
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

        </Box>

    );

}
