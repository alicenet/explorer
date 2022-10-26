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
            paddingY={2}
            sx={{
                backgroundColor: theme.palette.rowBlack.main,
                borderColor: theme.palette.tableBlack.main,
            }}
            className={
                classNames("border-0 border-t mobile:p-3",
                    { "rounded-b-md": lastRow }
                )
            }
        >
            <Grid item sm={12} md={size} display="flex" alignItems="center" gap={1} className="mobile:p-2">
                {tooltipContent && <HelpTooltip content={tooltipContent} />}
                <p>{title}</p>
            </Grid>
            <Grid item sm={12} md={12 - size} display="flex" alignItems="center" gap={1} className="mobile:p-2">
                {children}
            </Grid>
        </Grid>

    );

}