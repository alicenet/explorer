import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import Logo from "assets/MadNetwork Logo Horizontal GRAYSCALE.png";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

const WALLET_LINUX_URL = process.env.REACT_APP_WALLET_LINUX_URL;
const WALLET_MAC_URL = process.env.REACT_APP_WALLET_MAC_URL;
const WALLET_WINDOWS_URL = process.env.REACT_APP_WALLET_WINDOWS_URL;

const MenuDivider = () => <div className="border-r border-gray-700 my-3" />;

export function HeaderDesktop() {

    return (

        <Menu pointing secondary className="py-5">

            <Menu.Menu position="left" className="self-center">
                <Image
                    src={Logo}
                    width="205px"
                    style={{ filter: "invert(100%)" }}
                    as={Link}
                    to="/"
                />
            </Menu.Menu>

            <Menu.Menu position="right">
                <Menu.Item
                    className="text-white hover:text-neongreen"
                    as={Link}
                    to="/"
                    name="Monitor"
                />
                <MenuDivider />
                <Menu.Item
                    className="text-white hover:text-neongreen"
                    as={Link}
                    to="/about"
                    name="About"
                />
                <MenuDivider />
                <Dropdown className="text-white hover:text-neongreen" item text="Wallet Download">
                    <Dropdown.Menu>
                        <Dropdown.Item
                            icon="apple"
                            text="iOS"
                            onClick={() => window.open(WALLET_LINUX_URL, '_blank').focus()}
                        />
                        <Dropdown.Item
                            icon="linux"
                            text="Linux"
                            onClick={() => window.open(WALLET_MAC_URL, '_blank').focus()}
                        />
                        <Dropdown.Item
                            icon="windows"
                            text="Windows"
                            onClick={() => window.open(WALLET_WINDOWS_URL, '_blank').focus()}
                        />
                    </Dropdown.Menu>
                </Dropdown>
                <MenuDivider />
                <Menu.Item
                    className="text-white hover:text-neongreen"
                    onClick={() => window.open(GITHUB_URL, '_blank').focus()}
                    name="Github"
                />
                <MenuDivider />
                <Menu.Item
                    className="text-white hover:text-neongreen"
                    onClick={() => window.open(WHITE_PAPER_URL, '_blank').focus()}
                    name="White Paper"
                />
            </Menu.Menu>

        </Menu>

    );

}
