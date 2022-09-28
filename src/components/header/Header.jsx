import React from "react";
import { HeaderMobile } from "./HeaderMobile";
import { useMediaQuery, useTheme } from "@mui/material";
import { HeaderDesktop } from "./HeaderDesktop";

export function Header() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (

        <>

            {isMobile ? <HeaderMobile /> : <HeaderDesktop />}

        </>

    );

}
