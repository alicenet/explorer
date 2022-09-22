import React from "react";
import { Container } from "semantic-ui-react";
import { HeaderMobile } from "./HeaderMobile";
import { useMediaQuery, useTheme } from "@mui/material";
import { HeaderDesktop } from "./HeaderDesktop";

export function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (

        <Container fluid className="sticky top-0 bg-dark opacity-90 mobile:px-5">

            {isMobile ? <HeaderMobile /> : <HeaderDesktop />}

        </Container>

    );

}
