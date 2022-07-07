import React from "react";
import { Link } from "react-router-dom";
import { Image, Menu } from "semantic-ui-react";
import Logo from "assets/MadNetwork Logo Horizontal GRAYSCALE.png";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

const MenuDivider = () => <div className="border-r border-gray-700 my-3" />;

export function AliceNetMenuDesktop() {

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
                <Menu.Item
                    className="text-white hover:text-neongreen"
                    as={Link}
                    to="/"
                    name="Wallet Download"
                />
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
