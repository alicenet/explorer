import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "assets/MadNetwork Logo Horizontal GRAYSCALE.png";
import Image from "mui-image";
import { AppBar, Box, Container, Drawer, IconButton, Link, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { HeaderMobile } from "./HeaderMobile";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

const WALLET_LINUX_URL = process.env.REACT_APP_WALLET_LINUX_URL;
const WALLET_MAC_URL = process.env.REACT_APP_WALLET_MAC_URL;
const WALLET_WINDOWS_URL = process.env.REACT_APP_WALLET_WINDOWS_URL;

const MenuDivider = () => <div className="border-r border-gray-700" />;

const MenuLink = ({ location, label, blank = false }) => {
        const history = useHistory();

        return (
            <Link
                color={"white"}
                className="hover:text-neongreen cursor-pointer"
                underline="none"
                onClick={() => blank ? window.open(location, '_blank').focus() : history.push(location)}
            >
                {label}
            </Link>
        );
    }
;

const sections =
    [
        {
            label: "Monitor",
            location: "/",
            displayCallback: ({ location, label }) => <MenuLink location={location} label={label} />
        },
        {
            label: "About",
            location: "/about",
            displayCallback: ({ location, label }) => <MenuLink location={location} label={label} />
        },
        {
            label: "GitHub",
            location: GITHUB_URL,
            displayCallback: ({ location, label }) => <MenuLink location={location} label={label} blank />
        },
        {
            label: "White Paper",
            location: WHITE_PAPER_URL,
            displayCallback: ({ location, label }) => <MenuLink location={location} label={label} blank />
        },
    ];

export function Header() {
    const history = useHistory();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <AppBar component="nav" position="sticky" className="bg-dark shadow-none opacity-90">

                <Container className="px-0 py-1">

                    <Toolbar disableGutters>

                        <Image
                            duration={0}
                            onClick={() => history.push(`/`)}
                            className="cursor-pointer"
                            src={Logo}
                            width="205px"
                            style={{ filter: "invert(100%)" }}
                        />

                        <Box justifyContent={"end"} flexGrow={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleDrawerToggle}
                                className="text-white"
                            >
                                <MenuIcon fontSize={"large"} />
                            </IconButton>
                        </Box>

                        <Box gap={2} justifyContent={"end"} flexGrow={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {sections.map((section, index, { length }) => (
                                <React.Fragment key={`menu-link-${index}`}>
                                    {section.displayCallback(section)}
                                    {index + 1 < length && <MenuDivider />}
                                </React.Fragment>
                            ))}
                        </Box>

                    </Toolbar>

                </Container>

            </AppBar>

            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    PaperProps={{ className: "bg-rowblack" }}
                    sx={{ display: { sm: 'block', md: 'none' } }}
                >
                    <Box>
                        <HeaderMobile />
                    </Box>
                </Drawer>

            </Box>

        </>
    );

}
