import React, { useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Accordion as MUIAccordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";

export function Accordion({ children, title, itemsCount, icon = false, sx }) {

    const [isBlockOpen, toggleAccordion] = useState(true);

    return (

        <MUIAccordion
            disableGutters
            defaultExpanded
            sx={{ ...sx, borderRadius: 1 }}
        >

            <AccordionSummary
                sx={{ wordBreak: "break-all", paddingX: 0, paddingY: 1 }}
                onClick={() => toggleAccordion(prevState => !prevState)}
            >

                <Box display="flex" sx={{ cursor: "pointer" }} gap={1} paddingX={3}>
                    <Box display="flex" alignItems="center" gap={1}>
                        {icon}
                        <h3>{title}</h3>
                        {
                            itemsCount &&
                            <Typography variant="span" sx={{ backgroundColor: "black", paddingX: 1, borderRadius: 1 }}>
                                {itemsCount}
                            </Typography>
                        }
                    </Box>
                    {isBlockOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                </Box>

            </AccordionSummary>

            <AccordionDetails sx={{ padding: 0 }}>
                {children}
            </AccordionDetails>

        </MUIAccordion>

    );

}