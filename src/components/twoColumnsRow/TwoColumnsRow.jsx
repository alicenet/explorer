import React from "react";
import { HelpTooltip } from "components";
import { classNames } from "utils";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

export function TwoColumnsRow({ title, tooltipContent, children, size = 3, lastRow = false }) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    return (

        <Grid
            container
            paddingX={4}
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
            <Grid
                item
                xs={12}
                md={size}
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ padding: { xs: 1, md: 0 } }}
            >
                {matches && tooltipContent && <HelpTooltip content={tooltipContent} />}
                <Typography variant="span">{title}</Typography>
            </Grid>

            <Grid
                item
                xs={12}
                md={12 - size}
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ padding: { xs: 1, md: 0 } }}
            >
                {children}
            </Grid>
        </Grid>

    );

}