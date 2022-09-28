import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "assets/MadNetwork Logo Horizontal GRAYSCALE.png";
import Image from "mui-image";
import { AppBar, Box, Container, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

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

const pages = ['Products', 'Pricing', 'Blog'];

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

export function HeaderDesktop() {
    const history = useHistory();

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar position="sticky" className="bg-dark shadow-none opacity-90">

                <Container className="px-0 py-1">

                    <Toolbar disableGutters>

                        <Image
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                            duration={0}
                            onClick={() => history.push(`/`)}
                            className="cursor-pointer"
                            src={Logo}
                            width="205px"
                            style={{ filter: "invert(100%)" }}
                        />

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} gap={2} justifyContent={"end"}>
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

        </>
    );

}
