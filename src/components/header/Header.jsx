import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "assets/MadNetwork Logo Horizontal GRAYSCALE.png";
import Image from "mui-image";
import { AppBar, Box, Container, Drawer, IconButton, Link, Menu, MenuItem, Toolbar, useTheme } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Menu as MenuIcon } from '@mui/icons-material';
import { HeaderMobile } from "./HeaderMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

const WALLET_MAC_URL = process.env.REACT_APP_WALLET_MAC_URL;
const WALLET_LINUX_URL = process.env.REACT_APP_WALLET_LINUX_URL;
const WALLET_WINDOWS_URL = process.env.REACT_APP_WALLET_WINDOWS_URL;

const MenuDivider = () => <div className="border-r border-gray-700" />;

const MenuLink = ({ location, label, blank = false }) => {
    const history = useHistory();
    const theme = useTheme();

    return (
        <Link
            color={"white"}
            className="cursor-pointer"
            underline="none"
            sx={{ "&:hover": { color: theme.palette.primary.main } }}
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
        <div>
            <Link
                color="white"
                sx={{ "&:hover": { color: theme.palette.primary.main } }}
                className="cursor-pointer"
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
                    className="flex gap-3 px-10"
                    onClick={() => {
                        window.open(WALLET_MAC_URL, '_blank').focus();
                        handleClose();
                    }}
                >
                    <FontAwesomeIcon icon={faApple} />
                    iOS
                </MenuItem>
                <MenuItem
                    className="flex gap-3 px-10"
                    onClick={() => {
                        window.open(WALLET_LINUX_URL, '_blank').focus();
                        handleClose();
                    }}
                >
                    <FontAwesomeIcon icon={faLinux} />
                    Linux
                </MenuItem>
                <MenuItem
                    className="flex gap-3 px-10"
                    onClick={() => {
                        window.open(WALLET_WINDOWS_URL, '_blank').focus();
                        handleClose();
                    }}
                >
                    <FontAwesomeIcon icon={faWindows} />
                    Windows
                </MenuItem>
            </Menu>
        </div>
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

            <AppBar color="dark" component="nav" position="sticky" className="shadow-none opacity-90">

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
                    PaperProps={{ sx: { minWidth: "70%", backgroundColor: theme.palette.rowBlack.main } }}
                    sx={{ display: { sm: "block", md: "none" } }}
                >

                    <HeaderMobile />

                </Drawer>

            </Box>

        </>
    );

}
