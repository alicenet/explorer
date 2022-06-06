import { ReactComponent as DiscordIcon } from "assets/discord-icon.svg";
import { ReactComponent as TwitterIcon } from "assets/twitter-icon.svg";
import { Container } from "semantic-ui-react";
import React from "react";

const ALICENET_URL = process.env.REACT_APP_ALICENET_HOME;

const MenuDivider = () => <div className="border-r border-gray-700 my-1" />;

export function Footer() {

    return (

        <Container fluid className="flex justify-between py-10">

            <div className="flex gap-5">

                <span>Follow us on:</span>
                <TwitterIcon className={`w-5 cursor-pointer hover:opacity-50 fill-current text-white`} />
                <DiscordIcon className={`w-5 cursor-pointer hover:opacity-50 fill-current text-white`} />

            </div>

            <div className="flex gap-3">

                <span
                    className="cursor-pointer hover:opacity-50"
                    onClick={() => window.open(ALICENET_URL, '_blank').focus()}
                >
                    About
                </span>

                <MenuDivider />

                <span
                    className="cursor-pointer hover:opacity-50"
                    onClick={() => window.open(ALICENET_URL, '_blank').focus()}
                >
                    Legal
                </span>

                <MenuDivider />

                <span
                    className="cursor-pointer hover:opacity-50"
                    onClick={() => window.open(ALICENET_URL, '_blank').focus()}
                >
                    Terms of service
                </span>

                <MenuDivider />

                <span className="text-lightgray">AliceNet Inc © {new Date().getFullYear()}</span>

            </div>

        </Container>

    );

}
