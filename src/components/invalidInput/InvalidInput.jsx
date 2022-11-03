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

            <Box display="flex" flexDirection="column" className="font-bold">
                <Box display="flex" flexDirection="row" alignItems="center" gap={1} className="text-5xl">
                    <Error className="text-5xl" />
                    <h2>OOPS!</h2>
                </Box>
                <h3 className="text-2xl">Invalid Input</h3>
            </Box>

            <Box display="flex" flexDirection="column">
                <span>
                    The search data you entered was:&nbsp;
                    <Typography sx={{ wordBreak: "break-all" }} variant="span" className="font-bold">
                        {term}
                    </Typography>
                </span>
                <span>
                    Sorry! This is an invalid search entry.
                </span>
            </Box>

            {suggestion && (
                <Box display="flex" flexDirection="column">
                    <span>
                        Instead please try:
                    </span>
                    <Typography sx={{ color: theme.palette.primary.main }} variant="span">
                        {suggestion}
                    </Typography>
                </Box>
            )}

            <Box>
                <Button
                    variant="contained"
                    onClick={() => history.push('/')}
                    sx={{ paddingX: 4 }}
                >
                    Back to Monitor
                </Button>
            </Box>

        </ErrorContainer>

    );

}
