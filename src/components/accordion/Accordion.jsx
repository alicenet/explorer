import React from "react";
import { ExpandLess } from "@mui/icons-material";
import { Accordion as MUIAccordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";

export function Accordion({ children, title, itemsCount, icon = false, sx }) {

    return (

        <MUIAccordion
            disableGutters
            defaultExpanded
            sx={sx}
        >

            <AccordionSummary
                sx={{ wordBreak: "break-all", paddingX: 3, paddingY: 1 }}
                expandIcon={<ExpandLess />}
            >

                <Box display="flex" sx={{ cursor: "pointer" }} gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                        {icon}
                        <h3>{title}</h3>
                        {
                            itemsCount &&
                            <Typography variant="span" sx={{ background: "black", paddingX: 1, borderRadius: 1 }}>
                                {itemsCount}
                            </Typography>
                        }
                    </Box>
                </Box>

            </AccordionSummary>

            <AccordionDetails sx={{ padding: 0 }}>
                {children}
            </AccordionDetails>

        </MUIAccordion>

    );

}