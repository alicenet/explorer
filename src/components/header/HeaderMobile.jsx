import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Image, Menu, Modal } from "semantic-ui-react";
import Logo from "assets/MadNetwork Logo Horizontal GRAYSCALE.png";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;

export function HeaderMobile() {

    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("monitor");

    return (

        <Menu pointing secondary className="py-5">

            <Menu.Menu position="left" className="self-center">
                <Image
                    src={Logo}
                    width="175px"
                    style={{ filter: "invert(100%)" }}
                    as={Link}
                    to="/"
                />
            </Menu.Menu>

            <Menu.Menu position="right">

                <Modal
                    basic
                    dimmer="blurring"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                        <Icon
                            name="bars"
                            size="large"
                            className="cursor-pointer hover:opacity-80"
                        />
                    }
                >
                    <div className="px-10">

                        <Menu text vertical>

                            <Menu.Item
                                style={{ textDecoration: "underline #00FFD1", textUnderlineOffset: "0.3em" }}
                                className="text-white text-2xl"
                                as={Link}
                                to="/"
                                name="Monitor"
                            />

                            <Menu.Item
                                className="text-white text-2xl"
                                as={Link}
                                to="/about"
                                name="About"
                            />

                            <Menu.Item
                                className="text-white text-2xl"
                                as={Link}
                                to="/"
                                name="Wallet Download"
                            />

                            <Menu.Item
                                className="text-white text-2xl"
                                onClick={() => window.open(GITHUB_URL, '_blank').focus()}
                                name="Github"
                            />

                            <Menu.Item
                                className="text-white text-2xl"
                                onClick={() => window.open(WHITE_PAPER_URL, '_blank').focus()}
                                name="White Paper"
                            />

                        </Menu>

                    </div>

                </Modal>


            </Menu.Menu>

        </Menu>

    );

}
