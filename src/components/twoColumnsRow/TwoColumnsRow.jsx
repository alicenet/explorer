import React from "react";
import { HelpTooltip } from "components";
import { classNames } from "utils";
import { Grid } from "@mui/material";

export function TwoColumnsRow({ title, tooltipContent, children, lastRow = false }) {

    return (

        <Grid container
              className={
                  classNames("px-6 bg-rowblack border-0 border-t border-tableblack mobile:p-2",
                      { 'rounded-b-md': lastRow }
                  )
              }
        >
            <Grid item sm={12} md={3} className="flex items-center gap-3 py-4 mobile:p-2">
                <HelpTooltip content={tooltipContent} />
                <p>{title}</p>
            </Grid>
            <Grid item sm={12} md={9} className="w-full flex items-center gap-5 py-4 mobile:p-2">
                {children}
            </Grid>
        </Grid>

    );

}