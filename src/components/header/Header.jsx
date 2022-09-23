import React from "react";
import { HeaderMobile } from "./HeaderMobile";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { HeaderDesktop } from "./HeaderDesktop";

export function Header() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (

        <Box className="sticky top-0 bg-dark opacity-90 mobile:px-5">

            {isMobile ? <HeaderMobile /> : <HeaderDesktop />}

        </Box>

    );

}
