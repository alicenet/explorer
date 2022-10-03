import React, { useState } from "react";
import { classNames as csx } from "utils";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export function CollapsableCard({
    children,
    title,
    itemsCount,
    icon = false,
    borderless = false,
    classNames = '',
    ...props
}) {
    const [isBlockOpen, toggleAccordion] = useState(true);

    return (

        <div
            className={
                csx(
                    "border-0 rounded-md text-left",
                    { "border-t-2 border-neongreen": !borderless },
                    classNames
                )
            }
        >

            <Accordion disableGutters className="bg-tableblack" {...props} defaultExpanded>

                <AccordionSummary
                    className={csx("break-all px-0 py-2", classNames)}
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

            </Accordion>

        </div>

    );
}