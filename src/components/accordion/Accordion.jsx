import React, { useState } from "react";
import { classNames as csx } from "utils";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Accordion as MUIAccordion, AccordionDetails, AccordionSummary } from "@mui/material";

export function Accordion({ children, title, itemsCount, darkHeader = false, icon = false, sx }) {

    const [isBlockOpen, toggleAccordion] = useState(true);

    return (

        <MUIAccordion
            disableGutters
            defaultExpanded
            className={csx(
                "text-left rounded-md bg-tableblack",
            )}
            sx={sx}
        >

            <AccordionSummary
                className={
                    csx(
                        "rounded-md bg-tableblack break-all px-0 py-2",
                        { "bg-headerblack": darkHeader },
                        { "rounded-b-none": isBlockOpen }
                    )
                }
                onClick={() => toggleAccordion(prevState => !prevState)}
            >

                <div className="flex text-white cursor-pointer gap-3 px-6 mobile:justify-between">
                    <div className="flex items-center gap-3">
                        {icon}
                        <h3>{title}</h3>
                        {itemsCount && (
                            <span className="bg-black rounded-md px-2">
                            {itemsCount}
                        </span>
                        )}
                    </div>
                    {isBlockOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                </div>

            </AccordionSummary>

            <AccordionDetails className="p-0 text-white">
                {children}
            </AccordionDetails>

        </MUIAccordion>

    );

}