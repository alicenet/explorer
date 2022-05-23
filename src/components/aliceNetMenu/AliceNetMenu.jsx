import React from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import Logo from "assets/MadNetwork Logo Horizontal GRAYSCALE.png";
import styles from './AliceNetMenu.module.scss';

//TODO define where to get this
const GITHUB_URL = 'https://github.com/madhive';
const WHITE_PAPER_URL = 'https://www.madnetwork.com/madnetwork-download-whitepaper';
const COMMUNITY_URL = 'https://www.madnetwork.com/';

//TODO define where to get this
const WALLETS_PLACEHOLDER = ['wallet0', 'wallet1'];

export function AliceNetMenu() {

    const location = useLocation();
    const history = useHistory();

    return (
        <Menu pointing secondary className={styles.menu}>
            <Menu.Menu position="left">
                <Image
                    src={Logo}
                    width="205"
                    className={styles.image}
                    as={Link}
                    to={"/"}
                />
            </Menu.Menu>
            <Menu.Menu position="right">
                <Menu.Item
                    as={Link}
                    to="block"
                    name="Monitor"
                    active={location.pathname.slice(1) === 'block'}
                />
                <Menu.Item
                    as={Link}
                    to="about"
                    name="About"
                    active={location.pathname.slice(1) === 'about'}
                />
                <Dropdown item text="Wallet Download">
                    <Dropdown.Menu>
                        {WALLETS_PLACEHOLDER.map(wallet =>
                            <Dropdown.Item key={wallet}>{wallet}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item
                    onClick={() => window.open(GITHUB_URL, '_blank').focus()}
                    name="Github"
                />
                <Menu.Item
                    onClick={() => window.open(WHITE_PAPER_URL, '_blank').focus()}
                    name="White Paper"
                />
                <Menu.Item
                    onClick={() => window.open(COMMUNITY_URL, '_blank').focus()}
                    name="Community"
                />
            </Menu.Menu>
        </Menu>
    );
}
