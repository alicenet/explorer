import React from "react";
import { Accordion } from "./Accordion";
import { useTheme } from "@mui/material";

export function PrimaryAccordion(props) {

    const { children, ...rest } = props;
    const theme = useTheme();

    return (

        <Accordion
            sx={{
                borderTop: `2px solid ${theme.palette.primary.main}`,
                background: theme.palette.tableBlack.main
            }}
            {...rest}
        >
            {children}
        </Accordion>

    );

}