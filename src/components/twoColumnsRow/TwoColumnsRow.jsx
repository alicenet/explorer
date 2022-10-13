import React from "react";
import { HelpTooltip } from "components";
import { classNames } from "utils";
import { Grid, useTheme } from "@mui/material";

export function TwoColumnsRow({ title, tooltipContent, children, size = 3, lastRow = false }) {

    const theme = useTheme();

    return (

        <Grid
            container
            paddingX={3}
            sx={{ backgroundColor: theme.palette.rowBlack.main }}
            className={
                classNames("border-0 border-t border-tableblack mobile:p-3",
                    { "rounded-b-md": lastRow }
                )
            }
        >
            <Grid item sm={12} md={size} className="flex items-center gap-3 py-4 mobile:p-2">
                <HelpTooltip content={tooltipContent} />
                <p>{title}</p>
            </Grid>
            <Grid item sm={12} md={12 - size} className="w-full flex items-center gap-5 py-4 mobile:p-2">
                {children}
            </Grid>
        </Grid>

    );

}