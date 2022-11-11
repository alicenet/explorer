import React from "react";
import { Accordion } from "./Accordion";
import { useTheme } from "@mui/material";

export function TertiaryAccordion(props) {

    const { children, ...rest } = props;
    const theme = useTheme();

    return (

        <Accordion sx={{ background: theme.palette.headerBlack.main }} {...rest}>
            {children}
        </Accordion>

    );

}