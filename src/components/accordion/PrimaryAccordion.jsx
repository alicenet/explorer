import React from "react";
import { Accordion } from "./Accordion";
import { Box, useTheme } from "@mui/material";

export function PrimaryAccordion(props) {

    const { padded, children, ...rest } = props;
    const theme = useTheme();

    return (

        <Accordion
            sx={{
                borderTop: `2px solid ${theme.palette.primary.main}`,
                background: theme.palette.tableBlack.main
            }}
            {...rest}
        >
            {padded ?
                <Box
                    padding={2} gap={2} display={"flex"} flexDirection={"column"}
                    className="rounded-md rounded-t-none"
                    sx={{ background: theme.palette.headerBlack.main }}
                >
                    {children}
                </Box>
                : children
            }

        </Accordion>


    );

}