import React, { useEffect, useState } from "react";
import { Box, ListItemIcon, ListItemText, MenuItem as MUIMenuItem, MenuList, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { classNames } from "utils";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

const WALLET_MAC_URL = process.env.REACT_APP_WALLET_MAC_URL;
const WALLET_LINUX_URL = process.env.REACT_APP_WALLET_LINUX_URL;
const WALLET_WINDOWS_URL = process.env.REACT_APP_WALLET_WINDOWS_URL;

const sections =
    [
        {
            label: "Monitor",
            location: "/",
            displayCallback: ({ location, label }) => <MenuItem location={location} label={label} />
        },
        {
            label: "About",
            location: "/about",
            displayCallback: ({ location, label }) => <MenuItem location={location} label={label} />
        },
        {
            displayCallback: () => <MenuDropdown />
        },
        {
            label: "GitHub",
            location: GITHUB_URL,
            displayCallback: ({ location, label }) => <MenuItem location={location} label={label} blank />
        },
        {
            label: "White Paper",
            location: WHITE_PAPER_URL,
            displayCallback: ({ location, label }) => <MenuItem location={location} label={label} blank />
        },
    ];

const subSections =
    [
        {
            label: "iOS",
            location: WALLET_MAC_URL,
            icon: <FontAwesomeIcon icon={faApple} />,
            displayCallback: ({ location, label, icon }) =>
                <MenuItem icon={icon} location={location} label={label} blank />
        },
        {
            label: "Linux",
            location: WALLET_LINUX_URL,
            icon: <FontAwesomeIcon icon={faLinux} />,
            displayCallback: ({ location, label, icon }) =>
                <MenuItem icon={icon} location={location} label={label} blank />
        },
        {
            label: "Windows",
            location: WALLET_WINDOWS_URL,
            icon: <FontAwesomeIcon icon={faWindows} />,
            displayCallback: ({ location, label, icon }) =>
                <MenuItem icon={icon} location={location} label={label} blank />
        },
    ];

const MenuDropdown = () => {
    const [walletMenuOpen, setWalletMenuOpen] = useState(false);
    const [showWalletOptions, setShowWalletOptions] = useState(false);

    useEffect(() => {
        setShowWalletOptions(walletMenuOpen);
    }, [walletMenuOpen]);

    return (
        <MenuList disablePadding>
            <MUIMenuItem sx={{ paddingX: 4, paddingY: 2 }}>
                <ListItemText onClick={() => setWalletMenuOpen(prevState => !prevState)}>
                    <Typography className="text-2xl">
                        Wallet Download
                        {walletMenuOpen ?
                            <ArrowDropUp className="text-3xl" /> :
                            <ArrowDropDown className="text-3xl" />
                        }
                    </Typography>
                </ListItemText>
            </MUIMenuItem>
            <Box
                paddingX={3}
                paddingY={0}
                marginY={0}
                className={classNames(
                    "transition-opacity",
                    { "opacity-100": showWalletOptions },
                    { "opacity-0": !showWalletOptions },
                )}
            >
                {showWalletOptions && subSections.map((section, index, { length }) => (
                    section.displayCallback(section)
                ))}
            </Box>
        </MenuList>
    );
}

const MenuItem = ({ location, label, icon = null, blank = false }) => {
    const history = useHistory();
    return (
        <MUIMenuItem key={`menu-item-${label}`} sx={{ paddingX: 4, paddingY: 2 }}>
            {
                icon &&
                <ListItemIcon className="text-2xl">
                    {icon}
                </ListItemIcon>
            }
            <ListItemText onClick={() => blank ? window.open(location, '_blank').focus() : history.push(location)}>
                <Typography className="text-2xl">
                    {label}
                </Typography>
            </ListItemText>
        </MUIMenuItem>
    );
}

export function HeaderMobile() {
    return (
        <MenuList>
            {sections.map((section) => (
                section.displayCallback(section)
            ))}
        </MenuList>
    );
}
