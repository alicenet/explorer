import { ReactComponent as DiscordIcon } from 'assets/discord-icon.svg';
import { ReactComponent as TwitterIcon } from 'assets/twitter-icon.svg';
import styles from './Footer.module.scss';
import { Container } from "semantic-ui-react";
import React from "react";

const MenuDivider = () => <div className="border-r border-gray-700 my-1" />;

export function Footer() {

    return (

        <Container fluid className="flex justify-between py-10">

            <div className="flex gap-5">
                <span>Follow us on:</span>
                <TwitterIcon width={15} className={styles.svg} />
                <DiscordIcon width={15} className={styles.svg} />
            </div>

            <div className="flex gap-3">
                <span onClick={() => window.location = "https://madnetwork.com"}>About</span>
                <MenuDivider/>
                <span onClick={() => window.location = "https://madnetwork.com"}>Legal</span>
                <MenuDivider/>
                <span onClick={() => window.location = "https://madnetwork.com"}>Terms of service</span>
                <MenuDivider/>
                <span className="text-lightgray">AliceNet Inc © {new Date().getFullYear()}</span>
            </div>

        </Container>

    );

}
