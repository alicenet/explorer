import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Menu, Modal } from "semantic-ui-react";
import { ArrowDropDown, ArrowDropUp, Menu as Icon } from '@mui/icons-material';
import Logo from "assets/MadNetwork Logo Horizontal GRAYSCALE.png";
import { classNames } from "utils";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const WHITE_PAPER_URL = process.env.REACT_APP_WHITE_PAPER_URL;
const MADHIVE_URL = process.env.REACT_APP_MADHIVE_URL;

const WALLET_LINUX_URL = process.env.REACT_APP_WALLET_LINUX_URL;
const WALLET_MAC_URL = process.env.REACT_APP_WALLET_MAC_URL;
const WALLET_WINDOWS_URL = process.env.REACT_APP_WALLET_WINDOWS_URL;

export function HeaderMobile() {

    const [open, setOpen] = useState(false);
    const [walletMenuOpen, setWalletMenuOpen] = useState(false);
    const [showWalletOptions, setShowWalletOptions] = useState(false);

    useEffect(() => {
        setShowWalletOptions(walletMenuOpen);
    }, [walletMenuOpen]);

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
                    closeIcon
                    size="fullscreen"
                    className="bg-dark h-19/20"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                        <Icon fontSize={"large"} className="cursor-pointer hover:opacity-80" />
                    }
                >
                    <div className="px-10 my-5">

                        <Menu text vertical className="flex items gap-5">

                            <Menu.Item
                                className="text-white text-2xl"
                                as={Link}
                                to="/"
                                name="Monitor"
                            />

                            <Menu.Item
                                className="text-white text-2xl"
                                onClick={() => window.open(MADHIVE_URL, '_blank').focus()}
                                name="About"
                            />

                            <Menu.Item
                                className="text-white text-2xl flex flex-row-reverse justify-end gap-2 items-center"
                                position="left"
                                icon={
                                    walletMenuOpen ?
                                        <ArrowDropDown className="text-3xl" /> :
                                        <ArrowDropUp className="text-3xl" />
                                }
                                name="Wallet Download"
                                onClick={() => setWalletMenuOpen(prevState => !prevState)}
                            />

                            {
                                walletMenuOpen &&
                                <Menu.Item className={
                                    classNames(
                                        "px-5 transition-opacity py-0 my-0",
                                        { "opacity-100": showWalletOptions },
                                        { "opacity-0": !showWalletOptions },
                                    )
                                }>

                                    {
                                        showWalletOptions &&
                                        <Menu text vertical>

                                            <Menu.Item
                                                className="text-white text-xl"
                                                onClick={() => window.open(WALLET_LINUX_URL, '_blank').focus()}
                                                name="Linux"
                                            />

                                            <Menu.Item
                                                className="text-white text-xl"
                                                onClick={() => window.open(WALLET_MAC_URL, '_blank').focus()}
                                                content="iOS"
                                            />

                                            <Menu.Item
                                                className="text-white text-xl"
                                                onClick={() => window.open(WALLET_WINDOWS_URL, '_blank').focus()}
                                                name="Windows"
                                            />

                                        </Menu>
                                    }

                                </Menu.Item>
                            }

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
