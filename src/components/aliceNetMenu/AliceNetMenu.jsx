import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";
import Logo from "assets/MadNetwork Logo Horizontal GRAYSCALE.png";

//TODO define where to get this
const GITHUB_URL = 'https://github.com/madhive';
const WHITE_PAPER_URL = 'https://www.madnetwork.com/madnetwork-download-whitepaper';

//TODO define where to get this
const WALLETS_PLACEHOLDER = ['wallet0', 'wallet1'];

const MenuDivider = () => <div className="border-r border-gray-700 my-3" />;

export function AliceNetMenu() {

    const location = useLocation();

    return (

        <Container fluid className="sticky top-0 bg-dark opacity-90">

            <Menu pointing secondary className="py-5">

                <Menu.Menu position="left" className="self-center">
                    <Image
                        src={Logo}
                        width="205px"
                        style={{ filter: "invert(100%)" }}
                        as={Link}
                        to={"/"}
                    />
                </Menu.Menu>

                <Menu.Menu position="right">
                    <Menu.Item
                        className="text-white hover:opacity-50"
                        as={Link}
                        to="block"
                        name="Monitor"
                        active={location.pathname.slice(1) === 'block'}
                    />
                    <MenuDivider />
                    <Menu.Item
                        className="text-white hover:opacity-50"
                        as={Link}
                        to="about"
                        name="About"
                        active={location.pathname.slice(1) === 'about'}
                    />
                    <MenuDivider />
                    <Dropdown className="text-white hover:opacity-50 focus:opacity-100" item text="Wallet Download">
                        <Dropdown.Menu>
                            {WALLETS_PLACEHOLDER.map(wallet =>
                                <Dropdown.Item key={wallet}>{wallet}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <MenuDivider />
                    <Menu.Item
                        className="text-white hover:opacity-50"
                        onClick={() => window.open(GITHUB_URL, '_blank').focus()}
                        name="Github"
                    />
                    <MenuDivider />
                    <Menu.Item
                        className="text-white hover:opacity-50"
                        onClick={() => window.open(WHITE_PAPER_URL, '_blank').focus()}
                        name="White Paper"
                    />
                </Menu.Menu>

            </Menu>

        </Container>

    );

}
