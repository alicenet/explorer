import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "assets/MadNetwork Logo Horizontal GRAYSCALE.png";
import Image from "mui-image";
import { AppBar, Box, Container, Drawer, IconButton, Link, Menu, MenuItem, Toolbar, useTheme } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Menu as MenuIcon } from '@mui/icons-material';
import { HeaderMobile } from "./HeaderMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { MenuDivider } from "components";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

const WALLET_MAC_URL = process.env.REACT_APP_WALLET_MAC_URL;
const WALLET_LINUX_URL = process.env.REACT_APP_WALLET_LINUX_URL;
const WALLET_WINDOWS_URL = process.env.REACT_APP_WALLET_WINDOWS_URL;

const MenuLink = ({ location, label, blank = false }) => {
    const history = useHistory();
    const theme = useTheme();

    return (
        <Link
            color="white"
            underline="none"
            sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
            onClick={() => blank ? window.open(location, '_blank').focus() : history.push(location)}
        >
            {label}
        </Link>
    );
};

const MenuDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Link
                color="white"
                sx={{ cursor: "pointer", "&:hover": { color: theme.palette.primary.main } }}
                underline="none"
                onClick={handleClick}
            >
                Wallet Download
                {open ? <ArrowDropUp /> : <ArrowDropDown />}
            </Link>
            <Menu
                PaperProps={{ sx: { marginTop: 2 } }}
                disableAutoFocusItem
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                id="dropdown-wallet-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    sx={{ display: "flex", gap: 1, paddingX: 5 }}
                    onClick={() => {
                        window.open(WALLET_MAC_URL, '_blank').focus();
                        handleClose();
                    }}
                >
                    <FontAwesomeIcon icon={faApple} />
                    iOS
                </MenuItem>
                <MenuItem
                    sx={{ display: "flex", gap: 1, paddingX: 5 }}
                    onClick={() => {
                        window.open(WALLET_LINUX_URL, '_blank').focus();
                        handleClose();
                    }}
                >
                    <FontAwesomeIcon icon={faLinux} />
                    Linux
                </MenuItem>
                <MenuItem
                    sx={{ display: "flex", gap: 1, paddingX: 5 }}
                    onClick={() => {
                        window.open(WALLET_WINDOWS_URL, '_blank').focus();
                        handleClose();
                    }}
                >
                    <FontAwesomeIcon icon={faWindows} />
                    Windows
                </MenuItem>
            </Menu>
        </Box>
    );
};

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
            displayCallback: () => <MenuDropdown />
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
    const theme = useTheme();
    const history = useHistory();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>

            <AppBar
                component="nav"
                position="sticky"
                color="dark"
                sx={{ backgroundImage: "none", opacity: 0.9, boxShadow: "none" }}
                enableColorOnDark
            >

                <Container disableGutters sx={{ paddingY: 1 }}>

                    <Toolbar disableGutters>

                        <Image
                            duration={0}
                            onClick={() => history.push(`/`)}
                            src={Logo}
                            width="205px"
                            style={{ filter: "invert(100%)", cursor: "pointer" }}
                        />

                        <Box justifyContent="end" flexGrow={1} sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon fontSize={"large"} />
                            </IconButton>
                        </Box>

                        <Box gap={2} justifyContent="end" flexGrow={1} sx={{ display: { xs: "none", md: "flex" } }}>
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
                    PaperProps={{ sx: { minWidth: "70%", backgroundColor: theme.palette.rowBlack.main } }}
                    sx={{ display: { sm: "block", md: "none" } }}
                >

                    <HeaderMobile />

                </Drawer>

            </Box>

        </>
    );

}
